# Changelog

All notable changes to Decision OS Core are documented in this file.

## Entry Template

Use this template for every update:

```md
## [version] - YYYY-MM-DD
### Added | Changed | Deprecated | Removed | Fixed
- Artifact: <path>
  - Change Class: <breaking-ontology | breaking-schema | threshold-tuning | non-breaking-doc>
  - Rationale: <why this was changed>
  - Impact: <what downstream users must adjust>
  - Migration Notes: <required actions if any>
  - Contradiction Link: <optional reference to adjudication record>
```

## [0.1.0] - 2026-03-02
### Added
- Artifact: `README.md`
  - Change Class: `non-breaking-doc`
  - Rationale: establish repository boundary and governance intent.
  - Impact: provides canonical orientation for all future artifacts.
  - Migration Notes: none.

- Artifact: `ontology/decision-ontology.md`
  - Change Class: `breaking-ontology`
  - Rationale: define canonical decision type and domain taxonomy.
  - Impact: all future decision nodes must classify against this taxonomy.
  - Migration Notes: create decision nodes using listed enums only.

- Artifact: `constraints/constraint-model.md`
  - Change Class: `threshold-tuning`
  - Rationale: define constraint state dynamics and conflict logic.
  - Impact: gating decisions must evaluate hard/soft/simulation outcomes.
  - Migration Notes: map decision prerequisites to required constraints.

- Artifact: `readiness/readiness-framework.md`
  - Change Class: `threshold-tuning`
  - Rationale: define multidimensional readiness and gate thresholds.
  - Impact: decision progression now depends on explicit readiness scores.
  - Migration Notes: include evidence packets for readiness dimensions.

- Artifact: `schemas/decision-node.schema.yaml`
  - Change Class: `breaking-schema`
  - Rationale: provide canonical machine-readable decision node contract.
  - Impact: producers must emit all required fields and validations.
  - Migration Notes: validate all nodes against this schema.

- Artifact: `schemas/decision-node-schema.md`
  - Change Class: `non-breaking-doc`
  - Rationale: provide human-readable normative schema and example.
  - Impact: improves implementation consistency.
  - Migration Notes: none.

- Artifact: `evolution/evolution-protocol.md`
  - Change Class: `breaking-ontology`
  - Rationale: define mandatory governance for all model evolution.
  - Impact: all future changes must follow protocol.
  - Migration Notes: apply workflow gates before merging updates.

- Artifact: `learnings/learning-ingestion-spec.md`
  - Change Class: `threshold-tuning`
  - Rationale: define evidence standards for learning-driven updates.
  - Impact: unsupported learnings cannot alter canonical thresholds.
  - Migration Notes: use required evidence structure for proposals.

- Artifact: `changelog/phase-1-audit.md`
  - Change Class: `non-breaking-doc`
  - Rationale: record initial cross-artifact consistency and contradiction scan.
  - Impact: provides auditable baseline for future deltas.
  - Migration Notes: rerun and append for each major phase.

## [0.1.1] - 2026-03-02
### Changed
- Artifact: `constraints/constraint-model.md`
  - Change Class: `threshold-tuning`
  - Rationale: resolve undefined "domain freshness window" behavior by defining canonical defaults and strict precedence.
  - Impact: stale-evidence handling is deterministic even when nodes omit explicit freshness overrides.
  - Migration Notes: add `evidence_freshness_days_max` only when stricter-than-default behavior is required.

- Artifact: `schemas/decision-node-schema.md`
  - Change Class: `non-breaking-doc`
  - Rationale: align normative schema narrative with canonical freshness fallback behavior.
  - Impact: implementers now have explicit evaluator expectation for omitted freshness field.
  - Migration Notes: none.

- Artifact: `schemas/decision-node.schema.yaml`
  - Change Class: `non-breaking-doc`
  - Rationale: annotate machine-readable schema with fallback semantics for evidence freshness.
  - Impact: reduces validator/evaluator ambiguity.
  - Migration Notes: none.

### Added
- Artifact: `learnings/2026-03-02-cycle-001-phase1-hardening.md`
  - Change Class: `non-breaking-doc`
  - Rationale: log cycle-level assumption changes, failure points, and strengthened rules.
  - Impact: improves auditability and supports recursive evolution.
  - Migration Notes: continue one learning record per cycle.

## [0.2.0] - 2026-03-02
### Added
- Artifact: `graph/canonical-decision-graph.md`
  - Change Class: `threshold-tuning`
  - Rationale: establish minimum universal high-impact decision sequencing graph.
  - Impact: downstream evaluators now have canonical node/edge order for irreversible-first pathways.
  - Migration Notes: map implementation nodes to canonical decision IDs before specialization.

