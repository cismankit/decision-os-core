"""Deterministic WS2 CLI runner utilities."""

from __future__ import annotations

import argparse
import json
import os
import re
import sys
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Dict, Iterable, List, Optional, Tuple

try:
    import yaml
except ModuleNotFoundError:  # pragma: no cover - runtime dependency check
    yaml = None


ROOT_DIR = Path(__file__).resolve().parents[2]
DEFAULT_PROFILE_FILES = (
    ROOT_DIR / "simulation" / "synthetic-profiles.yaml",
    ROOT_DIR / "simulation" / "cycle-005-long-horizon-profiles.yaml",
    ROOT_DIR / "simulation" / "cycle-008-meta-stress-profiles.yaml",
)
DECISION_GRAPH_FILE = ROOT_DIR / "graph" / "universal-decision-nodes.yaml"

EXPR_RE = re.compile(
    r"^\s*([a-zA-Z_][\w]*)\.(current_level|confidence|evidence_age_days)\s*"
    r"(<=|>=|<|>)\s*(-?\d+(?:\.\d+)?)\s*$"
)


def _require_yaml() -> None:
    if yaml is None:
        raise RuntimeError(
            "PyYAML is required for tools/runner. Install with: pip install pyyaml"
        )


def _load_yaml(path: Path) -> Any:
    _require_yaml()
    with path.open("r", encoding="utf-8") as handle:
        return yaml.safe_load(handle)


def _canonical_json(data: Any) -> str:
    return json.dumps(data, sort_keys=True, separators=(",", ":"))


def _round(value: float) -> float:
    return round(float(value), 3)


def _iter_constraints_sorted(constraints: Dict[str, Dict[str, Any]]) -> Iterable[str]:
    return sorted(constraints.keys())


def _read_profiles_file(path: Path) -> List[Dict[str, Any]]:
    raw = _load_yaml(path)
    if isinstance(raw, dict):
        if "profiles" in raw and isinstance(raw["profiles"], list):
            profiles = raw["profiles"]
        else:
            profiles = [raw]
    elif isinstance(raw, list):
        profiles = raw
    else:
        raise ValueError(f"Unsupported profile YAML shape in {path}")
    normalized: List[Dict[str, Any]] = []
    for item in profiles:
        if not isinstance(item, dict):
            continue
        if "profile_id" not in item or "constraints" not in item:
            continue
        normalized.append(item)
    return normalized


def _load_profile_from_id(profile_id: str) -> Dict[str, Any]:
    collected: List[Dict[str, Any]] = []
    for artifact in DEFAULT_PROFILE_FILES:
        if artifact.exists():
            collected.extend(_read_profiles_file(artifact))
    by_id = {p["profile_id"]: p for p in sorted(collected, key=lambda p: p["profile_id"])}
    if profile_id not in by_id:
        artifact_list = ", ".join(str(p.relative_to(ROOT_DIR)) for p in DEFAULT_PROFILE_FILES)
        raise ValueError(
            f"Profile id '{profile_id}' not found in known artifacts: {artifact_list}"
        )
    return by_id[profile_id]


def load_profile(profile_ref: str) -> Dict[str, Any]:
    path = Path(profile_ref)
    if path.exists():
        profile_data = _read_profiles_file(path)
        if len(profile_data) != 1:
            raise ValueError(
                f"Profile file '{path}' must resolve to exactly one profile, found {len(profile_data)}"
            )
        return profile_data[0]
    return _load_profile_from_id(profile_ref)


def load_decision_nodes() -> List[Dict[str, Any]]:
    nodes = _load_yaml(DECISION_GRAPH_FILE)
    if not isinstance(nodes, list):
        raise ValueError(f"Decision graph file malformed: {DECISION_GRAPH_FILE}")
    return sorted(nodes, key=lambda n: n.get("decision_id", ""))


def _evaluate_expression(expression: str, constraints: Dict[str, Dict[str, Any]]) -> Optional[bool]:
    match = EXPR_RE.match(expression or "")
    if not match:
        return None
    category, field, op, raw_value = match.groups()
    if category not in constraints:
        return None
    lhs = float(constraints[category].get(field, 0.0))
    rhs = float(raw_value)
    if op == "<":
        return lhs < rhs
    if op == ">":
        return lhs > rhs
    if op == "<=":
        return lhs <= rhs
    if op == ">=":
        return lhs >= rhs
    return None


