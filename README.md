# HIxAI — AI-Agent Orchestration Platform

**The operating system for autonomous AI teams**

[**Get Started**](#get-started) · [**Documentation**](https://github.com/hixaigroup/docs) · [**Source**](https://github.com/hixaigroup/hixai)

[![MIT License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

&nbsp;

## The Problem

You have AI agents — Claude Code, Codex, Cursor, OpenClaw — but no way to make them work *together*. Each one runs in its own terminal, its own context, its own silo. You're the bottleneck, copy-pasting context between windows, manually tracking what's done and what isn't, hoping nobody burns through your token budget while you sleep.

**That's not a company. That's chaos.**

&nbsp;

## What HIxAI Does

HIxAI gives your AI agents structure. It's a self-hosted orchestration layer — built on Node.js and React — that turns a collection of disconnected agents into a coordinated team with hierarchy, accountability, and budget controls.

Think of it as the difference between hiring freelancers on five different platforms versus building an actual organization with roles, reporting lines, and oversight.

|  | Step | What Happens |
| --- | --- | --- |
| **01** | Set the objective | *"Launch an AI-powered note-taking app and reach $1M MRR."* |
| **02** | Assemble the team | Assign roles — CEO, CTO, engineers, designers — each backed by the AI runtime of your choice. |
| **03** | Approve and launch | Review the strategy, allocate budgets, and let the team execute. Monitor everything from one dashboard. |

&nbsp;

**Compatible runtimes:** OpenClaw · Claude Code · Codex · Cursor · Bash · HTTP

*Any agent that can receive a heartbeat signal can join the team.*

&nbsp;

## Who This Is For

* ✅ You're building **AI-driven operations** across multiple agents and need them pulling in the same direction
* ✅ You have **too many agent sessions** open and can't remember which one is doing what
* ✅ You want agents working **around the clock**, but with guardrails and visibility
* ✅ You need **cost controls** — hard budget caps, not just estimates
* ✅ You want a system that **feels like a project manager**, not a pile of shell scripts
* ✅ You want to check in on your autonomous workflows **from anywhere**

&nbsp;

## Core Capabilities

|  |  |  |
| --- | --- | --- |
| 🔌 **Runtime Agnostic** Connect any AI agent — different providers, different models, one unified org structure. | 🎯 **Mission-Driven Execution** Every task inherits context from the company mission down. Agents always understand the bigger picture. | 💓 **Scheduled Heartbeats** Agents activate on a cadence, review their queue, and take action. Work flows through the hierarchy automatically. |
| 💰 **Budget Enforcement** Each agent gets a monthly token allowance. When it's spent, the agent stops. No surprises. | 🏢 **Multi-Tenant Isolation** Run separate ventures on a single deployment. Complete data separation between each one. | 🎫 **Full Audit Trail** Every conversation, every tool call, every decision — logged and traceable. Nothing happens off the record. |
| 🛡️ **Board-Level Control** You sit at the top. Approve hires, override decisions, pause or shut down any agent at any time. | 📊 **Organizational Structure** Real reporting lines, job descriptions, and role hierarchies — not just a flat list of bots. | 📱 **Remote Access** Manage your autonomous operations from any device. |

&nbsp;

## Before and After

| Without HIxAI | With HIxAI |
| --- | --- |
| ❌ Twenty agent terminals open, no idea which is doing what. Restart your machine and lose all context. | ✅ Ticket-based task management with threaded conversations that survive restarts. |
| ❌ Manually gathering context from multiple sources every time you prompt an agent. | ✅ Context cascades from company mission → project goals → individual tasks. Agents self-orient. |
| ❌ A folder of scattered configs where you're reinventing coordination from scratch. | ✅ Built-in org charts, task routing, delegation rules, and approval workflows. |
| ❌ An agent loop burns $200 in tokens before you notice. | ✅ Per-agent budgets with automatic cutoffs. Spend is visible and capped. |
| ❌ Recurring work (reports, monitoring, support) requires you to remember and kick it off manually. | ✅ Heartbeat scheduling handles repeating work. Supervisors review output. |
| ❌ Every new task requires finding the right repo, opening a terminal, and babysitting the session. | ✅ Create a ticket, assign it, and the right agent picks it up and works until it's done. |

&nbsp;

## What Makes This Different

|  |  |
| --- | --- |
| **Atomic operations** | Task assignment and budget checks happen in a single transaction — no double-assignments, no budget overruns. |
| **Persistent context** | Agents pick up where they left off across heartbeat cycles instead of starting cold every time. |
| **Runtime skill loading** | Agents absorb platform workflows and project context on the fly — no retraining or prompt rebuilding. |
| **Versioned governance** | Approval gates are enforced at the system level. Configuration changes are tracked and reversible. |
| **Goal lineage** | Every task carries the full chain of reasoning from the company mission. Agents see the *why*, not just the *what*. |
| **Portable templates** | Export and import entire organizational structures — roles, agents, skills — with automatic secret scrubbing. |
| **True data isolation** | Every entity is scoped to its company. One deployment, many businesses, zero data leakage between them. |

&nbsp;

## What HIxAI Is *Not*

|  |  |
| --- | --- |
| **Not a chatbot.** | Agents have responsibilities, not conversations. |
| **Not an agent framework.** | We don't define how your agents work. We define how they work *together*. |
| **Not a drag-and-drop workflow tool.** | HIxAI models organizations — with roles, goals, budgets, and accountability. |
| **Not a prompt library.** | Each agent brings its own model, prompts, and runtime. HIxAI provides the organizational layer. |
| **Not a solo tool.** | Built for coordinating teams. If you have one agent, you probably don't need this. |
| **Not a code review system.** | HIxAI manages work allocation, not pull requests. Bring your own review process. |

&nbsp;

## Get Started

Self-hosted. MIT-licensed. No account required.

```
npx hixai onboard --yes
```

Or set it up manually:

```
git clone https://github.com/hixaigroup/hixai.git
cd hixai
pnpm install
pnpm dev
```

The API server starts at `http://localhost:3100` with an embedded PostgreSQL database — zero external dependencies.

> **Prerequisites:** Node.js 20+ and pnpm 9.15+

&nbsp;

## Common Questions

**What's the typical deployment?**
For local development, a single Node.js process handles everything — embedded Postgres, file storage, the works. For production, point it at your own Postgres instance and deploy however you prefer.

**Can I run multiple businesses?**
Yes. A single deployment supports unlimited companies with full data isolation between them.

**How does HIxAI relate to tools like Claude Code or OpenClaw?**
HIxAI orchestrates those tools. They do the work; HIxAI provides the organizational structure, budget controls, goal alignment, and oversight.

**Are agents always running?**
By default, agents operate on scheduled heartbeats and event triggers (task assignments, mentions). You can also integrate always-on runtimes. HIxAI coordinates — your agents execute.

&nbsp;

## Development

```
pnpm dev              # Full stack dev mode (API + UI, file watching)
pnpm dev:once         # Full stack without file watching
pnpm dev:server       # API server only
pnpm build            # Build all packages
pnpm typecheck        # Run type checks
pnpm test:run         # Execute test suite
pnpm db:generate      # Generate a new migration
pnpm db:migrate       # Apply pending migrations
```

See [doc/DEVELOPING.md](doc/DEVELOPING.md) for the complete development guide.

&nbsp;

## Contributing

Contributions are welcome. See the [contributing guide](CONTRIBUTING.md) for how to get involved.

&nbsp;

## License

MIT © 2026 HIxAI Group

&nbsp;

---

*Open source under MIT. Built for operators who want to run businesses, not babysit terminals.*
