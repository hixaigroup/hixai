import fs from "node:fs";
import { hixaiConfigSchema, type HixAIConfig } from "@hixai/shared";
import { resolveHixAIConfigPath } from "./paths.js";

export function readConfigFile(): HixAIConfig | null {
  const configPath = resolveHixAIConfigPath();

  if (!fs.existsSync(configPath)) return null;

  try {
    const raw = JSON.parse(fs.readFileSync(configPath, "utf-8"));
    return hixaiConfigSchema.parse(raw);
  } catch {
    return null;
  }
}
