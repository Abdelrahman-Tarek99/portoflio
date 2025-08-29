export const ONE_HOUR_SECONDS = 60 * 60;

export const REVALIDATE_SECONDS = Number(
  process.env.NEXT_PUBLIC_REVALIDATE_SECONDS ?? ONE_HOUR_SECONDS
);

export const GITHUB_USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME ?? "";
// Secret – DO NOT prefix with NEXT_PUBLIC
export const GITHUB_TOKEN = process.env.GITHUB_TOKEN ?? "";

// Optional UI toggles
export const PREFER_PINNED =
  (process.env.NEXT_PUBLIC_PREFER_PINNED ?? "true") === "true";

export const WHATSAPP_PHONE = process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? "";

export const LANGUAGE_COLOR: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Python: "#3572A5",
  Go: "#00ADD8",
  Java: "#b07219",
  C: "#555555",
  "C++": "#f34b7d",
  Rust: "#dea584",
  reacthookform: "#EC5990",
  react: "#087EA4",
  Shell: "#89e051",
};
