# Cycle 009 Regression Run (Frozen Suite)

Date: 2026-03-04  
Cycle: 009  
Suite: `simulation/regression-suite.yaml` (`ws1-regression-freeze` v1)  
Fixed denominator: `N = 10`

## Availability

Cycle 009 simulation run artifacts are not present in the repository snapshot for this worktree.  
To preserve denominator integrity, this report records an explicit skipped run rather than changing `N`.

## Execution Summary

- profiles executed: `0/10`
- profiles passed: `0/10`
- profiles failed: `0/10`
- profiles skipped: `10/10`

## Gate Summary

| Gate | Observed (`X/10`) | Threshold | Result |
| --- | --- | --- | --- |
| Determinism | `0/10` verified (`10/10` skipped) | `10/10` required | Fail |
| Null NBA | `0/10` verified (`10/10` skipped) | `0/10` required | Fail |
| Backward Unlock | `0/10` verified (`10/10` skipped) | `0/10` required | Fail |
| Prerequisite Bypass | `0/10` verified (`10/10` skipped) | `0/10` required | Fail |
| Risk Concentration | `0/10` verified (`10/10` skipped) | `<= 1/10` | Fail |
| Loop Tendency | `0/10` verified (`10/10` skipped) | `<= 1/10` | Fail |

## Skipped Profiles (Explicit)

Rationale for all skips: cycle-009 run outputs are not available in this repository snapshot; no per-profile execution trace or metric artifact exists to validate gates.

| Profile ID | Category | Status | Skip Rationale |
| --- | --- | --- | --- |
| fast-scaling-founder | long_horizon | skipped | no cycle-009 execution artifact |
| risk-seeking-serial-operator | long_horizon | skipped | no cycle-009 execution artifact |
| conservative-saver | long_horizon | skipped | no cycle-009 execution artifact |
| compliance-heavy-operator | long_horizon | skipped | no cycle-009 execution artifact |
| over-leveraged-growth-seeker | long_horizon | skipped | no cycle-009 execution artifact |
| high-income-zero-knowledge | adversarial | skipped | no cycle-009 execution artifact |
| high-knowledge-zero-time | adversarial | skipped | no cycle-009 execution artifact |
| high-risk-tolerance-no-capital | adversarial | skipped | no cycle-009 execution artifact |
| compliance-strong-time-fragile | adversarial | skipped | no cycle-009 execution artifact |
| recovery-mode-legal-risk-low | adversarial | skipped | no cycle-009 execution artifact |

## Delta vs Cycle 008

| Metric | Cycle 008 (`X/10`) | Cycle 009 (`X/10`) | Delta (numerator) |
| --- | --- | --- | --- |
| Profiles executed | `10/10` | `0/10` | `-10` |
| Profiles skipped | `0/10` | `10/10` | `+10` |
| Determinism verified | `10/10` | `0/10` | `-10` |
| Null NBA verified | `10/10` non-null (`0/10` null) | `0/10` verified | `-10` |
| Backward Unlock verified | `10/10` no unlock | `0/10` verified | `-10` |
| Prerequisite Bypass verified | `10/10` no bypass | `0/10` verified | `-10` |

## Verdict

Cycle 009 is **Not Available** and therefore **fails release gates** under frozen-suite governance due to `10/10` skipped profiles.