- Artifact: `graph/universal-decision-nodes.yaml`
  - Change Class: `non-breaking-doc`
  - Rationale: provide schema-aligned exemplar node instances for core irreversible decisions.
  - Impact: reduces implementation ambiguity for constraints, blockers, and unlock definitions.
  - Migration Notes: validate node instances against `schemas/decision-node.schema.yaml`.

- Artifact: `simulation/contradiction-testing-protocol.md`
  - Change Class: `non-breaking-doc`
  - Rationale: define deterministic deadlock/contradiction/unsafe-unlock test process.
  - Impact: cycle-level simulation outcomes become reproducible and auditable.
  - Migration Notes: include required output envelope in every future simulation run.

- Artifact: `simulation/synthetic-profiles.yaml`
  - Change Class: `non-breaking-doc`
  - Rationale: establish baseline synthetic states for contradiction testing.
  - Impact: enables repeatable safety checks across archetypal human contexts.
  - Migration Notes: expand profile library without changing canonical constraint semantics.

- Artifact: `simulation/cycle-002-simulation-results.md`
  - Change Class: `non-breaking-doc`
  - Rationale: record first simulation run and contradiction findings.
  - Impact: introduces contradiction ID traceability into evolution flow.
  - Migration Notes: append one results artifact per cycle.

- Artifact: `engine/next-best-decision-spec.md`
  - Change Class: `threshold-tuning`
  - Rationale: define deterministic single-node selection logic with conservative tie-breakers.
  - Impact: next-best sequencing decisions are now rule-driven and reproducible.
  - Migration Notes: enforce mandatory precedence rules in any runtime evaluator.

- Artifact: `execution/execution-bridge-spec.md`
  - Change Class: `non-breaking-doc`
  - Rationale: specify non-binding handoff contract to external execution systems.
  - Impact: preserves strict boundary between decision intelligence and execution.
  - Migration Notes: do not introduce direct integrations in core repository.

- Artifact: `governance/agent-governance.md`
  - Change Class: `non-breaking-doc`
  - Rationale: codify agent roles, authority limits, and required output envelope.
  - Impact: reduces risk of agent-generated policy drift or hallucinated governance.
  - Migration Notes: treat missing evidence references as automatic non-admissibility.

- Artifact: `evolution/evolution-hardening.md`
  - Change Class: `threshold-tuning`
  - Rationale: add regression matrix and hardening guardrails for long-term updates.
  - Impact: future model evolution gains explicit safety regression controls.
  - Migration Notes: run hardening checks on every canonical change proposal.

- Artifact: `learnings/2026-03-02-cycle-002-phases-2-7-baseline.md`
  - Change Class: `non-breaking-doc`
  - Rationale: persist cycle assumptions, failures, and strengthened rules.
  - Impact: supports recursive improvement and audit traceability.
  - Migration Notes: maintain one learning record per recursive cycle.

## [0.3.0] - 2026-03-02
### Changed
- Artifact: `graph/canonical-decision-graph.md`
  - Change Class: `threshold-tuning`
  - Rationale: enforce monotonic irreversibility, remove unsafe shortcut paths, and strengthen risk-cap sequencing dependencies.
  - Impact: graph traversal is now safety-monotonic and less evaluator-ambiguous.
  - Migration Notes: align runtime graph evaluators to updated edges and launch irreversibility score.

- Artifact: `graph/universal-decision-nodes.yaml`
  - Change Class: `threshold-tuning`
  - Rationale: harden prerequisites/blocked conditions and materialize controlled subset of remaining canonical nodes.
  - Impact: expanded node coverage improves safe progression and reduces localized deadlocks.
  - Migration Notes: revalidate all node packs against canonical schema after pull.

- Artifact: `engine/next-best-decision-spec.md`
  - Change Class: `threshold-tuning`
  - Rationale: remove heuristic weight stacking and enforce deterministic rule hierarchy.
  - Impact: next-best outputs are stable and reproducible across evaluator implementations.
  - Migration Notes: remove weighted ranking logic in downstream engines.

- Artifact: `constraints/constraint-model.md`
  - Change Class: `threshold-tuning`
  - Rationale: formalize deterministic evaluation order and integrate risk-cap precedence.
  - Impact: conflict resolution is fail-closed and deterministic.
  - Migration Notes: apply precedence order exactly as documented.

