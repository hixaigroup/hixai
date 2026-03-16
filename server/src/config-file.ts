import fs from "node:fs";
import { hixaiConfigSchema, type HIxAIConfig } from "@hixai/shared";
import { resolveHIxAIConfigPath } from "./paths.js";

export function readConfigFile(): HIxAIConfig | null {
  const configPath = resolveHIxAIConfigPath();

  if (!fs.existsSync(configPath)) return null;

  try {
    const raw = JSON.parse(fs.readFileSync(configPath, "utf-8"));
    return hixaiConfigSchema.parse(raw);
  } catch {
    return null;
  }
}
