# WS2 CLI Runner

Deterministic command-line runner for WS2 regression and projection checks.
It consumes existing YAML artifacts directly from `simulation/` and `graph/`.

## Requirements

- Python 3.9+
- `PyYAML` (`pip install pyyaml`)

If `PyYAML` is missing, commands fail with a clear install hint.

## Determinism

- Decision nodes are loaded in sorted `decision_id` order.
- Required constraint categories are evaluated in sorted category order.
- Output is JSON with sorted keys for stable diffs.

## Optionality Delta Approximation

`optionality_delta` is a deterministic approximation:

- higher when more required constraints meet execute thresholds
- lower for higher irreversibility scores
- adjusted by gating class (`execute-eligible` > `learn-only` > `blocked`)

This is intentionally simple and regression-friendly.

## Commands

Run from repository root:

```bash
python tools/runner/run-nba --profile student-low-buffer-high-urgency
```

```bash
python tools/runner/project --profile student-low-buffer-high-urgency --steps 5
```

```bash
python tools/runner/audit --suite simulation/regression-suite.yaml
```

You can also pass a profile file path:

```bash
python tools/runner/run-nba --profile simulation/synthetic-profiles.yaml
```

Note: profile-file mode expects exactly one profile in that file.

## Output Fields

Runner outputs include:

- `chosen_decision`
- `gating_reason` (`blocked`, `learn-only`, `execute-eligible`)
- `constraint_deltas` (level/confidence/freshness deltas)
- `optionality_delta`
- `drift_flags` (`risk_trend`, `loop_detected`)

## Self-check

```bash
python -m tools.runner.core self-check
```

Validates deterministic repeatability on a known synthetic profile.
