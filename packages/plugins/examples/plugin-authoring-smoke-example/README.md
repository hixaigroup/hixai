# Plugin Authoring Smoke Example

A HixAI plugin

## Development

```bash
pnpm install
pnpm dev            # watch builds
pnpm dev:ui         # local dev server with hot-reload events
pnpm test
```

## Install Into HixAI

```bash
pnpm hixai plugin install ./
```

## Build Options

- `pnpm build` uses esbuild presets from `@hixai/plugin-sdk/bundlers`.
- `pnpm build:rollup` uses rollup presets from the same SDK.
