# Next Best Decision Engine Spec (Phase 4)

## Purpose

Define deterministic logic to select one next best decision node.
This engine returns decision intelligence only (`learn-only` vs `execute-eligible`), never execution instructions.

## Inputs

- candidate nodes from canonical graph
- current constraint state snapshot
- readiness dimension scores with evidence/confidence
- node prerequisites and blocker conditions

## Deterministic Selection Hierarchy

All candidate evaluation and ordering must follow this exact sequence:

1. **Readiness filter**
   - apply readiness framework confidence, freshness, dimension floors, weighted threshold, and decision-type extra gates.
   - classify candidate as `readiness-pass` or `readiness-fail`.

2. **Safety filter**
   - evaluate hard constraints (`legal_exposure`, `risk`, and decision `blocked_when` hard rules).
   - any hard safety failure yields `ineligible-hard-block`.

3. **Irreversibility ordering**
   - among remaining candidates, order by ascending `irreversibility_score`.
   - exception: if a mandatory precedence rule requires a higher-irreversibility safety gate first, precedence rule wins.

4. **Constraint relief logic**
   - prefer node that resolves the highest-severity active constraint class in deterministic order:
     - `legal_exposure`
     - `risk`
     - `money`
     - `time`
     - `knowledge`
     - `cognitive_load`
     - `emotional_maturity`

5. **Optionality impact**
   - compute projected optionality using `progression/optionality-model.md`.
   - prefer node with higher projected `optionality_score` when safety-equivalent.
   - for ties, prefer node with lower expected lock-in horizon.

6. **Final deterministic tie-break**
   - lexicographic `decision_id`.

Status outcomes per node:
- `ineligible-hard-block`
- `eligible-learn-only`
- `eligible-execute`

## Mandatory Candidate Preconditions

- Candidate must have all prerequisites satisfied.
- Candidate with stale evidence beyond freshness windows cannot outrank a fresher equivalent node.
- Candidate with missing readiness evidence defaults to `eligible-learn-only` at most.
- Candidate already taken in recent history is ineligible unless explicitly marked repeatable by progression policy.

## Mandatory Precedence Rules

These rules prevent unsafe unlock behavior:

- `approve-risk-cap-policy` must be `eligible-execute` before `authorize-capital-allocation-envelope` can be selected as next best.
- `approve-risk-cap-policy` must be at least `eligible-learn-only` before `decide-major-liability-commitment` can be selected.
- no `identity-locking` node may be selected while any unresolved legal hard block exists.
- no node with `irreversibility_score >= 0.80` may be selected when `emotional_stability < 0.72` or confidence `< 0.75`.
- if the same `next_decision_id` is selected for 3 consecutive steps, force a constraint-relief pivot to the highest-priority unresolved deficit category (if any non-hard candidate exists).

## Output Contract

Engine returns:

- `next_decision_id`
- `status` (`learn-only` or `execute-eligible`)
- `blocking_reasons` (if learn-only)
- `evidence_gaps`
- `rule_refs` (which constraints/readiness rules were applied)

## Invariants

- Engine never outputs more than one next decision per cycle.
- Engine never upgrades a hard-blocked decision to learn-only by preference.
- Missing evidence cannot increase eligibility status.
- Heuristic weight stacking is disallowed; only rule-ordered deterministic selection is valid.
- Engine must avoid repeated same-decision loops across adjacent progression steps.
- Engine must fail-safe to a non-null `learn-only` candidate when repeatability cooldown is the only blocker.