@dataclass(frozen=True)
class NodeEvaluation:
    decision_id: str
    gating_reason: str
    gating_details: List[str]
    constraint_deltas: Dict[str, Dict[str, float]]
    optionality_delta: float
    drift_flags: Dict[str, Any]
    irreversibility_score: float


def _compute_constraint_deltas(
    node: Dict[str, Any], constraints: Dict[str, Dict[str, Any]]
) -> Tuple[Dict[str, Dict[str, float]], int]:
    deltas: Dict[str, Dict[str, float]] = {}
    unmet = 0
    for req in sorted(node.get("constraints_required", []), key=lambda r: r.get("category", "")):
        category = req.get("category")
        if not category:
            continue
        current = constraints.get(category, {})
        level_delta = _round(float(current.get("current_level", 0.0)) - float(req.get("min_required_level", 0.0)))
        conf_delta = _round(float(current.get("confidence", 0.0)) - float(req.get("confidence_min", 0.0)))
        freshness_delta = _round(
            float(req.get("evidence_freshness_days_max", 999999)) - float(current.get("evidence_age_days", 0.0))
        )
        deltas[category] = {
            "level_delta": level_delta,
            "confidence_delta": conf_delta,
            "freshness_delta": freshness_delta,
        }
        if level_delta < 0 or conf_delta < 0 or freshness_delta < 0:
            unmet += 1
    return deltas, unmet


def _evaluate_node(
    node: Dict[str, Any], profile: Dict[str, Any], prior_decisions: List[str]
) -> NodeEvaluation:
    constraints = profile.get("constraints", {})
    decision_id = str(node.get("decision_id", "unknown-decision"))

    hard_hits: List[str] = []
    for cond in sorted(node.get("blocked_when", []), key=lambda c: c.get("condition_id", "")):
        expr = cond.get("expression", "")
        result = _evaluate_expression(expr, constraints)
        if result:
            reason = cond.get("reason", cond.get("condition_id", "blocked-condition"))
            hard_hits.append(str(reason))

    simulation_hits: List[str] = []
    for cond in sorted(node.get("simulation_only_conditions", []), key=lambda c: c.get("condition_id", "")):
        expr = cond.get("expression", "")
        result = _evaluate_expression(expr, constraints)
        if result:
            reason = cond.get("reason", cond.get("condition_id", "simulation-condition"))
            simulation_hits.append(str(reason))

    constraint_deltas, unmet_count = _compute_constraint_deltas(node, constraints)

    gating_reason: str
    gating_details: List[str]
    if hard_hits:
        gating_reason = "blocked"
        gating_details = sorted(hard_hits)
    elif unmet_count > 0 or simulation_hits:
        gating_reason = "learn-only"
        gating_details = sorted(simulation_hits)
        if unmet_count > 0:
            gating_details.append(f"{unmet_count} required constraint(s) below execute threshold")
    else:
        gating_reason = "execute-eligible"
        gating_details = ["all required constraints satisfy execution thresholds"]

    req_count = max(1, len(constraint_deltas))
    req_met = req_count - unmet_count
    readiness_ratio = req_met / req_count
    irreversibility = float(node.get("irreversibility_score", 0.5))
    gate_adjustment = {
        "execute-eligible": 0.04,
        "learn-only": 0.0,
        "blocked": -0.04,
    }[gating_reason]
    # Approximation: optionality rises with satisfied requirements and lower irreversibility.
    optionality_delta = _round((readiness_ratio - 0.5) * 0.2 + (0.5 - irreversibility) * 0.08 + gate_adjustment)

    risk_constraint = constraints.get("risk", {})
    risk_trend = str(risk_constraint.get("trend", "stable"))
    risk_trend_flag = {
        "degrading": "risk-up",
        "improving": "risk-down",
    }.get(risk_trend, "risk-flat")
    loop_detected = len(prior_decisions) >= 2 and all(
        p == decision_id for p in prior_decisions[-2:]
    )

    return NodeEvaluation(
        decision_id=decision_id,
        gating_reason=gating_reason,
        gating_details=gating_details,
        constraint_deltas=constraint_deltas,
        optionality_delta=optionality_delta,
        drift_flags={
            "risk_trend": risk_trend_flag,
            "loop_detected": bool(loop_detected),
        },
        irreversibility_score=irreversibility,
    )


