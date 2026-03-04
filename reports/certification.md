# Certification Policy (WS1 Regression Freeze)

This policy defines release statuses using the frozen regression suite denominator (`N=10`) and hard gates in `governance/cycle-gates.md`.

## Status Definitions

| Status | Definition | Minimum Conditions |
| --- | --- | --- |
| Certified | cycle passes all hard gates against frozen suite | determinism `10/10`; null NBA `0/10`; backward unlock `0/10`; prerequisite bypass `0/10`; risk concentration `<= 1/10`; loop tendency `<= 1/10`; skipped profiles `0/10` |
| Release Candidate | cycle is prepared for release review but not yet stable-release eligible | current cycle is Certified, but there are not yet two consecutive Certified cycles |
| Stable Release | release line is proven stable across consecutive cycles | two consecutive cycles are Certified under the same frozen suite and denominator |

## Denominator and Skip Rules

- All certification metrics must be shown as `X/10`.
- Skips are explicit and counted in denominator; any `> 0/10` skips blocks Certified status.
- Missing cycle artifacts are treated as skipped profiles and force non-certified outcome.

## Certification Decision Logic

1. Evaluate hard gates from `governance/cycle-gates.md` using `X/10`.
2. If any gate fails, status is not Certified.
3. If all gates pass and this is the first Certified cycle in a streak, status is Release Candidate.
4. If all gates pass for two consecutive cycles, status is Stable Release.

## Record Requirements

- Every cycle certification record must cite:
  - the suite file and version
  - denominator statement (`N=10`)
  - gate summary table
  - skip list (must be `0/10` for Certified)
