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

## [0.6.0] - 2026-03-02
### Changed
- Artifact: `engine/next-best-decision-spec.md`
  - Change Class: `threshold-tuning`
  - Rationale: enforce risk-trend precedence override and stronger equivalent-loop pivot constraints.
  - Impact: reduces drift under prolonged degradation while preserving deterministic ordering.
  - Migration Notes: apply risk-trend override only when degradation streak threshold is met.

- Artifact: `progression/decision-repeatability-policy.yaml`
  - Change Class: `threshold-tuning`
  - Rationale: add equivalent-loop window controls and deadlock-signature escalation settings.
  - Impact: fallback behavior is less likely to mask structural deadlocks.
  - Migration Notes: keep fallback threshold and escalation action aligned with projection horizon.

- Artifact: `constraints/constraint-compounding-model.md`
  - Change Class: `threshold-tuning`
  - Rationale: calibrate compounding penalties and add stability recovery counterbalance for risk-relief decisions.
  - Impact: lowers persistent risk concentration artifacts in forward projections.
  - Migration Notes: validate compounding tweaks with before/after projection evidence.

- Artifact: `graph/universal-decision-nodes.yaml`
  - Change Class: `threshold-tuning`
  - Rationale: convert selected critical hard-block thresholds to simulation-first gates where progression path should remain available.
  - Impact: high-friction profiles preserve safe learn-only progression rather than collapsing into repetitive dead paths.
  - Migration Notes: preserve hard blocks for critical floor breaches only.

### Added
- Artifact: `engine/cycle-006-risk-trend-precedence.md`
  - Change Class: `non-breaking-doc`
  - Rationale: document deterministic precedence tightening for degrading risk trend cases.
  - Impact: makes risk-relief override behavior explicit and auditable.
  - Migration Notes: reference this doc when modifying precedence layers.

- Artifact: `simulation/cycle-006-risk-concentration-root-causes.md`
  - Change Class: `non-breaking-doc`
  - Rationale: record compact root-cause analysis for concentration profiles.
  - Impact: links drift observations to structural fixes.
  - Migration Notes: update table each drift-reduction cycle.

- Artifact: `simulation/cycle-006-deadlock-signature.md`
  - Change Class: `non-breaking-doc`
  - Rationale: define and audit fallback-masked deadlock signature behavior.
  - Impact: introduces explicit guard against hidden deadlocks.
  - Migration Notes: include signature counts in future projection reports.

- Artifact: `simulation/cycle-006-forward-projection.md`
  - Change Class: `non-breaking-doc`
  - Rationale: capture baseline-vs-post projection outcomes for drift-reduction pass.
  - Impact: provides evidence for concentration and loop reductions.
  - Migration Notes: keep same profile set for comparability.

- Artifact: `simulation/cycle-006-determinism-regression.md`
  - Change Class: `non-breaking-doc`
  - Rationale: verify determinism preservation after drift fixes.
  - Impact: confirms no order-based nondeterminism introduced.
  - Migration Notes: run with shuffled candidate order each cycle.

- Artifact: `reports/stability-cycle-006.md`
  - Change Class: `non-breaking-doc`
  - Rationale: publish cycle-level baseline/post drift deltas and recommendation.
  - Impact: provides hardening readiness signal for next phase.
  - Migration Notes: include baseline comparison table each cycle.

- Artifact: `learnings/2026-03-02-cycle-006-drift-reduction.md`
  - Change Class: `non-breaking-doc`
  - Rationale: record assumptions, fixes, and measured outcomes from drift pass.
  - Impact: preserves traceable learning continuity.
  - Migration Notes: maintain one learning file per cycle.

## [0.7.0] - 2026-03-02
### Changed
- Artifact: `graph/universal-decision-nodes.yaml`
  - Change Class: `threshold-tuning`
  - Rationale: materialize high-leverage canonical nodes and calibrate relief-path hard blocks after stop-condition trigger.
  - Impact: expansion depth increased while maintaining drift and determinism gates.
  - Migration Notes: keep simulation-first gates for recoverable high-friction states.

- Artifact: `graph/canonical-decision-graph.md`
  - Change Class: `threshold-tuning`
  - Rationale: align edge set with newly materialized prerequisite dependency chain.
  - Impact: prerequisite path integrity remains exact for expanded node set.
  - Migration Notes: re-run traversal audit after any edge modification.