def choose_decision(profile: Dict[str, Any], prior_decisions: Optional[List[str]] = None) -> NodeEvaluation:
    if prior_decisions is None:
        prior_decisions = []
    evaluations = [_evaluate_node(node, profile, prior_decisions) for node in load_decision_nodes()]
    gate_rank = {"execute-eligible": 0, "learn-only": 1, "blocked": 2}

    def sort_key(ev: NodeEvaluation) -> Tuple[Any, ...]:
        deficit_sum = 0.0
        for delta in ev.constraint_deltas.values():
            deficit_sum += abs(min(0.0, delta["level_delta"]))
            deficit_sum += abs(min(0.0, delta["confidence_delta"]))
            deficit_sum += abs(min(0.0, delta["freshness_delta"])) / 100.0
        return (
            gate_rank[ev.gating_reason],
            _round(deficit_sum),
            ev.irreversibility_score,
            ev.decision_id,
        )

    return sorted(evaluations, key=sort_key)[0]


def _apply_projection_update(profile: Dict[str, Any], chosen: NodeEvaluation) -> Dict[str, Any]:
    updated = json.loads(_canonical_json(profile))
    constraints = updated.get("constraints", {})
    boost = {
        "execute-eligible": (0.03, 0.02),
        "learn-only": (0.02, 0.015),
        "blocked": (-0.01, -0.005),
    }[chosen.gating_reason]
    for category in _iter_constraints_sorted(constraints):
        constraint = constraints[category]
        constraint["evidence_age_days"] = max(0.0, float(constraint.get("evidence_age_days", 0.0)) + 1.0)
    for category in sorted(chosen.constraint_deltas):
        if category not in constraints:
            continue
        constraint = constraints[category]
        constraint["current_level"] = _round(min(1.0, max(0.0, float(constraint.get("current_level", 0.0)) + boost[0])))
        constraint["confidence"] = _round(min(1.0, max(0.0, float(constraint.get("confidence", 0.0)) + boost[1])))
    return updated


def _print_json(data: Dict[str, Any]) -> None:
    print(json.dumps(data, sort_keys=True, indent=2))


def run_nba_command(profile_ref: str) -> int:
    profile = load_profile(profile_ref)
    chosen = choose_decision(profile)
    output = {
        "profile_id": profile.get("profile_id"),
        "chosen_decision": chosen.decision_id,
        "gating_reason": chosen.gating_reason,
        "gating_details": chosen.gating_details,
        "constraint_deltas": chosen.constraint_deltas,
        "optionality_delta": chosen.optionality_delta,
        "drift_flags": chosen.drift_flags,
    }
    _print_json(output)
    return 0


def project_command(profile_ref: str, steps: int) -> int:
    if steps <= 0:
        raise ValueError("--steps must be greater than 0")
    profile = load_profile(profile_ref)
    history: List[Dict[str, Any]] = []
    prior_decisions: List[str] = []
    state = profile
    for step in range(1, steps + 1):
        chosen = choose_decision(state, prior_decisions=prior_decisions)
        prior_decisions.append(chosen.decision_id)
        snapshot = {
            "step": step,
            "chosen_decision": chosen.decision_id,
            "gating_reason": chosen.gating_reason,
            "gating_details": chosen.gating_details,
            "constraint_deltas": chosen.constraint_deltas,
            "optionality_delta": chosen.optionality_delta,
            "drift_flags": chosen.drift_flags,
        }
        history.append(snapshot)
        state = _apply_projection_update(state, chosen)
    result = {
        "profile_id": profile.get("profile_id"),
        "steps": steps,
        "projection": history,
    }
    _print_json(result)
    return 0


