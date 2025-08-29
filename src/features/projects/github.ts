import "server-only";
import {
  GITHUB_TOKEN,
  GITHUB_USERNAME,
  REVALIDATE_SECONDS,
} from "@/lib/constants";
import {
  PROJECTS_REPO_ALLOWLIST,
  PROJECTS_TOPIC_ALLOWLIST,
  PROJECT_IMAGE_MAP,
} from "./config";

type Repo = {
  name: string;
  description: string | null;
  homepage: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
  pushed_at: string;
  private?: boolean;
};

export type Project = {
  name: string;
  description: string | null;
  demoUrl: string | null;
  codeUrl: string;
  stars: number;
  language: string | null;
  topics: string[];
  updatedAt: string;
  image?: string | null;
};

type GraphQLPinnedTopicNode = { topic: { name: string } };
type GraphQLPinnedRepository = {
  name: string;
  description?: string | null;
  homepageUrl?: string | null;
  url: string;
  stargazerCount?: number;
  primaryLanguage?: { name: string } | null;
  topics?: { nodes: GraphQLPinnedTopicNode[] };
  updatedAt: string;
  isPrivate?: boolean;
};
type GraphQLPinnedResponse = {
  data?: {
    user?: {
      pinnedItems?: { nodes?: GraphQLPinnedRepository[] };
    };
  };
};

async function fetchPinnedViaGraphQL(): Promise<Project[]> {
  if (!GITHUB_TOKEN) {
    // GraphQL requires auth. If missing, return empty.
    return [];
  }
  if (!GITHUB_USERNAME) return [];

  const query = `
    query($login: String!) {
      user(login: $login) {
        pinnedItems(first: 6, types: REPOSITORY) {
          nodes {
            ... on Repository {
              name
              description
              homepageUrl
              url
              stargazerCount
              primaryLanguage { name }
              topics: repositoryTopics(first: 10) { nodes { topic { name } } }
              updatedAt
              isPrivate
            }
          }
        }
      }
    }
  `;

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      "Content-Type": "application/json",
      Accept: "application/vnd.github+json",
    },
    body: JSON.stringify({ query, variables: { login: GITHUB_USERNAME } }),
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!res.ok) {
    // Optional: log status for debugging
    console.error("GitHub GraphQL error:", res.status, await res.text());
    return [];
  }

  const json: GraphQLPinnedResponse = await res.json();
  const nodes = json.data?.user?.pinnedItems?.nodes ?? [];

  const projects: Project[] = nodes
    .filter((n) => !n.isPrivate)
    .map((n) => ({
      name: n.name,
      description: n.description ?? null,
      demoUrl: n.homepageUrl || null,
      codeUrl: n.url,
      stars: n.stargazerCount ?? 0,
      language: n.primaryLanguage?.name ?? null,
      topics: n.topics?.nodes?.map((x) => x.topic.name).filter(Boolean) ?? [],
      updatedAt: n.updatedAt,
      image: PROJECT_IMAGE_MAP[n.name] || null,
    }));

  return projects;
}

async function fetchPublicRepos(): Promise<Project[]> {
  if (!GITHUB_USERNAME) return [];

  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
  };
  if (GITHUB_TOKEN) headers.Authorization = `Bearer ${GITHUB_TOKEN}`;

  const res = await fetch(
    `https://api.github.com/users/${encodeURIComponent(
      GITHUB_USERNAME
    )}/repos?per_page=100&sort=pushed&type=public`,
    { headers, next: { revalidate: REVALIDATE_SECONDS } }
  );

  if (!res.ok) {
    console.error("GitHub REST error:", res.status, await res.text());
    return [];
  }

  const data: Repo[] = await res.json();

  let repos = data
    .filter((r) => !r.name.startsWith("."))
    .filter((r) => !r.private)
    .sort(
      (a, b) =>
        new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()
    );

  if (PROJECTS_REPO_ALLOWLIST.length > 0) {
    repos = repos.filter((r) => PROJECTS_REPO_ALLOWLIST.includes(r.name));
  }
  if (PROJECTS_TOPIC_ALLOWLIST.length > 0) {
    repos = repos.filter((r) =>
      r.topics?.some((t) => PROJECTS_TOPIC_ALLOWLIST.includes(t))
    );
  }

  return repos.map((r) => ({
    name: r.name,
    description: r.description,
    demoUrl: r.homepage || null,
    codeUrl: r.html_url,
    stars: r.stargazers_count,
    language: r.language,
    topics: r.topics || [],
    updatedAt: r.updated_at,
    image: PROJECT_IMAGE_MAP[r.name] || null,
  }));
}

/** mode:
 *  - "pinned": only pinned (needs GITHUB_TOKEN)
 *  - "public": only public repos (REST)
 *  - "auto": try pinned then fall back to public
 */
export async function fetchProjects(
  mode: "auto" | "pinned" | "public" = "auto"
): Promise<Project[]> {
  if (mode === "pinned") return fetchPinnedViaGraphQL();
  if (mode === "public") return fetchPublicRepos();

  // auto
  const pinned = await fetchPinnedViaGraphQL();
  if (pinned.length > 0) return pinned;
  return fetchPublicRepos();
}
