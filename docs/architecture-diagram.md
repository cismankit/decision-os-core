# Universal Decision Engine Architecture

## System Map

```mermaid
flowchart LR
  A[Scenario / Regression Profiles YAML] --> B[CLI Runner tools/runner]
  A --> C[UI Engine Adapter ui-sandbox/src/engine-adapter]
  D[Graph + Constraints + Readiness + Progression Specs] --> B
  D --> C
  B --> E[Regression Harness / Cycle Gates]
  C --> F[UI Sandbox]
  E --> G[Stability & Certification Reports]
  F --> H[Human Interpretation Layer]
```

## Decision Flow

```mermaid
flowchart TD
  S[Profile State] --> R[Readiness + Safety Evaluation]
  R --> H{Hard Block?}
  H -- Yes --> L[learn-only or blocked outcome]
  H -- No --> I[Deterministic Ordering]
  I --> O[Next Best Decision]
  O --> P[Projection Update]
  P --> S
```

## Notes

- Engine specifications remain source-of-truth artifacts.
- CLI and UI consume deterministic outputs through a thin adapter layer.
- Regression harness gates every cycle before certification.
