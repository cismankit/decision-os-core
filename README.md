# Universal Decision Engine (Decision OS Core)

Decision OS Core is a deterministic decision-sequencing system for high-impact choices.  
It evaluates human state against constraints, readiness, irreversibility, and progression rules to produce one defensible next best decision.

## Project Overview

The Universal Decision Engine helps answer:

- What should happen next?
- Is this decision safe to execute, or learn-only?
- What does a 5-step path look like under current constraints?

The engine is designed for auditability and longitudinal stability, not advice generation or auto-execution.

## System Architecture

- **Engine specifications:** `ontology/`, `constraints/`, `readiness/`, `graph/`, `engine/`, `progression/`
- **Regression harness:** `simulation/`, `governance/cycle-gates.md`, `reports/`
- **CLI runner:** `tools/runner/` (`run-nba`, `project`, `audit`, `run-scenario`)
- **UI sandbox:** `ui-sandbox/` (diagnostic product layer consuming engine outputs)

Architecture and flow diagrams:

- `docs/architecture-diagram.md`
- `docs/decision-engine-explainer.md`

## Product Screenshots

- Dashboard: `docs/screenshots/dashboard.png`
- Next Best Decision panel: `docs/screenshots/decision-panel.png`
- Projection Timeline: `docs/screenshots/projection-timeline.png`
- Decision Graph Viewer: `docs/screenshots/graph-viewer.png`
- Scenario Explorer: `docs/screenshots/scenario-explorer.png`

## Example Workflow

1. Select a profile (`regression` or `scenario`) in UI sandbox.
2. Run evaluation to get:
   - `next_decision_id`
   - `status` (`execute-eligible` / `learn-only` / `blocked`)
   - `constraint_deltas`
   - `optionality_delta`
3. Run 5-step projection to observe evolution and drift risk.
4. Confirm against CLI output for parity.
5. Validate against cycle gates before certification.

## CLI Usage

```bash
python3 tools/runner/run-nba --profile X
python3 tools/runner/project --profile X --steps 5
python3 tools/runner/audit --suite simulation/regression-suite.yaml
python3 tools/runner/run-scenario --profile student-no-credit
```

## UI Usage

```bash
cd ui-sandbox
npm install
npm run dev
```

## Certification Model

The certification model is enforced by a frozen denominator suite and hard gates.

- Regression suite: `simulation/regression-suite.yaml` (`N=10`)
- Cycle gates: `governance/cycle-gates.md`
- Stability reports: `reports/stability-cycle-*.md`
- Certification policy: `reports/certification.md`

Release states:

- **Certified**: all hard gates pass for the cycle
- **Release Candidate**: certified cycle without consecutive-certified threshold
- **Stable Release Candidate**: consecutive certified cycles achieved
- **Stable Release**: governed release state per certification policy

## Repository Structure

- `ontology/` - global decision taxonomy and irreversibility model.
- `constraints/` - constraint state model and conflict resolution logic.
- `readiness/` - multidimensional readiness scoring and decision gating.
- `schemas/` - canonical decision-node schema.
- `graph/` - universal decision nodes and unlock graph.
- `engine/` - deterministic next-best decision selection specification.
- `progression/` - optionality/repeatability/impact progression models.
- `simulation/` - profile sets, cycle runs, and replay artifacts.
- `tools/` - CLI runner and adapter-facing interfaces.
- `ui-sandbox/` - local-only diagnostic product layer.
- `governance/` - cycle gate policies and agent boundaries.
- `reports/` - cycle-level stability and certification outcomes.
- `docs/` - architecture and explainer documentation.
- `changelog/` - auditable change history.
- `learnings/` - cycle-level learning records.
