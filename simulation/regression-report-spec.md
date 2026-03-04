# Regression Report Specification (Frozen Suite)

## Scope

- suite reference: `simulation/regression-suite.yaml`
- fixed denominator: `N = 10`
- applicable cycles: every cycle claiming regression status against the frozen suite

## Denominator Policy (Strict)

- Every metric section must use `X/10` format.
- Percent-only reporting is not allowed without the paired `X/10` value.
- Skipped or unavailable profiles must still be counted in denominator handling:
  - show `tested`, `passed`, `failed`, and `skipped` using `X/10`
  - include explicit skip list by profile id with a rationale for each skip
- A report is non-compliant if any metric omits denominator or silently drops profiles.

## Required Artifacts

Each cycle report must include the following artifacts:

1. **Suite Declaration**
   - suite id and version
   - denominator statement (`N=10`)
   - cycle id and run date
2. **Execution Manifest**
   - per-profile run status (`pass`, `fail`, `skipped`, `not_available`)
   - replay/run seed and deterministic rerun count
3. **Gate Result Table**
   - all gates from `governance/cycle-gates.md`
   - measured value as `X/10`
   - threshold
   - pass/fail
4. **Delta Table (vs previous cycle)**
   - per-gate delta in numerator terms against previous reported cycle
   - per-profile status changes (`pass->fail`, `fail->pass`, `pass->skipped`, etc.)
5. **Failure and Skip Evidence**
   - failing profile IDs with short root-cause notes
   - skipped profile IDs with explicit justification and owner/action
6. **Certification Recommendation**
   - recommendation candidate (`Certified`, `Release Candidate`, or `Not Certified`)
   - rationale tied to gate outcomes and denominator-complete accounting

## Required Tables

Reports must contain the following minimum tables.

### Table A: Profile Execution Matrix

| Profile ID | Category | Status | Deterministic | Null NBA | Backward Unlock | Prerequisite Bypass | Risk Concentration | Loop Tendency | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

### Table B: Gate Summary

| Gate | Observed (`X/10`) | Threshold | Result |
| --- | --- | --- | --- |

### Table C: Cycle Delta

| Metric | Previous Cycle (`X/10`) | Current Cycle (`X/10`) | Delta (numerator) |
| --- | --- | --- | --- |

## Compliance Checklist

- [ ] all metric lines use `X/10`
- [ ] skipped profiles explicitly listed with reasons
- [ ] gate table complete and threshold-aligned
- [ ] delta table present with previous-cycle comparison
- [ ] recommendation explicitly justified
