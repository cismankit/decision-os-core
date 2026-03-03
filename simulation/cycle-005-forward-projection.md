# Cycle 005 Forward Projection (5-Step)

Date: 2026-03-02
Profiles: `simulation/cycle-005-long-horizon-profiles.yaml`
Model inputs:
- `progression/state-progression-model.md`
- `progression/decision-impact-model.yaml`
- `progression/optionality-model.md`
- `constraints/constraint-compounding-model.md`
- `progression/decision-repeatability-policy.yaml`

## Convergence Summary

| profile_id | step-5 optionality | step-5 irreversibility accumulation | risk trend | convergence signal |
|---|---:|---:|---|---|
| fast-scaling-founder | 0.667 | 0.200 | degrading | learning-loop fallback |
| risk-seeking-serial-operator | 0.643 | 0.304 | stable | mixed progression |
| conservative-saver | 0.783 | 0.380 | stable | healthy progression |
| compliance-heavy-operator | 0.655 | 0.284 | degrading | legal-risk constrained loop |
| over-leveraged-growth-seeker | 0.651 | 0.200 | degrading | learning-loop fallback |

## Drift Findings

- irreversible commitment clustering: none
- optionality collapse (`< 0.30`): none
- risk concentration: 3 profiles
- over-conservatism (all steps learn-only): none
- convergence anomalies (<=2 unique decisions over 5 steps): 3 profiles

## Hidden Trap Check

- Null NBA outputs were detected in intermediate design and classified as design flaw.
- Structural patch applied:
  - repeatability fallback to lowest-irreversibility `learn-only` candidate when cooldown is sole blocker.
- Post-patch status: null outputs removed.

## Structural Drift Patches Applied

1. Added repeatability policy with null-prevention fallback.
2. Added engine invariant to avoid repeated adjacent loops.
3. Added pivot rule for 3-step repeated selection toward unresolved deficit relief.

## Residual Risks

- Risk concentration remains elevated for profiles with persistent legal/risk deficits.
- Convergence anomalies persist in high-friction profiles due incomplete materialization depth and constrained candidate diversity.
