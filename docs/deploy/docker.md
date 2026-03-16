---
title: Docker
summary: Docker Compose quickstart
---

Run HixAI in Docker without installing Node or pnpm locally.

## Compose Quickstart (Recommended)

```sh
docker compose -f docker-compose.quickstart.yml up --build
```

Open [http://localhost:3100](http://localhost:3100).

Defaults:

- Host port: `3100`
- Data directory: `./data/docker-hixai`

Override with environment variables:

```sh
HIXAI_PORT=3200 HIXAI_DATA_DIR=./data/pc \
  docker compose -f docker-compose.quickstart.yml up --build
```

## Manual Docker Build

```sh
docker build -t hixai-local .
docker run --name hixai \
  -p 3100:3100 \
  -e HOST=0.0.0.0 \
  -e HIXAI_HOME=/hixai \
  -v "$(pwd)/data/docker-hixai:/hixai" \
  hixai-local
```

## Data Persistence

All data is persisted under the bind mount (`./data/docker-hixai`):

- Embedded PostgreSQL data
- Uploaded assets
- Local secrets key
- Agent workspace data

## Claude and Codex Adapters in Docker

The Docker image pre-installs:

- `claude` (Anthropic Claude Code CLI)
- `codex` (OpenAI Codex CLI)

Pass API keys to enable local adapter runs inside the container:

```sh
docker run --name hixai \
  -p 3100:3100 \
  -e HOST=0.0.0.0 \
  -e HIXAI_HOME=/hixai \
  -e OPENAI_API_KEY=sk-... \
  -e ANTHROPIC_API_KEY=sk-... \
  -v "$(pwd)/data/docker-hixai:/hixai" \
  hixai-local
```

Without API keys, the app runs normally — adapter environment checks will surface missing prerequisites.