### Added
- Artifact: `simulation/cycle-007-traversal-audit.md`
  - Change Class: `non-breaking-doc`
  - Rationale: record traversal gate outcomes for autonomous expansion cycle.
  - Impact: auditable proof of invariant preservation.
  - Migration Notes: one traversal report per expansion cycle.

- Artifact: `simulation/cycle-007-determinism-regression.md`
  - Change Class: `non-breaking-doc`
  - Rationale: verify deterministic selection stability after expansion.
  - Impact: confirms no nondeterminism introduced.
  - Migration Notes: keep shuffled-order check in each cycle.

- Artifact: `simulation/cycle-007-forward-projection.md`
  - Change Class: `non-breaking-doc`
  - Rationale: capture drift metrics after expansion and hardening replay.
  - Impact: demonstrates threshold compliance (`risk <=1/5`, `loop <=1/5`, `null=0`).
  - Migration Notes: preserve same profile set for comparability.

- Artifact: `simulation/cycle-007-stop-and-hardening.md`
  - Change Class: `non-breaking-doc`
  - Rationale: document stop-condition trigger, root cause, and restoration actions.
  - Impact: preserves safety-governed autonomous operation trail.
  - Migration Notes: create whenever autonomous cycle enters stop state.

- Artifact: `learnings/2026-03-02-cycle-007-autonomous-expansion.md`
  - Change Class: `non-breaking-doc`
  - Rationale: log node additions, gate outcomes, and in-cycle hardening event.
  - Impact: maintains recursive learning continuity.
  - Migration Notes: one learning record per cycle.

## [0.8.0] - 2026-03-02
### Changed
- Artifact: `graph/canonical-decision-graph.md`
  - Change Class: `threshold-tuning`
  - Rationale: introduce meta-layer sequencing edges and align prerequisite reachability.
  - Impact: enables deterministic arbitration/escalation path without violating graph invariants.
  - Migration Notes: rerun traversal audit after any meta-edge update.

- Artifact: `graph/universal-decision-nodes.yaml`
  - Change Class: `threshold-tuning`
  - Rationale: materialize meta-decision nodes and calibrate stress-path gating for safe activation.
  - Impact: global arbitration and escalation decisions are now representable in canonical schema.
  - Migration Notes: maintain simulation-first behavior for recoverable stress states.

- Artifact: `engine/next-best-decision-spec.md`
  - Change Class: `threshold-tuning`
  - Rationale: add deterministic meta-arbitration layer and escalation-loop guard.
  - Impact: NBA can switch strategy mode under global stress without breaking determinism.
  - Migration Notes: keep meta override subordinate to hard safety gates.

- Artifact: `progression/decision-impact-model.yaml`
  - Change Class: `threshold-tuning`
  - Rationale: encode temporal impact behavior for meta decisions.
  - Impact: stress projections now reflect strategic arbitration effects over time.
  - Migration Notes: update meta impacts when escalation policy semantics evolve.

- Artifact: `constraints/constraint-compounding-model.md`
  - Change Class: `threshold-tuning`
  - Rationale: include meta decisions in risk-relief counterbalance logic.
  - Impact: reduces artificial risk persistence after valid strategic interventions.
  - Migration Notes: validate with stress-projection evidence on each calibration change.

### Added
- Artifact: `simulation/cycle-008-meta-stress-profiles.yaml`
  - Change Class: `non-breaking-doc`
  - Rationale: define dedicated meta-layer stress scenarios (growth/compliance/liquidity/capital shock).
  - Impact: validates arbitration behavior under cross-domain tension.
  - Migration Notes: maintain scenario comparability for future cycle deltas.

- Artifact: `simulation/cycle-008-traversal-audit.md`
  - Change Class: `non-breaking-doc`
  - Rationale: record invariant verification after meta-layer insertion.
  - Impact: confirms no cycles/backward unlocks/prerequisite bypass.
  - Migration Notes: one traversal report per cycle.

- Artifact: `simulation/cycle-008-determinism-regression.md`
  - Change Class: `non-breaking-doc`
  - Rationale: confirm deterministic stability after meta-layer changes.
  - Impact: ensures no order-dependent behavior introduced.
  - Migration Notes: keep shuffled-order regression in every cycle.