- Artifact: `readiness/readiness-framework.md`
  - Change Class: `threshold-tuning`
  - Rationale: tighten structural and identity-locking thresholds to require multi-dimensional readiness.
  - Impact: single-dimension unlock paths for high-impact decisions are removed.
  - Migration Notes: update readiness calculators for new floors and extra-gate conjunctive checks.

- Artifact: `execution/execution-bridge-spec.md`
  - Change Class: `non-breaking-doc`
  - Rationale: harden boundary language to explicitly prohibit advice-generation and autonomous execution.
  - Impact: clearer separation between decision intelligence and execution systems.
  - Migration Notes: none.

- Artifact: `governance/agent-governance.md`
  - Change Class: `non-breaking-doc`
  - Rationale: strengthen fail-closed enforcement wording for ontology/constraint override attempts.
  - Impact: agent authority boundaries are stricter and less ambiguous.
  - Migration Notes: none.

- Artifact: `simulation/contradiction-testing-protocol.md`
  - Change Class: `non-breaking-doc`
  - Rationale: add explicit oscillation test requirement for next-best output stability.
  - Impact: contradiction testing now includes deterministic output consistency checks.
  - Migration Notes: run oscillation check in every simulation cycle.

- Artifact: `evolution/evolution-hardening.md`
  - Change Class: `non-breaking-doc`
  - Rationale: add explicit modification/deprecation rules and deterministic contradiction workflow.
  - Impact: long-term governance is more explicit for lifecycle operations.
  - Migration Notes: include deprecation mapping in future node retirement changes.

### Added
- Artifact: `simulation/cycle-003-deep-simulation-results.md`
  - Change Class: `non-breaking-doc`
  - Rationale: record deep edge-profile stress outcomes, deadlock status, and oscillation findings.
  - Impact: improves audit trail for simulation hardening.
  - Migration Notes: continue one deep simulation result artifact per hardening cycle.

- Artifact: `simulation/c002-resolution-analysis.md`
  - Change Class: `non-breaking-doc`
  - Rationale: document root-cause and systemic resolution of C-002 unsafe unlock contradiction.
  - Impact: preserves deterministic reasoning path for future regression checks.
  - Migration Notes: reference this contradiction record when modifying risk-cap logic.

- Artifact: `simulation/cycle-003-graph-traversal-safety-audit.md`
  - Change Class: `non-breaking-doc`
  - Rationale: capture traversal verification for shortcut-path safety invariants.
  - Impact: provides proof artifact for graph safety checks.
  - Migration Notes: rerun when adding or reordering edges.

- Artifact: `simulation/cycle-003-step-14-expansion-replay.md`
  - Change Class: `non-breaking-doc`
  - Rationale: log controlled node materialization and replay outcomes after each addition.
  - Impact: demonstrates safe expansion without reintroducing deadlocks or oscillation.
  - Migration Notes: preserve 3-5 node expansion limit with replay per step.

- Artifact: `schemas/schema-validation-protocol.md`
  - Change Class: `non-breaking-doc`
  - Rationale: define repeatable schema and optional-field integrity validation process.
  - Impact: schema compliance checks become reproducible across cycles.
  - Migration Notes: run protocol before every release commit.

- Artifact: `schemas/cycle-003-schema-validation-report.md`
  - Change Class: `non-breaking-doc`
  - Rationale: record cycle-level schema validation pass for materialized nodes.
  - Impact: provides compliance evidence for this hardening cycle.
  - Migration Notes: update node count and outcome each cycle.

- Artifact: `learnings/2026-03-02-cycle-003-step-01-monotonic-audit.md`
  - Change Class: `non-breaking-doc`
  - Rationale: persist monotonic violation detection and pre-fix reasoning.
  - Impact: traceability for graph safety changes.
  - Migration Notes: none.

- Artifact: `learnings/2026-03-02-cycle-003-step-02-node-audit.md`
  - Change Class: `non-breaking-doc`
  - Rationale: persist node completeness findings and remediations.
  - Impact: improves node-quality audit lineage.
  - Migration Notes: none.

- Artifact: `learnings/2026-03-02-cycle-003-step-06-constraint-integrity-audit.md`
  - Change Class: `non-breaking-doc`
  - Rationale: record deterministic integrity check outcomes for constraints model.
  - Impact: supports constraint-governance continuity.
  - Migration Notes: none.

