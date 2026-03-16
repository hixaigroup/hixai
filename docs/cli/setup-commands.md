---
title: Setup Commands
summary: Onboard, run, doctor, and configure
---

Instance setup and diagnostics commands.

## `hixai run`

One-command bootstrap and start:

```sh
pnpm hixai run
```

Does:

1. Auto-onboards if config is missing
2. Runs `hixai doctor` with repair enabled
3. Starts the server when checks pass

Choose a specific instance:

```sh
pnpm hixai run --instance dev
```

## `hixai onboard`

Interactive first-time setup:

```sh
pnpm hixai onboard
```

First prompt:

1. `Quickstart` (recommended): local defaults (embedded database, no LLM provider, local disk storage, default secrets)
2. `Advanced setup`: full interactive configuration

Start immediately after onboarding:

```sh
pnpm hixai onboard --run
```

Non-interactive defaults + immediate start (opens browser on server listen):

```sh
pnpm hixai onboard --yes
```

## `hixai doctor`

Health checks with optional auto-repair:

```sh
pnpm hixai doctor
pnpm hixai doctor --repair
```

Validates:

- Server configuration
- Database connectivity
- Secrets adapter configuration
- Storage configuration
- Missing key files

## `hixai configure`

Update configuration sections:

```sh
pnpm hixai configure --section server
pnpm hixai configure --section secrets
pnpm hixai configure --section storage
```

## `hixai env`

Show resolved environment configuration:

```sh
pnpm hixai env
```

## `hixai allowed-hostname`

Allow a private hostname for authenticated/private mode:

```sh
pnpm hixai allowed-hostname my-tailscale-host
```

## Local Storage Paths

| Data | Default Path |
|------|-------------|
| Config | `~/.hixai/instances/default/config.json` |
| Database | `~/.hixai/instances/default/db` |
| Logs | `~/.hixai/instances/default/logs` |
| Storage | `~/.hixai/instances/default/data/storage` |
| Secrets key | `~/.hixai/instances/default/secrets/master.key` |

Override with:

```sh
HIXAI_HOME=/custom/home HIXAI_INSTANCE_ID=dev pnpm hixai run
```

Or pass `--data-dir` directly on any command:

```sh
pnpm hixai run --data-dir ./tmp/hixai-dev
pnpm hixai doctor --data-dir ./tmp/hixai-dev
```
