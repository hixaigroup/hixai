import { describe, expect, it } from "vitest";
import {
  computeBudgetUtilizationPercent,
  shouldAutoPauseAgent,
} from "../services/costs.js";

describe("shouldAutoPauseAgent", () => {
  it("pauses an active agent when spend reaches budget", () => {
    expect(
      shouldAutoPauseAgent({
        budgetMonthlyCents: 10000,
        spentMonthlyCents: 10000,
        status: "active",
      }),
    ).toBe(true);
  });

  it("pauses when spend exceeds budget", () => {
    expect(
      shouldAutoPauseAgent({
        budgetMonthlyCents: 10000,
        spentMonthlyCents: 10001,
        status: "active",
      }),
    ).toBe(true);
  });

  it("does not pause an already-paused agent", () => {
    expect(
      shouldAutoPauseAgent({
        budgetMonthlyCents: 10000,
        spentMonthlyCents: 10000,
        status: "paused",
      }),
    ).toBe(false);
  });

  it("does not pause a terminated agent", () => {
    expect(
      shouldAutoPauseAgent({
        budgetMonthlyCents: 10000,
        spentMonthlyCents: 10000,
        status: "terminated",
      }),
    ).toBe(false);
  });

  it("does not pause when spend is below budget", () => {
    expect(
      shouldAutoPauseAgent({
        budgetMonthlyCents: 10000,
        spentMonthlyCents: 9999,
        status: "active",
      }),
    ).toBe(false);
  });

  it("does not pause when budget is zero (unlimited)", () => {
    expect(
      shouldAutoPauseAgent({
        budgetMonthlyCents: 0,
        spentMonthlyCents: 99999,
        status: "active",
      }),
    ).toBe(false);
  });
});

describe("computeBudgetUtilizationPercent", () => {
  it("returns 0 for zero budget (unlimited)", () => {
    expect(computeBudgetUtilizationPercent(5000, 0)).toBe(0);
  });

  it("returns 80 at 80% spend", () => {
    expect(computeBudgetUtilizationPercent(8000, 10000)).toBe(80);
  });

  it("returns 100 at full spend", () => {
    expect(computeBudgetUtilizationPercent(10000, 10000)).toBe(100);
  });

  it("returns values over 100 when spend exceeds budget", () => {
    expect(computeBudgetUtilizationPercent(11000, 10000)).toBe(110);
  });

  it("rounds to 2 decimal places", () => {
    expect(computeBudgetUtilizationPercent(1, 3)).toBe(33.33);
  });
});