- Artifact: `simulation/cycle-008-forward-projection.md`
  - Change Class: `non-breaking-doc`
  - Rationale: document stress-projection outcomes for meta-layer behavior.
  - Impact: verifies no risk spike, no null NBA, no escalation loops in tested scenarios.
  - Migration Notes: preserve stress profile set for trend tracking.

- Artifact: `simulation/cycle-008-stop-and-hardening.md`
  - Change Class: `non-breaking-doc`
  - Rationale: document stop-condition trigger and restoration actions during autonomous cycle.
  - Impact: preserves auditable safety-governed autonomy behavior.
  - Migration Notes: emit whenever stop conditions trigger within a cycle.

- Artifact: `reports/stability-cycle-008.md`
  - Change Class: `non-breaking-doc`
  - Rationale: publish post-meta-layer stability verdict and gate metrics.
  - Impact: provides cycle readiness signal for continued autonomous progression.
  - Migration Notes: continue one stability report per cycle.

- Artifact: `learnings/2026-03-02-cycle-008-meta-decision-layer.md`
  - Change Class: `non-breaking-doc`
  - Rationale: capture meta-layer additions, stop-event recovery, and final outcomes.
  - Impact: preserves learning continuity for strategy-layer evolution.
  - Migration Notes: maintain one learning record per cycle.

## [0.10.0] - 2026-03-04
### Changed
- Artifact: `README.md`
  - Change Class: `non-breaking-doc`
  - Rationale: add canonical one-line local test commands for CLI audit and UI sandbox.
  - Impact: cycle verification is faster and consistent for operators.
  - Migration Notes: keep command examples aligned with runner/UI entrypoints.

- Artifact: `tools/runner/core.py`
  - Change Class: `threshold-tuning`
  - Rationale: align suite parser with frozen regression format and harden deterministic projection against repeat loops/drift artifacts.
  - Impact: integrated frozen-suite audit now executes and passes required gates.
  - Migration Notes: keep runner deterministic ordering and anti-loop behavior stable across future edits.

- Artifact: `ui-sandbox/src/lib/dataLoader.js`
  - Change Class: `threshold-tuning`
  - Rationale: bind UI profile selector to frozen regression-suite IDs rather than unconstrained profile list.
  - Impact: UI diagnostics now evaluate the same canonical denominator as regression gates.
  - Migration Notes: update `public/data/regression-suite.json` whenever suite composition changes.

### Added
- Artifact: `governance/cycle-gates.md`
  - Change Class: `non-breaking-doc`
  - Rationale: codify hard pass/fail release gates for frozen denominator auditing.
  - Impact: cycle certification is now objective and repeatable.
  - Migration Notes: keep denominator policy explicit as `X/N`.

- Artifact: `simulation/regression-suite.yaml`
  - Change Class: `non-breaking-doc`
  - Rationale: freeze regression denominator and profile composition for consistent certification.
  - Impact: prevents denominator drift across cycles.
  - Migration Notes: profile changes require governance update.

- Artifact: `simulation/regression-report-spec.md`
  - Change Class: `non-breaking-doc`
  - Rationale: standardize required regression outputs and delta tables.
  - Impact: audit artifacts are comparable cycle-over-cycle.
  - Migration Notes: enforce explicit skip accounting.

- Artifact: `simulation/cycle-008-regression-replay.md`
  - Change Class: `non-breaking-doc`
  - Rationale: replay Cycle 008 results against frozen suite baseline.
  - Impact: preserves backward comparability for certified runs.
  - Migration Notes: rerun when cycle assumptions change.

- Artifact: `simulation/cycle-009-regression-run.md`
  - Change Class: `non-breaking-doc`
  - Rationale: record cycle-009 availability status with explicit denominator-safe skip semantics.
  - Impact: avoids silent denominator drift.
  - Migration Notes: replace skips with executed evidence once cycle-009 run is available.

- Artifact: `reports/certification.md`
  - Change Class: `non-breaking-doc`
  - Rationale: define Certified/Release Candidate/Stable Release policy with consecutive-cycle rule.
  - Impact: release state transitions are governed by explicit gate logic.
  - Migration Notes: keep criteria synced with governance gates.

- Artifact: `tools/README.md`
  - Change Class: `non-breaking-doc`
  - Rationale: document runner usage and expected outputs.
  - Impact: lowers activation cost for local audits.
  - Migration Notes: update examples whenever CLI args change.

