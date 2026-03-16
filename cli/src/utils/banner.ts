import pc from "picocolors";

const HIXAI_ART = [
  "██╗  ██╗██╗██╗  ██╗ █████╗ ██╗",
  "██║  ██║██║╚██╗██╔╝██╔══██╗██║",
  "███████║██║ ╚███╔╝ ███████║██║",
  "██╔══██║██║ ██╔██╗ ██╔══██║██║",
  "██║  ██║██║██╔╝ ██╗██║  ██║██║",
  "╚═╝  ╚═╝╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝",
] as const;

const TAGLINE = "AI-agent orchestration platform";

export function printHIxAICliBanner(): void {
  const lines = [
    "",
    ...HIXAI_ART.map((line) => pc.cyan(line)),
    pc.blue("  ───────────────────────────────────────────────────────"),
    pc.bold(pc.white(`  ${TAGLINE}`)),
    "",
  ];

  console.log(lines.join("\n"));
}
