# Cycle 008 Regression Replay (Frozen Suite)

Date: 2026-03-04  
Cycle: 008  
Suite: `simulation/regression-suite.yaml` (`ws1-regression-freeze` v1)  
Fixed denominator: `N = 10`

## Artifact Set

- suite declaration: present (`N=10`)
- execution manifest: complete (`tested 10/10`, `skipped 0/10`)
- gate summary: complete with `X/10`
- delta table: included vs cycle 007

## Execution Summary

- profiles executed: `10/10`
- profiles passed: `10/10`
- profiles failed: `0/10`
- profiles skipped: `0/10`

## Gate Summary

| Gate | Observed (`X/10`) | Threshold | Result |
| --- | --- | --- | --- |
| Determinism | `10/10` | `10/10` required | Pass |
| Null NBA | `0/10` | `0/10` required | Pass |
| Backward Unlock | `0/10` | `0/10` required | Pass |
| Prerequisite Bypass | `0/10` | `0/10` required | Pass |
| Risk Concentration | `0/10` | `<= 1/10` | Pass |
| Loop Tendency | `0/10` | `<= 1/10` | Pass |

## Profile Execution Matrix

| Profile ID | Category | Status | Notes |
| --- | --- | --- | --- |
| fast-scaling-founder | long_horizon | pass | deterministic replay stable |
| risk-seeking-serial-operator | long_horizon | pass | deterministic replay stable |
| conservative-saver | long_horizon | pass | deterministic replay stable |
| compliance-heavy-operator | long_horizon | pass | deterministic replay stable |
| over-leveraged-growth-seeker | long_horizon | pass | deterministic replay stable |
| high-income-zero-knowledge | adversarial | pass | no null NBA observed |
| high-knowledge-zero-time | adversarial | pass | no loop tendency observed |
| high-risk-tolerance-no-capital | adversarial | pass | no concentration breach observed |
| compliance-strong-time-fragile | adversarial | pass | no prerequisite bypass observed |
| recovery-mode-legal-risk-low | adversarial | pass | no backward unlock observed |

## Delta vs Cycle 007 (Frozen Denominator)

| Metric | Cycle 007 (`X/10`) | Cycle 008 (`X/10`) | Delta (numerator) |
| --- | --- | --- | --- |
| Determinism | `10/10` | `10/10` | `0` |
| Null NBA | `0/10` | `0/10` | `0` |
| Backward Unlock | `0/10` | `0/10` | `0` |
| Prerequisite Bypass | `0/10` | `0/10` | `0` |
| Risk Concentration | `0/10` | `0/10` | `0` |
| Loop Tendency | `0/10` | `0/10` | `0` |

## Verdict

Cycle 008 passes all hard gates under the frozen denominator policy (`N=10`) with no skips (`0/10`).
