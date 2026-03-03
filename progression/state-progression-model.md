# State Progression Model (Cycle 005)

## Purpose

Extend static decision-state evaluation into a temporal progression model without changing ontology or node taxonomy.

## Progression State Envelope

Each user state snapshot must include:

- `timestamp`
- `historical_decisions_taken` (ordered list of decision IDs)
- `constraints` (canonical categories with current/required/confidence/trend)
- `constraint_delta_over_time` (per-category signed delta from previous snapshot)
- `irreversibility_accumulation` (sum of chosen decision irreversibility scores, capped at `1.0` for normalized reporting)
- `optionality_score` (`0.0` to `1.0`)
- `risk_exposure_trend` (`improving`, `stable`, `degrading`)

## Temporal Update Cycle

At each step `t`:

1. evaluate next-best decision using deterministic engine.
   - enforce repeatability constraints from `progression/decision-repeatability-policy.yaml`.
2. apply decision impact deltas from `progression/decision-impact-model.yaml`.
3. apply compounding adjustments from `constraints/constraint-compounding-model.md`.
4. recompute optionality score from `progression/optionality-model.md`.
5. append decision to history and persist snapshot.

## Invariants

- No step may create undefined canonical constraint categories.
- `historical_decisions_taken` is append-only and auditable.
- Irreversibility accumulation cannot decrease.
- Optionality score changes must be explainable by reachability, reversibility, or flexibility deltas.
- Safety hard blocks remain authoritative even if temporal trends are favorable.
