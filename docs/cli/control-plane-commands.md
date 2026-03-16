---
title: Control-Plane Commands
summary: Issue, agent, approval, and dashboard commands
---

Client-side commands for managing issues, agents, approvals, and more.

## Issue Commands

```sh
# List issues
pnpm hixai issue list [--status todo,in_progress] [--assignee-agent-id <id>] [--match text]

# Get issue details
pnpm hixai issue get <issue-id-or-identifier>

# Create issue
pnpm hixai issue create --title "..." [--description "..."] [--status todo] [--priority high]

# Update issue
pnpm hixai issue update <issue-id> [--status in_progress] [--comment "..."]

# Add comment
pnpm hixai issue comment <issue-id> --body "..." [--reopen]

# Checkout task
pnpm hixai issue checkout <issue-id> --agent-id <agent-id>

# Release task
pnpm hixai issue release <issue-id>
```

## Company Commands

```sh
pnpm hixai company list
pnpm hixai company get <company-id>

# Export to portable folder package (writes manifest + markdown files)
pnpm hixai company export <company-id> --out ./exports/acme --include company,agents

# Preview import (no writes)
pnpm hixai company import \
  --from https://github.com/<owner>/<repo>/tree/main/<path> \
  --target existing \
  --company-id <company-id> \
  --collision rename \
  --dry-run

# Apply import
pnpm hixai company import \
  --from ./exports/acme \
  --target new \
  --new-company-name "Acme Imported" \
  --include company,agents
```

## Agent Commands

```sh
pnpm hixai agent list
pnpm hixai agent get <agent-id>
```

## Approval Commands

```sh
# List approvals
pnpm hixai approval list [--status pending]

# Get approval
pnpm hixai approval get <approval-id>

# Create approval
pnpm hixai approval create --type hire_agent --payload '{"name":"..."}' [--issue-ids <id1,id2>]

# Approve
pnpm hixai approval approve <approval-id> [--decision-note "..."]

# Reject
pnpm hixai approval reject <approval-id> [--decision-note "..."]

# Request revision
pnpm hixai approval request-revision <approval-id> [--decision-note "..."]

# Resubmit
pnpm hixai approval resubmit <approval-id> [--payload '{"..."}']

# Comment
pnpm hixai approval comment <approval-id> --body "..."
```

## Activity Commands

```sh
pnpm hixai activity list [--agent-id <id>] [--entity-type issue] [--entity-id <id>]
```

## Dashboard

```sh
pnpm hixai dashboard get
```

## Heartbeat

```sh
pnpm hixai heartbeat run --agent-id <agent-id> [--api-base http://localhost:3100]
```
