# CLI Reference

HIxAI CLI now supports both:

- instance setup/diagnostics (`onboard`, `doctor`, `configure`, `env`, `allowed-hostname`)
- control-plane client operations (issues, approvals, agents, activity, dashboard)

## Base Usage

Use repo script in development:

```sh
pnpm hixai --help
```

First-time local bootstrap + run:

```sh
pnpm hixai run
```

Choose local instance:

```sh
pnpm hixai run --instance dev
```

## Deployment Modes

Mode taxonomy and design intent are documented in `doc/DEPLOYMENT-MODES.md`.

Current CLI behavior:

- `hixai onboard` and `hixai configure --section server` set deployment mode in config
- runtime can override mode with `HIXAI_DEPLOYMENT_MODE`
- `hixai run` and `hixai doctor` do not yet expose a direct `--mode` flag

Target behavior (planned) is documented in `doc/DEPLOYMENT-MODES.md` section 5.

Allow an authenticated/private hostname (for example custom Tailscale DNS):

```sh
pnpm hixai allowed-hostname dotta-macbook-pro
```

All client commands support:

- `--data-dir <path>`
- `--api-base <url>`
- `--api-key <token>`
- `--context <path>`
- `--profile <name>`
- `--json`

Company-scoped commands also support `--company-id <id>`.

Use `--data-dir` on any CLI command to isolate all default local state (config/context/db/logs/storage/secrets) away from `~/.hixai`:

```sh
pnpm hixai run --data-dir ./tmp/hixai-dev
pnpm hixai issue list --data-dir ./tmp/hixai-dev
```

## Context Profiles

Store local defaults in `~/.hixai/context.json`:

```sh
pnpm hixai context set --api-base http://localhost:3100 --company-id <company-id>
pnpm hixai context show
pnpm hixai context list
pnpm hixai context use default
```

To avoid storing secrets in context, set `apiKeyEnvVarName` and keep the key in env:

```sh
pnpm hixai context set --api-key-env-var-name HIXAI_API_KEY
export HIXAI_API_KEY=...
```

## Company Commands

```sh
pnpm hixai company list
pnpm hixai company get <company-id>
pnpm hixai company delete <company-id-or-prefix> --yes --confirm <same-id-or-prefix>
```

Examples:

```sh
pnpm hixai company delete PAP --yes --confirm PAP
pnpm hixai company delete 5cbe79ee-acb3-4597-896e-7662742593cd --yes --confirm 5cbe79ee-acb3-4597-896e-7662742593cd
```

Notes:

- Deletion is server-gated by `HIXAI_ENABLE_COMPANY_DELETION`.
- With agent authentication, company deletion is company-scoped. Use the current company ID/prefix (for example via `--company-id` or `HIXAI_COMPANY_ID`), not another company.

## Issue Commands

```sh
pnpm hixai issue list --company-id <company-id> [--status todo,in_progress] [--assignee-agent-id <agent-id>] [--match text]
pnpm hixai issue get <issue-id-or-identifier>
pnpm hixai issue create --company-id <company-id> --title "..." [--description "..."] [--status todo] [--priority high]
pnpm hixai issue update <issue-id> [--status in_progress] [--comment "..."]
pnpm hixai issue comment <issue-id> --body "..." [--reopen]
pnpm hixai issue checkout <issue-id> --agent-id <agent-id> [--expected-statuses todo,backlog,blocked]
pnpm hixai issue release <issue-id>
```

## Agent Commands

```sh
pnpm hixai agent list --company-id <company-id>
pnpm hixai agent get <agent-id>
pnpm hixai agent local-cli <agent-id-or-shortname> --company-id <company-id>
```

`agent local-cli` is the quickest way to run local Claude/Codex manually as a HIxAI agent:

- creates a new long-lived agent API key
- installs missing HIxAI skills into `~/.codex/skills` and `~/.claude/skills`
- prints `export ...` lines for `HIXAI_API_URL`, `HIXAI_COMPANY_ID`, `HIXAI_AGENT_ID`, and `HIXAI_API_KEY`

Example for shortname-based local setup:

```sh
pnpm hixai agent local-cli codexcoder --company-id <company-id>
pnpm hixai agent local-cli claudecoder --company-id <company-id>
```

## Approval Commands

```sh
pnpm hixai approval list --company-id <company-id> [--status pending]
pnpm hixai approval get <approval-id>
pnpm hixai approval create --company-id <company-id> --type hire_agent --payload '{"name":"..."}' [--issue-ids <id1,id2>]
pnpm hixai approval approve <approval-id> [--decision-note "..."]
pnpm hixai approval reject <approval-id> [--decision-note "..."]
pnpm hixai approval request-revision <approval-id> [--decision-note "..."]
pnpm hixai approval resubmit <approval-id> [--payload '{"...":"..."}']
pnpm hixai approval comment <approval-id> --body "..."
```

## Activity Commands

```sh
pnpm hixai activity list --company-id <company-id> [--agent-id <agent-id>] [--entity-type issue] [--entity-id <id>]
```

## Dashboard Commands

```sh
pnpm hixai dashboard get --company-id <company-id>
```

## Heartbeat Command

`heartbeat run` now also supports context/api-key options and uses the shared client stack:

```sh
pnpm hixai heartbeat run --agent-id <agent-id> [--api-base http://localhost:3100] [--api-key <token>]
```

## Local Storage Defaults

Default local instance root is `~/.hixai/instances/default`:

- config: `~/.hixai/instances/default/config.json`
- embedded db: `~/.hixai/instances/default/db`
- logs: `~/.hixai/instances/default/logs`
- storage: `~/.hixai/instances/default/data/storage`
- secrets key: `~/.hixai/instances/default/secrets/master.key`

Override base home or instance with env vars:

```sh
HIXAI_HOME=/custom/home HIXAI_INSTANCE_ID=dev pnpm hixai run
```

## Storage Configuration

Configure storage provider and settings:

```sh
pnpm hixai configure --section storage
```

Supported providers:

- `local_disk` (default; local single-user installs)
- `s3` (S3-compatible object storage)