- Artifact: `tools/runner/run-nba`
  - Change Class: `non-breaking-doc`
  - Rationale: add CLI entrypoint for single-step NBA inspection.
  - Impact: enables deterministic local checks from shell.
  - Migration Notes: keep executable and python entry wiring intact.

- Artifact: `tools/runner/project`
  - Change Class: `non-breaking-doc`
  - Rationale: add CLI entrypoint for multi-step projections.
  - Impact: drift behavior can be audited with fixed step horizons.
  - Migration Notes: preserve max-step guardrails in tooling.

- Artifact: `tools/runner/audit`
  - Change Class: `non-breaking-doc`
  - Rationale: add suite-wide audit command for regression freeze enforcement.
  - Impact: enables gate checks with single command.
  - Migration Notes: maintain compatibility with frozen suite schema.

- Artifact: `tools/runner/self-check-suite.yaml`
  - Change Class: `non-breaking-doc`
  - Rationale: provide deterministic self-check fixture for runner integrity.
  - Impact: supports quick sanity validation before full audits.
  - Migration Notes: keep lightweight and stable.

- Artifact: `ui-sandbox/*`
  - Change Class: `non-breaking-doc`
  - Rationale: add minimal diagnostic web sandbox for profile/decision/projection/graph inspection.
  - Impact: improves operator visibility without introducing product surface area.
  - Migration Notes: no backend/auth/db; keep data local.

- Artifact: `ui-sandbox/public/data/regression-suite.json`
  - Change Class: `non-breaking-doc`
  - Rationale: expose frozen suite IDs to UI loader for denominator-consistent selection.
  - Impact: UI profile list now aligns with governance suite.
  - Migration Notes: regenerate when regression suite changes.

- Artifact: `reports/stability-cycle-010.md`
  - Change Class: `non-breaking-doc`
  - Rationale: publish integrated cycle gate outcomes and certification status.
  - Impact: records Cycle 010 as certified release-candidate state.
  - Migration Notes: produce one stability report per cycle.

- Artifact: `learnings/2026-03-04-cycle-010-parallel-build.md`
  - Change Class: `non-breaking-doc`
  - Rationale: log parallel branch coordination outcomes and integration hardening learnings.
  - Impact: preserves traceability for multi-workstream orchestration.
  - Migration Notes: maintain one learning artifact per cycle.

## [0.11.0] - 2026-03-07
### Changed
- Artifact: `tools/runner/core.py`
  - Change Class: `threshold-tuning`
  - Rationale: harden deterministic runner behavior for certification replay and suite schema compatibility.
  - Impact: runner audit/projection now aligns with frozen-suite certification gates.
  - Migration Notes: keep `profiles`-shape suite support and anti-loop deterministic ordering behavior.

- Artifact: `ui-sandbox/src/lib/evaluator.js`
  - Change Class: `threshold-tuning`
  - Rationale: align sandbox evaluator with runner outputs for decision/status/optionality/projection parity.
  - Impact: UI diagnostics now reflect canonical runner behavior instead of diverging local logic.
  - Migration Notes: preserve parity checks before changing evaluator behavior.

- Artifact: `ui-sandbox/src/lib/dataLoader.js`
  - Change Class: `threshold-tuning`
  - Rationale: lock UI profile loading to regression-suite-aligned local dataset.
  - Impact: sandbox testing now uses frozen denominator profile set.
  - Migration Notes: update `regression-profiles.json` when regression-suite membership changes.

- Artifact: `ui-sandbox/src/pages/DecisionPage.jsx`
  - Change Class: `non-breaking-doc`
  - Rationale: expose optionality delta in decision diagnostics.
  - Impact: parity-visible metric now available in UI output.
  - Migration Notes: keep display synced with evaluator output contract.

- Artifact: `ui-sandbox/src/pages/ProjectionPage.jsx`
  - Change Class: `non-breaking-doc`
  - Rationale: expose optionality delta in projection diagnostics.
  - Impact: step-by-step parity checks are easier to inspect in UI.
  - Migration Notes: maintain projection field parity with runner.

- Artifact: `reports/certification.md`
  - Change Class: `non-breaking-doc`
  - Rationale: record cycle-010/011 consecutive certification status and Stable Release Candidate transition.
  - Impact: release state is now explicitly auditable in-policy.
  - Migration Notes: append cycle ledger rows every certification cycle.