def _suite_cases(raw_suite: Any) -> List[Dict[str, Any]]:
    if isinstance(raw_suite, dict):
        maybe_cases = raw_suite.get("cases")
        if isinstance(maybe_cases, list):
            return maybe_cases
    if isinstance(raw_suite, list):
        return raw_suite
    raise ValueError("Suite YAML must be either a list or a mapping with `cases`")


def audit_command(suite_ref: str) -> int:
    suite_path = Path(suite_ref)
    if not suite_path.exists():
        raise FileNotFoundError(f"Suite file not found: {suite_ref}")
    cases = _suite_cases(_load_yaml(suite_path))
    results: List[Dict[str, Any]] = []
    all_passed = True
    for index, case in enumerate(cases, start=1):
        if not isinstance(case, dict):
            continue
        profile_ref = str(case.get("profile", case.get("profile_id", "")))
        mode = str(case.get("command", "run-nba"))
        if not profile_ref:
            raise ValueError(f"Case {index} missing `profile`")
        if mode == "project":
            steps = int(case.get("steps", 5))
            profile = load_profile(profile_ref)
            prior: List[str] = []
            state = profile
            final = None
            for _ in range(steps):
                final = choose_decision(state, prior_decisions=prior)
                prior.append(final.decision_id)
                state = _apply_projection_update(state, final)
            assert final is not None
            actual = {"chosen_decision": final.decision_id, "gating_reason": final.gating_reason}
        else:
            profile = load_profile(profile_ref)
            final = choose_decision(profile)
            actual = {"chosen_decision": final.decision_id, "gating_reason": final.gating_reason}
        expected = case.get("expect", {})
        passed = True
        if isinstance(expected, dict):
            for key in ("chosen_decision", "gating_reason"):
                if key in expected and expected[key] != actual[key]:
                    passed = False
        all_passed = all_passed and passed
        results.append(
            {
                "case": index,
                "profile": profile_ref,
                "mode": mode,
                "actual": actual,
                "expected": expected if isinstance(expected, dict) else {},
                "passed": passed,
            }
        )
    _print_json({"suite": str(suite_path), "passed": all_passed, "results": results})
    return 0 if all_passed else 1


def self_check_command() -> int:
    profile = load_profile("student-low-buffer-high-urgency")
    result_one = choose_decision(profile)
    result_two = choose_decision(profile)
    deterministic = result_one.decision_id == result_two.decision_id and result_one.gating_reason == result_two.gating_reason
    payload = {
        "deterministic": deterministic,
        "decision_a": result_one.decision_id,
        "decision_b": result_two.decision_id,
        "gating_a": result_one.gating_reason,
        "gating_b": result_two.gating_reason,
    }
    _print_json(payload)
    return 0 if deterministic else 1


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="WS2 deterministic CLI regression runner")
    subparsers = parser.add_subparsers(dest="command", required=True)

    run_nba = subparsers.add_parser("run-nba", help="Run deterministic next-best-action selection")
    run_nba.add_argument("--profile", required=True, help="Profile id from simulation artifacts or path to YAML")

    project = subparsers.add_parser("project", help="Project deterministic selections across steps")
    project.add_argument("--profile", required=True, help="Profile id from simulation artifacts or path to YAML")
    project.add_argument("--steps", required=True, type=int, help="Number of projection steps")

    audit = subparsers.add_parser("audit", help="Run deterministic suite audit")
    audit.add_argument("--suite", required=True, help="YAML suite path")

    subparsers.add_parser("self-check", help="Run built-in deterministic self-check")
    return parser


def main(argv: Optional[List[str]] = None) -> int:
    parser = build_parser()
    args = parser.parse_args(argv)
    try:
        if args.command == "run-nba":
            return run_nba_command(args.profile)
        if args.command == "project":
            return project_command(args.profile, args.steps)
        if args.command == "audit":
            return audit_command(args.suite)
        if args.command == "self-check":
            return self_check_command()
    except (FileNotFoundError, RuntimeError, ValueError) as exc:
        print(f"error: {exc}", file=sys.stderr)
        return 2
    return 1


if __name__ == "__main__":
    sys.exit(main())
