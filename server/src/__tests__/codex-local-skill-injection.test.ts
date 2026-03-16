import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { ensureCodexSkillsInjected } from "@hixai/adapter-codex-local/server";

async function makeTempDir(prefix: string): Promise<string> {
  return fs.mkdtemp(path.join(os.tmpdir(), prefix));
}

async function createHixAIRepoSkill(root: string, skillName: string) {
  await fs.mkdir(path.join(root, "server"), { recursive: true });
  await fs.mkdir(path.join(root, "packages", "adapter-utils"), { recursive: true });
  await fs.mkdir(path.join(root, "skills", skillName), { recursive: true });
  await fs.writeFile(path.join(root, "pnpm-workspace.yaml"), "packages:\n  - packages/*\n", "utf8");
  await fs.writeFile(path.join(root, "package.json"), '{"name":"hixai"}\n', "utf8");
  await fs.writeFile(
    path.join(root, "skills", skillName, "SKILL.md"),
    `---\nname: ${skillName}\n---\n`,
    "utf8",
  );
}

async function createCustomSkill(root: string, skillName: string) {
  await fs.mkdir(path.join(root, "custom", skillName), { recursive: true });
  await fs.writeFile(
    path.join(root, "custom", skillName, "SKILL.md"),
    `---\nname: ${skillName}\n---\n`,
    "utf8",
  );
}

describe("codex local adapter skill injection", () => {
  const cleanupDirs = new Set<string>();

  afterEach(async () => {
    await Promise.all(Array.from(cleanupDirs).map((dir) => fs.rm(dir, { recursive: true, force: true })));
    cleanupDirs.clear();
  });

  it("repairs a Codex HixAI skill symlink that still points at another live checkout", async () => {
    const currentRepo = await makeTempDir("hixai-codex-current-");
    const oldRepo = await makeTempDir("hixai-codex-old-");
    const skillsHome = await makeTempDir("hixai-codex-home-");
    cleanupDirs.add(currentRepo);
    cleanupDirs.add(oldRepo);
    cleanupDirs.add(skillsHome);

    await createHixAIRepoSkill(currentRepo, "hixai");
    await createHixAIRepoSkill(oldRepo, "hixai");
    await fs.symlink(path.join(oldRepo, "skills", "hixai"), path.join(skillsHome, "hixai"));

    const logs: string[] = [];
    await ensureCodexSkillsInjected(
      async (_stream, chunk) => {
        logs.push(chunk);
      },
      {
        skillsHome,
        skillsEntries: [{ name: "hixai", source: path.join(currentRepo, "skills", "hixai") }],
      },
    );

    expect(await fs.realpath(path.join(skillsHome, "hixai"))).toBe(
      await fs.realpath(path.join(currentRepo, "skills", "hixai")),
    );
    expect(logs.some((line) => line.includes('Repaired Codex skill "hixai"'))).toBe(true);
  });

  it("preserves a custom Codex skill symlink outside HixAI repo checkouts", async () => {
    const currentRepo = await makeTempDir("hixai-codex-current-");
    const customRoot = await makeTempDir("hixai-codex-custom-");
    const skillsHome = await makeTempDir("hixai-codex-home-");
    cleanupDirs.add(currentRepo);
    cleanupDirs.add(customRoot);
    cleanupDirs.add(skillsHome);

    await createHixAIRepoSkill(currentRepo, "hixai");
    await createCustomSkill(customRoot, "hixai");
    await fs.symlink(path.join(customRoot, "custom", "hixai"), path.join(skillsHome, "hixai"));

    await ensureCodexSkillsInjected(async () => {}, {
      skillsHome,
      skillsEntries: [{ name: "hixai", source: path.join(currentRepo, "skills", "hixai") }],
    });

    expect(await fs.realpath(path.join(skillsHome, "hixai"))).toBe(
      await fs.realpath(path.join(customRoot, "custom", "hixai")),
    );
  });
});