### Added
- Artifact: `simulation/cycle-011-regression-run.md`
  - Change Class: `non-breaking-doc`
  - Rationale: record frozen-suite gate replay for cycle 011.
  - Impact: provides auditable certification baseline for this cycle.
  - Migration Notes: keep all metrics in `X/N` form.

- Artifact: `simulation/cycle-011-forward-projection.md`
  - Change Class: `non-breaking-doc`
  - Rationale: capture 5-step projection replay outcomes for all frozen-suite profiles.
  - Impact: confirms no drift regressions in certification cycle.
  - Migration Notes: preserve horizon and denominator for comparability.

- Artifact: `tools/runner/parity-validation-cycle-011.md`
  - Change Class: `non-breaking-doc`
  - Rationale: document runner vs engine parity checks for all regression profiles.
  - Impact: certifies CLI output consistency with engine evaluator behavior.
  - Migration Notes: regenerate every certification cycle.

- Artifact: `ui-sandbox/parity-validation-cycle-011.md`
  - Change Class: `non-breaking-doc`
  - Rationale: document UI evaluator parity against CLI runner across decision/projection outputs.
  - Impact: certifies sandbox as diagnostic mirror, not independent logic source.
  - Migration Notes: rerun after any UI evaluator or data-loader changes.

- Artifact: `ui-sandbox/public/data/regression-profiles.json`
  - Change Class: `non-breaking-doc`
  - Rationale: provide local frozen-suite-aligned profile dataset for parity-safe UI execution.
  - Impact: removes profile-set mismatch between UI and certification suite.
  - Migration Notes: keep synchronized with regression-suite sources.

- Artifact: `reports/stability-cycle-011.md`
  - Change Class: `non-breaking-doc`
  - Rationale: publish cycle-level gate/parity outcomes and certification state.
  - Impact: establishes second consecutive certified cycle evidence.
  - Migration Notes: produce one stability report per cycle.

- Artifact: `learnings/2026-03-07-cycle-011-consecutive-certification.md`
  - Change Class: `non-breaking-doc`
  - Rationale: capture parity fixes, certification outcomes, and release-state advancement.
  - Impact: preserves governance traceability for consecutive certification.
  - Migration Notes: maintain one learning record per cycle.

## [0.12.0] - 2026-03-07
### Changed
- Artifact: `tools/runner/core.py`
  - Change Class: `threshold-tuning`
  - Rationale: add scenario-profile execution path and summary projection output via `run-scenario`.
  - Impact: realistic scenario states are now executable through CLI without altering engine rules.
  - Migration Notes: keep scenario output contract stable (`nba_decision`, `gating_reason`, `optionality_delta`, `constraint_deltas`, `projection_summary`).

- Artifact: `tools/README.md`
  - Change Class: `non-breaking-doc`
  - Rationale: document scenario command usage and scenario-specific output fields.
  - Impact: operators can run scenario evaluations consistently.
  - Migration Notes: update examples when runner command surface changes.

- Artifact: `ui-sandbox/src/lib/dataLoader.js`
  - Change Class: `threshold-tuning`
  - Rationale: load scenario dataset in addition to regression data.
  - Impact: sandbox can evaluate both regression and real-scenario profile layers.
  - Migration Notes: keep local data paths aligned with committed JSON files.

- Artifact: `ui-sandbox/src/lib/evaluator.js`
  - Change Class: `threshold-tuning`
  - Rationale: preserve deterministic parity behavior while enabling scenario page execution.
  - Impact: scenario outputs remain consistent with CLI runner behavior.
  - Migration Notes: run parity checks after evaluator modifications.

- Artifact: `ui-sandbox/src/App.jsx`
  - Change Class: `non-breaking-doc`
  - Rationale: add `/scenarios` route to diagnostic navigation.
  - Impact: scenario simulation is accessible in sandbox UI.
  - Migration Notes: keep route list synchronized with page components.

### Added
- Artifact: `simulation/scenario-profiles.yaml`
  - Change Class: `non-breaking-doc`
  - Rationale: define realistic human scenario profile layer beyond synthetic regression set.
  - Impact: expands evaluation realism without changing ontology or node count.
  - Migration Notes: maintain required scenario dimensions and canonical constraint envelope.

- Artifact: `tools/runner/run-scenario`
  - Change Class: `non-breaking-doc`
  - Rationale: provide direct CLI entrypoint for scenario execution.
  - Impact: enables scenario NBA/projection checks from shell.
  - Migration Notes: preserve executable wrapper path bootstrapping.

