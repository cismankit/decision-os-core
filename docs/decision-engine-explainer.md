# Decision Engine Explainer

## What the engine does

The Universal Decision Engine selects a single next best decision from a constrained graph, then classifies the decision as:

- `execute-eligible`
- `learn-only`
- `blocked`

This protects users from unsafe sequence jumps while preserving forward progress.

## Constraint gating model

1. Check prerequisites.
2. Evaluate hard blocks (`blocked_when`).
3. Evaluate simulation-only gates.
4. Score candidates deterministically.
5. Select one decision with stable tie-break behavior.

## Optionality and projection

- Optionality delta estimates how much future flexibility is preserved.
- 5-step projections replay deterministic selection to surface:
  - drift risk
  - loop tendency
  - null NBA risk

## Why this is product-safe

- UI never invents rules.
- CLI runner and UI adapters consume the same deterministic evaluator outputs.
- Regression suite + cycle gates enforce stability and prevent hidden regressions.