- Artifact: `learnings/2026-03-02-cycle-003-hardening-pass.md`
  - Change Class: `non-breaking-doc`
  - Rationale: capture cycle-level assumption shifts, anomalies, and rule hardening outcomes.
  - Impact: strengthens recursive learning loop.
  - Migration Notes: maintain one hardening learning record per cycle.

- Artifact: `learnings/2026-03-02-cycle-003-stability-report.md`
  - Change Class: `non-breaking-doc`
  - Rationale: provide structured cycle stability rating and expansion recommendation.
  - Impact: creates explicit go/no-go signal for next cycle scope.
  - Migration Notes: refresh stability rating every cycle.

## [0.4.0] - 2026-03-02
### Changed
- Artifact: `graph/canonical-decision-graph.md`
  - Change Class: `threshold-tuning`
  - Rationale: align sequencing edges with materialized node prerequisite chains for strict traversal integrity.
  - Impact: prerequisite bypass paths are eliminated for current node pack.
  - Migration Notes: run traversal audit whenever node prerequisites are edited.

- Artifact: `graph/universal-decision-nodes.yaml`
  - Change Class: `threshold-tuning`
  - Rationale: patch root-learning deadlock by shifting low-knowledge gate from hard-block to simulation-only.
  - Impact: null NBA outputs are removed for tested profiles while preserving safety floor at critically low knowledge.
  - Migration Notes: preserve simulation-first entry for low-knowledge states.

- Artifact: `readiness/readiness-framework.md`
  - Change Class: `threshold-tuning`
  - Rationale: enforce irreversibility gradient requirements for high-lock decisions and reduce over-gating on low-lock nodes.
  - Impact: readiness calibration better matches decision lock-in level.
  - Migration Notes: apply gradient guardrails in evaluator after base decision-type checks.

- Artifact: `simulation/synthetic-profiles.yaml`
  - Change Class: `non-breaking-doc`
  - Rationale: expand certification profile set to 10 for stronger determinism and deadlock testing.
  - Impact: broader edge-case coverage in simulation cycles.
  - Migration Notes: maintain at least 10 profiles for certification pass.

### Added
- Artifact: `constraints/constraint-state-transition-model.md`
  - Change Class: `non-breaking-doc`
  - Rationale: formalize bounded constraint transition equations and invariants.
  - Impact: transition logic is auditable and deterministic.
  - Migration Notes: update transition model before introducing any new constraint dynamics.

- Artifact: `simulation/cycle-004-graph-traversal-audit.md`
  - Change Class: `non-breaking-doc`
  - Rationale: record full traversal integrity checks for cycle certification.
  - Impact: provides explicit evidence of no cycles/backward unlocks/bypass paths.
  - Migration Notes: rerun after any graph edge change.

- Artifact: `simulation/cycle-004-nba-determinism.md`
  - Change Class: `non-breaking-doc`
  - Rationale: certify deterministic next-best output across repeated runs.
  - Impact: confirms no order-dependent nondeterminism in current selection logic.
  - Migration Notes: include dual-run deterministic check each certification cycle.

- Artifact: `simulation/cycle-004-constraint-state-transition-audit.md`
  - Change Class: `non-breaking-doc`
  - Rationale: verify per-node consume/replenish/compound consistency against transition model.
  - Impact: improves confidence in constraint semantics continuity.
  - Migration Notes: refresh per-node mapping when node pack changes.

- Artifact: `simulation/cycle-004-irreversibility-gradient-validation.md`
  - Change Class: `non-breaking-doc`
  - Rationale: document readiness-gradient validation and threshold alignment updates.
  - Impact: ties threshold rationale explicitly to irreversibility class.
  - Migration Notes: keep high-lock multidimensional checks active.

- Artifact: `simulation/cycle-004-deadlock-detection.md`
  - Change Class: `non-breaking-doc`
  - Rationale: document deadlock detection, classification, and in-cycle patch evidence.
  - Impact: establishes explicit null-output remediation trail.
  - Migration Notes: treat null NBA outputs as defects unless formally justified pause states.

- Artifact: `reports/stability-cycle-004.md`
  - Change Class: `non-breaking-doc`
  - Rationale: publish cycle-level stability certification metrics and verdict.
  - Impact: provides centralized control-health snapshot for governance review.
  - Migration Notes: produce one stability report per certification cycle.

- Artifact: `learnings/2026-03-02-cycle-004-stability-certification.md`
  - Change Class: `non-breaking-doc`
  - Rationale: capture cycle assumptions, anomalies, and rule-level outcomes.
  - Impact: preserves recursive learning continuity for future hardening passes.
  - Migration Notes: maintain one certification learning record per cycle.

