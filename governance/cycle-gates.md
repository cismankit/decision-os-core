# Cycle Gates (WS1 Regression Freeze)

This document defines hard pass/fail release gates for the frozen regression suite in `simulation/regression-suite.yaml`.

## Scope and Denominator

- frozen suite denominator: `N = 10`
- denominator lock: all gate metrics must be reported as `X/10`
- skipped profiles do not reduce `N`; skips count as non-pass for gate math and must be explicitly justified

## Hard Pass/Fail Gates

A cycle is **Pass** only if every gate below passes; otherwise it is **Fail**.

| Gate | Requirement | Pass Condition | Fail Condition |
| --- | --- | --- | --- |
| Determinism | deterministic output stability across reruns | `10/10` (`100%`) deterministic | anything below `10/10` |
| Null NBA | no null next-best-action outcome | `0/10` null NBA | `>= 1/10` null NBA |
| Backward Unlock | no backward unlock events | `0/10` backward unlock | `>= 1/10` backward unlock |
| Prerequisite Bypass | no bypass of prerequisite requirements | `0/10` bypass | `>= 1/10` bypass |
| Risk Concentration | concentration tendency bounded by suite size | `<= 1/10` | `> 1/10` |
| Loop Tendency | loop tendency bounded by suite size | `<= 1/10` | `> 1/10` |

## Enforcement Notes

- No soft exceptions are allowed for release decisions under this policy.
- Missing data, missing artifacts, or unrun profiles are recorded as explicit skips and force gate failure for that cycle.
- Any future suite change requires a new governance approval and a new frozen denominator declaration.
