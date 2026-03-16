---
title: Environment Variables
summary: Full environment variable reference
---

All environment variables that HIxAI uses for server configuration.

## Server Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3100` | Server port |
| `HOST` | `127.0.0.1` | Server host binding |
| `DATABASE_URL` | (embedded) | PostgreSQL connection string |
| `HIXAI_HOME` | `~/.hixai` | Base directory for all HIxAI data |
| `HIXAI_INSTANCE_ID` | `default` | Instance identifier (for multiple local instances) |
| `HIXAI_DEPLOYMENT_MODE` | `local_trusted` | Runtime mode override |

## Secrets

| Variable | Default | Description |
|----------|---------|-------------|
| `HIXAI_SECRETS_MASTER_KEY` | (from file) | 32-byte encryption key (base64/hex/raw) |
| `HIXAI_SECRETS_MASTER_KEY_FILE` | `~/.hixai/.../secrets/master.key` | Path to key file |
| `HIXAI_SECRETS_STRICT_MODE` | `false` | Require secret refs for sensitive env vars |

## Agent Runtime (Injected into agent processes)

These are set automatically by the server when invoking agents:

| Variable | Description |
|----------|-------------|
| `HIXAI_AGENT_ID` | Agent's unique ID |
| `HIXAI_COMPANY_ID` | Company ID |
| `HIXAI_API_URL` | HIxAI API base URL |
| `HIXAI_API_KEY` | Short-lived JWT for API auth |
| `HIXAI_RUN_ID` | Current heartbeat run ID |
| `HIXAI_TASK_ID` | Issue that triggered this wake |
| `HIXAI_WAKE_REASON` | Wake trigger reason |
| `HIXAI_WAKE_COMMENT_ID` | Comment that triggered this wake |
| `HIXAI_APPROVAL_ID` | Resolved approval ID |
| `HIXAI_APPROVAL_STATUS` | Approval decision |
| `HIXAI_LINKED_ISSUE_IDS` | Comma-separated linked issue IDs |

## LLM Provider Keys (for adapters)

| Variable | Description |
|----------|-------------|
| `ANTHROPIC_API_KEY` | Anthropic API key (for Claude Local adapter) |
| `OPENAI_API_KEY` | OpenAI API key (for Codex Local adapter) |