- Artifact: `ui-sandbox/src/pages/ScenariosPage.jsx`
  - Change Class: `non-breaking-doc`
  - Rationale: add dedicated UI scenario viewer with current state + NBA + projection timeline.
  - Impact: improves diagnostic visibility for realistic user states.
  - Migration Notes: keep page read-only and logic-consumptive.

- Artifact: `ui-sandbox/public/data/scenario-profiles.json`
  - Change Class: `non-breaking-doc`
  - Rationale: provide local scenario dataset for sandbox execution without APIs.
  - Impact: allows deterministic scenario runs in browser.
  - Migration Notes: sync with `simulation/scenario-profiles.yaml`.

- Artifact: `simulation/cycle-012-scenario-evaluation.md`
  - Change Class: `non-breaking-doc`
  - Rationale: capture scenario-layer stability outcomes and drift checks.
  - Impact: provides auditable evidence that scenario layer preserves invariants.
  - Migration Notes: keep denominator explicit (`X/N`) and list per-scenario outcomes.

- Artifact: `learnings/2026-03-07-cycle-012-scenario-profile-layer.md`
  - Change Class: `non-breaking-doc`
  - Rationale: record implementation frictions and invariant outcomes for scenario layer rollout.
  - Impact: preserves recursive learning continuity.
  - Migration Notes: maintain one learning record per cycle.

## [0.12.1] - 2026-03-07
### Changed
- Artifact: `README.md`
  - Change Class: `non-breaking-doc`
  - Rationale: upgrade to product-grade documentation with architecture, workflows, certification model, and screenshot references.
  - Impact: improves operator onboarding and enterprise review readiness.
  - Migration Notes: keep screenshot paths and usage commands current.

- Artifact: `ui-sandbox/src/App.jsx`
  - Change Class: `threshold-tuning`
  - Rationale: add dashboard-first product navigation and enforce adapter-based evaluation/projection calls.
  - Impact: UI orchestration now aligns with product sections while preserving deterministic behavior.
  - Migration Notes: route additions should continue to consume adapter layer only.

- Artifact: `ui-sandbox/src/lib/evaluator.js`
  - Change Class: `threshold-tuning`
  - Rationale: expose richer evaluation state for product visualizations (node states, candidate stats, prerequisites).
  - Impact: enables graph/dashboard visualization without introducing independent decision rules.
  - Migration Notes: preserve parity tests after evaluator updates.

- Artifact: `ui-sandbox/src/lib/dataLoader.js`
  - Change Class: `threshold-tuning`
  - Rationale: load scenario datasets for scenario explorer and dashboard usage.
  - Impact: product UI can switch between regression and realistic scenario layers.
  - Migration Notes: keep local JSON sources synchronized with canonical YAML.

- Artifact: `ui-sandbox/src/pages/DecisionPage.jsx`
  - Change Class: `non-breaking-doc`
  - Rationale: route decision rendering through reusable decision card surface.
  - Impact: improves consistency of decision panel presentation.
  - Migration Notes: keep card props aligned with adapter output contract.

- Artifact: `ui-sandbox/src/pages/ProjectionPage.jsx`
  - Change Class: `non-breaking-doc`
  - Rationale: route projection rendering through reusable timeline component.
  - Impact: improves readability of projection state transitions.
  - Migration Notes: maintain 1-5 step projection cap.

- Artifact: `ui-sandbox/src/pages/GraphPage.jsx`
  - Change Class: `non-breaking-doc`
  - Rationale: replace static graph rendering with state-aware visualization component.
  - Impact: blocked/reachable/irreversible nodes are visible in graph context.
  - Migration Notes: keep graph read-only and data-driven.

- Artifact: `ui-sandbox/src/pages/ScenariosPage.jsx`
  - Change Class: `threshold-tuning`
  - Rationale: add parameter modification controls and projection timeline for scenario simulation.
  - Impact: scenario explorer now supports dynamic what-if analysis.
  - Migration Notes: continue using adapter wrappers for evaluation/projection.

- Artifact: `ui-sandbox/src/index.css`
  - Change Class: `non-breaking-doc`
  - Rationale: apply product-level visual system for meters, timelines, graph state colors, and dashboard layout.
  - Impact: diagnostic UI is now presentation-ready for stakeholder demos.
  - Migration Notes: preserve semantic classes used by reusable components.

