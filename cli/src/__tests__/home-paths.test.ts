import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import {
  describeLocalInstancePaths,
  expandHomePrefix,
  resolveHIxAIHomeDir,
  resolveHIxAIInstanceId,
} from "../config/home.js";

const ORIGINAL_ENV = { ...process.env };

describe("home path resolution", () => {
  afterEach(() => {
    process.env = { ...ORIGINAL_ENV };
  });

  it("defaults to ~/.hixai and default instance", () => {
    delete process.env.HIXAI_HOME;
    delete process.env.HIXAI_INSTANCE_ID;

    const paths = describeLocalInstancePaths();
    expect(paths.homeDir).toBe(path.resolve(os.homedir(), ".hixai"));
    expect(paths.instanceId).toBe("default");
    expect(paths.configPath).toBe(path.resolve(os.homedir(), ".hixai", "instances", "default", "config.json"));
  });

  it("supports HIXAI_HOME and explicit instance ids", () => {
    process.env.HIXAI_HOME = "~/hixai-home";

    const home = resolveHIxAIHomeDir();
    expect(home).toBe(path.resolve(os.homedir(), "hixai-home"));
    expect(resolveHIxAIInstanceId("dev_1")).toBe("dev_1");
  });

  it("rejects invalid instance ids", () => {
    expect(() => resolveHIxAIInstanceId("bad/id")).toThrow(/Invalid instance id/);
  });

  it("expands ~ prefixes", () => {
    expect(expandHomePrefix("~")).toBe(os.homedir());
    expect(expandHomePrefix("~/x/y")).toBe(path.resolve(os.homedir(), "x/y"));
  });
});
