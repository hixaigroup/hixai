# Contributor Guidelines — HIxAI

Instructions for human and AI contributors working in this repository.

## Context

HIxAI is an orchestration control plane for AI-agent teams. The current build target is V1, defined in `doc/SPEC-implementation.md`.

## Architecture Overview

- `doc/SPEC.md` — Long-term product vision and design rationale
- `doc/SPEC-implementation.md` — The concrete V1 build contract
- `server/` — Express REST API and core orchestration services
- `ui/` — React front-end (Vite + TypeScript)
- `cli/` — Command-line interface for setup and management
- `packages/` — Shared libraries, adapters, and plugin SDK

## Development Defaults

- For local development, leave `DATABASE_URL` unset. The server will use an embedded PGlite instance automatically.
- Run `pnpm dev` to start both the API server and UI in watch mode.

## Contribution Principles

1. **Scope everything to a company.** Every domain entity belongs to a company. Company boundaries must be enforced at the route and service layer.

2. **Keep layers in sync.** When you modify schema, API behavior, or service logic, update all affected layers — types, routes, services, UI, and docs.

3. **Respect control-plane invariants.** Budget enforcement, task checkout atomicity, and governance gates are system-level guarantees. Don't bypass them.

4. **Prefer additive changes to docs.** Don't overwrite strategic documents unless explicitly asked. Keep `doc/SPEC.md` and `doc/SPEC-implementation.md` consistent with each other.

5. **Test your changes.** Run `pnpm typecheck` and `pnpm test:run` before submitting. If you're changing API behavior, verify the affected flows end-to-end.
