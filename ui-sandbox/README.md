# WS3 UI Sandbox

Minimal diagnostic-only sandbox for local WS3 evaluation, with no backend/API calls.

## What It Contains

- `/profiles`: select profile from local regression suite
- `/decision`: view NBA-style output, rationale, and blocked reasons
- `/projection`: run 1-5 step deterministic projection snapshots
- `/scenarios`: run realistic scenario profiles and inspect timeline outcomes
- `/graph`: basic read-only node-edge unlock view

All sandbox data is local and committed under `public/data`.

## Local Run

From `ui-sandbox/`:

```bash
npm install
npm run dev
```

## Build Verification

```bash
npm run build
```
