# Contributing to HIxAI

Thanks for your interest in contributing. Here's how to get started.

## Setup

1. Clone the repository and install dependencies:

```bash
git clone https://github.com/hixaigroup/hixai.git
cd hixai
pnpm install
```

2. Start the development environment:

```bash
pnpm dev
```

This launches the API server and React UI with file watching. An embedded PostgreSQL database is provisioned automatically — no external setup needed.

## Making Changes

- Create a feature branch from `master`
- Keep commits focused and descriptive
- Run `pnpm typecheck` and `pnpm test:run` before opening a PR
- If you've changed API behavior, update the corresponding documentation

## Code Organization

| Directory | Purpose |
| --- | --- |
| `server/` | Express API, orchestration services, database layer |
| `ui/` | React front-end (Vite, TypeScript, Tailwind) |
| `cli/` | Command-line tools for setup and administration |
| `packages/` | Shared libraries, runtime adapters, plugin SDK |
| `doc/` | Architecture specs, development guides |
| `skills/` | Agent skill definitions |

## Guidelines

- Every domain entity must be scoped to a company. Enforce company boundaries in routes and services.
- Keep schema changes, API updates, and UI changes in sync across all layers.
- Don't bypass control-plane invariants (budget enforcement, task atomicity, governance gates).
- Prefer additive updates to strategic documents like `doc/SPEC.md`.

## Reporting Issues

Use [GitHub Issues](https://github.com/hixaigroup/hixai/issues) for bugs and feature requests. Include reproduction steps when possible.

## License

By contributing, you agree that your contributions will be licensed under the project's MIT license.
