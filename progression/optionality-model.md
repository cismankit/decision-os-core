# Optionality Model (Cycle 005)

## Purpose

Quantify how much strategic flexibility remains after each decision step.

## Optionality Score

`optionality_score = 0.45 * reachable_future_ratio + 0.35 * reversibility_index + 0.20 * constraint_flexibility`

All components are normalized to `[0.0, 1.0]`.

### Component Definitions

- `reachable_future_ratio`
  - reachable non-blocked nodes / total graph nodes.
  - computed after applying current prerequisites and hard blocks.

- `reversibility_index`
  - `1.0 - avg(irreversibility_score of historical_decisions_taken)`
  - penalizes accumulation of irreversible commitments.

- `constraint_flexibility`
  - average headroom across canonical constraints:
  - `mean(max(0, current_level - required_level + 0.5))`, clipped to `[0,1]`.

## Interpretation Bands

- `0.75 - 1.00`: high optionality
- `0.50 - 0.74`: moderate optionality
- `0.30 - 0.49`: constrained optionality
- `< 0.30`: optionality collapse risk

## Engine Coupling

NBA tie-breaking and safety-equivalent selection must prefer higher `optionality_score`.
If two candidates are safety-equivalent and irreversibility-equivalent, select the candidate with the higher projected optionality score at `t+1`.
