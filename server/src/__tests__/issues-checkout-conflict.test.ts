import { describe, expect, it } from "vitest";
import { sameRunLock } from "../services/issues.js";

describe("sameRunLock (checkout conflict detection)", () => {
  it("same run owns the lock when run IDs match", () => {
    expect(sameRunLock("run-1", "run-1")).toBe(true);
  });

  it("different run IDs means the lock is held by another run", () => {
    expect(sameRunLock("run-1", "run-2")).toBe(false);
  });

  it("a board actor (no run) owns a null checkout lock", () => {
    expect(sameRunLock(null, null)).toBe(true);
  });

  it("a board actor does not own a lock held by a run", () => {
    expect(sameRunLock("run-1", null)).toBe(false);
  });

  it("a run actor does not own a null lock", () => {
    expect(sameRunLock(null, "run-1")).toBe(false);
  });
});
