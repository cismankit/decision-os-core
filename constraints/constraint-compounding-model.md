# Constraint Compounding Model (Cycle 005)

## Purpose

Define structural compounding effects that emerge over multiple decision steps.

## Compounding Factors

### 1) Debt Load Compounding

- Trigger:
  - credit/liability decisions present in history and `money.current_level < money.required_level`.
- Effect per step:
  - `money.current_level -= 0.02`
  - `risk.current_level -= 0.015`

### 2) Time Debt Accumulation

- Trigger:
  - `time.current_level < time.required_level` for consecutive steps.
- Effect per step:
  - `time.current_level -= 0.015`
  - `cognitive_load.current_level -= 0.01`

### 3) Cognitive Overload Penalty

- Trigger:
  - `cognitive_load.current_level < 0.45` for 2+ steps.
- Effect per step:
  - `knowledge.current_level -= 0.01`
  - `emotional_maturity.current_level -= 0.015`

### 4) Regulatory Complexity Scaling

- Trigger:
  - ownership/identity/liability high-lock decisions in history.
- Effect per step:
  - `legal_exposure.required_level += 0.01` (capped at `0.90`)
  - `knowledge.required_level += 0.005` (capped at `0.85`)

## Safety Rules

- Apply compounding after decision-impact deltas.
- Clamp all current/required levels to `[0.0, 1.0]`.
- If compounding pushes a hard-block category below threshold, the next decision must remain `learn-only` or `hard_block`.
- Compounding never bypasses canonical precedence order.