### Added
- Artifact: `ui-sandbox/src/components/DecisionCard.tsx`
  - Change Class: `non-breaking-doc`
  - Rationale: reusable decision panel card for NBA details and deltas.
  - Impact: centralizes decision summary rendering.
  - Migration Notes: keep fields aligned with adapter output.

- Artifact: `ui-sandbox/src/components/ConstraintMeter.tsx`
  - Change Class: `non-breaking-doc`
  - Rationale: reusable constraint visualization meter.
  - Impact: improves at-a-glance readiness inspection.
  - Migration Notes: ensure required/current scaling remains normalized.

- Artifact: `ui-sandbox/src/components/OptionalityGauge.tsx`
  - Change Class: `non-breaking-doc`
  - Rationale: visualize optionality change in dashboard and panels.
  - Impact: optionality signal is now human-readable.
  - Migration Notes: keep value bounds synchronized with runner output ranges.

- Artifact: `ui-sandbox/src/components/ProjectionTimeline.tsx`
  - Change Class: `non-breaking-doc`
  - Rationale: reusable 5-step timeline with irreversible markers.
  - Impact: projection transitions are easier to interpret.
  - Migration Notes: keep irreversible threshold at `>= 0.80`.

- Artifact: `ui-sandbox/src/components/DecisionGraphView.tsx`
  - Change Class: `non-breaking-doc`
  - Rationale: state-aware node-edge graph visualization component.
  - Impact: graph conveys reachable/blocked/irreversible states.
  - Migration Notes: consume node state from adapter outputs only.

- Artifact: `ui-sandbox/src/engine-adapter/evaluateProfile.ts`
  - Change Class: `non-breaking-doc`
  - Rationale: create explicit adapter boundary for profile evaluation.
  - Impact: page-level UI no longer calls evaluator implementation directly.
  - Migration Notes: keep adapter thin and deterministic.

- Artifact: `ui-sandbox/src/engine-adapter/runProjection.ts`
  - Change Class: `non-breaking-doc`
  - Rationale: create explicit adapter boundary for projections.
  - Impact: projection invocation is standardized across pages.
  - Migration Notes: preserve deterministic step handling.

- Artifact: `ui-sandbox/src/engine-adapter/loadScenario.ts`
  - Change Class: `non-breaking-doc`
  - Rationale: centralize scenario loading and parameter override logic.
  - Impact: scenario explorer modifications stay isolated from page components.
  - Migration Notes: keep overrides bounded to `[0,1]`.

- Artifact: `ui-sandbox/src/pages/DashboardPage.tsx`
  - Change Class: `non-breaking-doc`
  - Rationale: add dashboard section with user state, readiness, risk, and optionality.
  - Impact: product layer now provides executive summary view.
  - Migration Notes: display only derived values from loaded state and adapter outputs.

- Artifact: `docs/architecture-diagram.md`
  - Change Class: `non-breaking-doc`
  - Rationale: provide architecture and decision-flow diagrams for technical stakeholders.
  - Impact: system topology is easier to audit and communicate.
  - Migration Notes: update diagrams when architecture boundaries change.

- Artifact: `docs/decision-engine-explainer.md`
  - Change Class: `non-breaking-doc`
  - Rationale: provide concise explainer of gating, NBA, and projection behavior.
  - Impact: improves cross-functional understanding of engine behavior.
  - Migration Notes: keep terminology aligned with canonical artifacts.

- Artifact: `docs/screenshots/*.png`
  - Change Class: `non-breaking-doc`
  - Rationale: capture product UI views for README documentation.
  - Impact: provides visual proof of interface capabilities.
  - Migration Notes: refresh screenshots after major UI updates.

- Artifact: `reports/stability-cycle-012.md`
  - Change Class: `non-breaking-doc`
  - Rationale: record post-productization validation and invariant status.
  - Impact: confirms UI/product layer did not destabilize certified gates.
  - Migration Notes: preserve gate table format for comparability.

- Artifact: `learnings/2026-03-07-cycle-012-productization.md`
  - Change Class: `non-breaking-doc`
  - Rationale: log productization-specific failures, fixes, and invariant outcomes.
  - Impact: extends learning trail beyond scenario-layer work.
  - Migration Notes: keep one learning record per major workstream within cycle.