- Artifact: `schemas/cycle-004-schema-validation-report.md`
  - Change Class: `non-breaking-doc`
  - Rationale: record cycle-004 schema conformance for current node pack.
  - Impact: provides certification evidence that node artifacts remain schema-valid.
  - Migration Notes: add one schema report per certification cycle.

- Artifact: `evolution/cycle-004-evolution-hardening-review.md`
  - Change Class: `non-breaking-doc`
  - Rationale: document explicit cycle-level verification of modification, deprecation, and contradiction workflow readiness.
  - Impact: confirms evolution governance remains certifiable without additional protocol drift.
  - Migration Notes: continue one hardening review record per certification cycle.

## [0.5.0] - 2026-03-02
### Changed
- Artifact: `engine/next-best-decision-spec.md`
  - Change Class: `threshold-tuning`
  - Rationale: couple optionality scoring to deterministic selection and add anti-loop/pivot safeguards for temporal runs.
  - Impact: progression-mode NBA behavior is less prone to nulls or repeated selection traps.
  - Migration Notes: enforce repeatability/pivot rules in runtime evaluators.

- Artifact: `readiness/readiness-framework.md`
  - Change Class: `threshold-tuning`
  - Rationale: align high-lock vs low-lock readiness behavior using irreversibility gradient guardrails.
  - Impact: temporal projections better preserve safety while allowing low-lock progression.
  - Migration Notes: keep gradient checks after base thresholds.

- Artifact: `README.md`
  - Change Class: `non-breaking-doc`
  - Rationale: include progression layer in canonical repository structure.
  - Impact: repository boundary now explicitly includes temporal modeling artifacts.
  - Migration Notes: none.

### Added
- Artifact: `progression/state-progression-model.md`
  - Change Class: `non-breaking-doc`
  - Rationale: define temporal user-state envelope and progression update cycle.
  - Impact: introduces auditable state evolution beyond static snapshots.
  - Migration Notes: persist progression snapshots with decision history and deltas.

- Artifact: `progression/decision-impact-model.yaml`
  - Change Class: `threshold-tuning`
  - Rationale: encode high-irreversibility temporal impacts, compounding risks, and option closures.
  - Impact: enables longitudinal consequence modeling for critical decisions.
  - Migration Notes: update impacts when high-lock decision semantics change.

- Artifact: `progression/optionality-model.md`
  - Change Class: `non-breaking-doc`
  - Rationale: formalize optionality score from reachability, reversibility, and flexibility.
  - Impact: adds strategic-flexibility signal to decision sequencing.
  - Migration Notes: keep score components normalized and auditable.

- Artifact: `progression/decision-repeatability-policy.yaml`
  - Change Class: `non-breaking-doc`
  - Rationale: prevent pathological repeat loops while allowing constrained fallback paths.
  - Impact: improves temporal convergence stability.
  - Migration Notes: tune repeatability windows with simulation evidence only.

- Artifact: `constraints/constraint-compounding-model.md`
  - Change Class: `threshold-tuning`
  - Rationale: add explicit compounding mechanisms (debt, time debt, cognitive overload, regulatory scaling).
  - Impact: makes long-horizon risk dynamics explicit.
  - Migration Notes: apply compounding after impact deltas and before classification.

- Artifact: `simulation/cycle-005-long-horizon-profiles.yaml`
  - Change Class: `non-breaking-doc`
  - Rationale: define longitudinal stress archetypes for forward projection.
  - Impact: improves realism of temporal behavior testing.
  - Migration Notes: keep profile count >= 5 for cycle-depth testing.

- Artifact: `simulation/cycle-005-forward-projection.md`
  - Change Class: `non-breaking-doc`
  - Rationale: document 5-step convergence trajectories, drift findings, and structural patches.
  - Impact: provides first longitudinal behavior audit.
  - Migration Notes: rerun projection after progression logic updates.

- Artifact: `reports/stability-cycle-005.md`
  - Change Class: `non-breaking-doc`
  - Rationale: publish temporal consistency and systemic drift stability scoring.
  - Impact: establishes dynamic-system health benchmark.
  - Migration Notes: produce one temporal stability report per progression cycle.

- Artifact: `learnings/2026-03-02-cycle-005-depth-progression-modeling.md`
  - Change Class: `non-breaking-doc`
  - Rationale: capture temporal modeling learnings and drift outcomes.
  - Impact: preserves longitudinal evolution trail.
  - Migration Notes: maintain one learning record per progression cycle.
