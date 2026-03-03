# Decision OS Core

Canonical decision infrastructure for NavigatorOS / Decision OS.

This repository encodes decision intelligence only:
- ontology
- constraints
- readiness
- canonical schemas
- evolution governance

It does not execute actions, integrate platforms, or define UI behavior.

## Repository Structure

- `ontology/` - global decision taxonomy, domains, and irreversibility model.
- `constraints/` - constraint state model and conflict resolution logic.
- `readiness/` - multidimensional readiness scoring and decision gating.
- `schemas/` - canonical decision node schema (YAML + normative markdown).
- `graph/` - minimum universal decision graph and canonical high-impact node set.
- `simulation/` - contradiction/deadlock simulation protocol and cycle results.
- `engine/` - next-best decision selection logic specification.
- `progression/` - temporal state progression and optionality modeling artifacts.
- `execution/` - execution bridge payload and handoff expectations.
- `governance/` - internal agent governance, authority limits, and controls.
- `evolution/` - change governance and contradiction adjudication.
- `learnings/` - evidence and ingestion protocol for model updates.
- `changelog/` - auditable change history.

## System Boundary

- Decision intelligence determines whether a decision is blocked, simulation-only, or execute-eligible.
- Execution systems consume this output but are out of scope for this repository.

## Internal Agentic Mode Policy

Agents are internal workers that can validate and test, never govern.

Allowed:
- domain reality validation
- contradiction detection
- schema consistency checks
- synthetic user-state simulation tests

Disallowed:
- creating ontology categories without protocol
- overriding constraints or thresholds
- bypassing blocked conditions
- asserting authority over canonical artifacts

Required output from any agent run:
- evidence references
- contradictions found
- proposed file-level diff scope

## Phase 1 Completion Contract

Phase 1 is complete when:
- all required canonical artifacts exist and are versioned
- required schema fields are identical across YAML and Markdown schema docs
- readiness gating clearly separates `learn-only` from `execute-eligible`
- changelog and evolution protocol define auditable update process
