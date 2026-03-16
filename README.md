# HIxAI — AI-Agent Orchestration Platform

**Open-source orchestration for AI-powered operations**

[**Quickstart**](#quickstart) · [**Docs**](https://github.com/hixaigroup/docs) · [**GitHub**](https://github.com/hixaigroup/hixai)

[![MIT License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

&nbsp;

## What is HIxAI?

# Open-source orchestration for AI-agent companies

**If OpenClaw is an *employee*, HIxAI is the *company***

HIxAI is a Node.js server and React UI that orchestrates a team of AI agents to run a business. Bring your own agents, assign goals, and track your agents' work and costs from one dashboard.

It looks like a task manager — but under the hood it has org charts, budgets, governance, goal alignment, and agent coordination.

**Manage business goals, not pull requests.**

|  | Step | Example |
| --- | --- | --- |
| **01** | Define the goal | *"Build the #1 AI note-taking app to $1M MRR."* |
| **02** | Hire the team | CEO, CTO, engineers, designers, marketers — any bot, any provider. |
| **03** | Approve and run | Review strategy. Set budgets. Hit go. Monitor from the dashboard. |

&nbsp;

|  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- |
| **Works with** | OpenClaw | Claude Code | Codex | Cursor | Bash | HTTP |

*If it can receive a heartbeat, it's hired.*

&nbsp;

## HIxAI is right for you if

* ✅ You want to build **autonomous AI companies**
* ✅ You **coordinate many different agents** (OpenClaw, Codex, Claude, Cursor) toward a common goal
* ✅ You have **20 simultaneous Claude Code terminals** open and lose track of what everyone is doing
* ✅ You want agents running **autonomously 24/7**, but still want to audit work and chime in when needed
* ✅ You want to **monitor costs** and enforce budgets
* ✅ You want a process for managing agents that **feels like using a task manager**
* ✅ You want to manage your autonomous businesses **from your phone**

&nbsp;

## Features

|  |  |  |
| --- | --- | --- |
| 🔌 **Bring Your Own Agent** Any agent, any runtime, one org chart. If it can receive a heartbeat, it's hired. | 🎯 **Goal Alignment** Every task traces back to the company mission. Agents know *what* to do and *why*. | 💓 **Heartbeats** Agents wake on a schedule, check work, and act. Delegation flows up and down the org chart. |
| 💰 **Cost Control** Monthly budgets per agent. When they hit the limit, they stop. No runaway costs. | 🏢 **Multi-Company** One deployment, many companies. Complete data isolation. One control plane for your portfolio. | 🎫 **Ticket System** Every conversation traced. Every decision explained. Full tool-call tracing and immutable audit log. |
| 🛡️ **Governance** You're the board. Approve hires, override strategy, pause or terminate any agent — at any time. | 📊 **Org Chart** Hierarchies, roles, reporting lines. Your agents have a boss, a title, and a job description. | 📱 **Mobile Ready** Monitor and manage your autonomous businesses from anywhere. |

&nbsp;

## Problems HIxAI solves

| Without HIxAI | With HIxAI |
| --- | --- |
| ❌ You have 20 Claude Code tabs open and can't track which one does what. On reboot you lose everything. | ✅ Tasks are ticket-based, conversations are threaded, sessions persist across reboots. |
| ❌ You manually gather context from several places to remind your bot what you're actually doing. | ✅ Context flows from the task up through the project and company goals — your agent always knows what to do and why. |
| ❌ Folders of agent configs are disorganized and you're re-inventing task management, communication, and coordination between agents. | ✅ HIxAI gives you org charts, ticketing, delegation, and governance out of the box — so you run a company, not a pile of scripts. |
| ❌ Runaway loops waste hundreds of dollars of tokens and max your quota before you even know what happened. | ✅ Cost tracking surfaces token budgets and throttles agents when they're out. Management prioritizes with budgets. |
| ❌ You have recurring jobs (customer support, social, reports) and have to remember to manually kick them off. | ✅ Heartbeats handle regular work on a schedule. Management supervises. |
| ❌ You have an idea, you have to find your repo, fire up Claude Code, keep a tab open, and babysit it. | ✅ Add a task in HIxAI. Your coding agent works on it until it's done. Management reviews their work. |

&nbsp;

## Why HIxAI is special

HIxAI handles the hard orchestration details correctly.

|  |  |
| --- | --- |
| **Atomic execution.** | Task checkout and budget enforcement are atomic, so no double-work and no runaway spend. |
| **Persistent agent state.** | Agents resume the same task context across heartbeats instead of restarting from scratch. |
| **Runtime skill injection.** | Agents can learn HIxAI workflows and project context at runtime, without retraining. |
| **Governance with rollback.** | Approval gates are enforced, config changes are revisioned, and bad changes can be rolled back safely. |
| **Goal-aware execution.** | Tasks carry full goal ancestry so agents consistently see the "why," not just a title. |
| **Portable company templates.** | Export/import orgs, agents, and skills with secret scrubbing and collision handling. |
| **True multi-company isolation.** | Every entity is company-scoped, so one deployment can run many companies with separate data and audit trails. |

&nbsp;

## What HIxAI is not

|  |  |
| --- | --- |
| **Not a chatbot.** | Agents have jobs, not chat windows. |
| **Not an agent framework.** | We don't tell you how to build agents. We tell you how to run a company made of them. |
| **Not a workflow builder.** | No drag-and-drop pipelines. HIxAI models companies — with org charts, goals, budgets, and governance. |
| **Not a prompt manager.** | Agents bring their own prompts, models, and runtimes. HIxAI manages the organization they work in. |
| **Not a single-agent tool.** | This is for teams. If you have one agent, you probably don't need HIxAI. If you have twenty — you definitely do. |
| **Not a code review tool.** | HIxAI orchestrates work, not pull requests. Bring your own review process. |

&nbsp;

## Quickstart

Open source. Self-hosted. No account required.

```
npx hixai onboard --yes
```

Or manually:

```
git clone https://github.com/hixaigroup/hixai.git
cd hixai
pnpm install
pnpm dev
```

This starts the API server at `http://localhost:3100`. An embedded PostgreSQL database is created automatically — no setup required.

> **Requirements:** Node.js 20+, pnpm 9.15+

&nbsp;

## FAQ

**What does a typical setup look like?**
Locally, a single Node.js process manages an embedded Postgres and local file storage. For production, point it at your own Postgres and deploy however you like. Configure projects, agents, and goals — the agents take care of the rest.

**Can I run multiple companies?**
Yes. A single deployment can run an unlimited number of companies with complete data isolation.

**How is HIxAI different from agents like OpenClaw or Claude Code?**
HIxAI *uses* those agents. It orchestrates them into a company — with org charts, budgets, goals, governance, and accountability.

**Do agents run continuously?**
By default, agents run on scheduled heartbeats and event-based triggers (task assignment, @-mentions). You can also hook in continuous agents like OpenClaw. You bring your agent and HIxAI coordinates.

&nbsp;

## Development

```
pnpm dev              # Full dev (API + UI, watch mode)
pnpm dev:once         # Full dev without file watching
pnpm dev:server       # Server only
pnpm build            # Build all
pnpm typecheck        # Type checking
pnpm test:run         # Run tests
pnpm db:generate      # Generate DB migration
pnpm db:migrate       # Apply migrations
```

See [doc/DEVELOPING.md](doc/DEVELOPING.md) for the full development guide.

&nbsp;

## Contributing

We welcome contributions. See the [contributing guide](CONTRIBUTING.md) for details.

&nbsp;

## License

MIT © 2026 HIxAI Group

&nbsp;

---

Open source under MIT. Built for people who want to run companies, not babysit agents.
