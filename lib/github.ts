import { GitHubProfile, RankedProject } from "@/types";

function getHeaders() {
  const token = process.env.GITHUB_TOKEN;
  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "port-dev-portfolio",
  };
  if (token && token.trim() !== "") {
    headers.Authorization = `Bearer ${token.trim()}`;
  }
  return headers;
}

interface RawGitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics?: string[];
  fork: boolean;
  updated_at: string;
}

/**
 * 1. getGitHubUser: Fetch 100% authentic user details from GitHub REST API and scraped public stats
 */
export async function getGitHubUser(username: string): Promise<GitHubProfile | null> {
  const cleanUsername = username.trim().toLowerCase();
  try {
    const res = await fetch(`https://api.github.com/users/${cleanUsername}`, {
      headers: getHeaders(),
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      if (res.status === 404) return null;
      console.warn(`GitHub API returned status ${res.status} for user: ${cleanUsername}`);
      return null;
    }

    const data = await res.json();

    // Fetch real verified contribution counts and profile readme in parallel
    const [stats, profileReadme] = await Promise.all([
      getVerifiedStats(cleanUsername),
      getProfileReadme(cleanUsername),
    ]);

    const social_accounts: { provider: string; url: string }[] = [];
    if (data.twitter_username) {
      social_accounts.push({
        provider: "Twitter",
        url: `https://twitter.com/${data.twitter_username}`,
      });
    }
    if (data.blog) {
      const blogUrl = data.blog.startsWith("http") ? data.blog : `https://${data.blog}`;
      social_accounts.push({
        provider: "Website",
        url: blogUrl,
      });
    }
    social_accounts.push({
      provider: "GitHub",
      url: data.html_url || `https://github.com/${cleanUsername}`,
    });

    return {
      username: data.login || cleanUsername,
      name: data.name || data.login || cleanUsername,
      avatar_url: data.avatar_url || `https://github.com/${cleanUsername}.png`,
      bio: data.bio ? data.bio.trim() : null, // Genuine bio from GitHub or null
      location: data.location ? data.location.trim() : "",
      blog: data.blog ? data.blog.trim() : "",
      company: data.company ? data.company.trim() : "",
      twitter_username: data.twitter_username ? data.twitter_username.trim() : "",
      public_repos: data.public_repos ?? 0,
      followers: data.followers ?? 0,
      following: data.following ?? 0,
      created_at: data.created_at || new Date().toISOString(),
      social_accounts,
      issues_closed: stats.issues_closed,
      pull_requests_merged: stats.pull_requests_merged,
      annual_contributions: stats.annual_contributions,
      total_stars: 0,
      total_forks: 0,
      profile_readme: profileReadme,
    };
  } catch (error) {
    console.error("Error fetching GitHub user:", error);
    return null;
  }
}

/**
 * 2. getPinnedRepos: Calls GitHub GraphQL API to find pinned repository names
 */
export async function getPinnedRepos(username: string): Promise<string[]> {
  const token = process.env.GITHUB_TOKEN;
  if (!token || token.trim() === "") {
    return [];
  }

  const query = `
    query($username: String!) {
      user(login: $username) {
        pinnedItems(first: 6, types: REPOSITORY) {
          nodes {
            ... on Repository {
              name
            }
          }
        }
      }
    }
  `;

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        ...getHeaders(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables: { username } }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) return [];

    const json = await res.json();
    const nodes = json?.data?.user?.pinnedItems?.nodes || [];
    return nodes.map((node: { name: string }) => node.name);
  } catch (err) {
    console.error("Error fetching pinned repos:", err);
    return [];
  }
}

/**
 * 3. getRankedProjects: Ingests all available public repos, fetches top repo READMEs, and ranks them
 */
export async function getRankedProjects(username: string): Promise<RankedProject[]> {
  const cleanUsername = username.trim().toLowerCase();
  try {
    const pinnedRepoNames = await getPinnedRepos(cleanUsername);

    // Fetch all available public repositories
    const allRepos: RawGitHubRepo[] = [];
    let page = 1;
    let hasMore = true;

    while (hasMore && page <= 5) {
      const res = await fetch(
        `https://api.github.com/users/${cleanUsername}/repos?per_page=100&page=${page}&sort=updated`,
        {
          headers: getHeaders(),
          next: { revalidate: 3600 },
        }
      );

      if (!res.ok) {
        break;
      }

      const repos: RawGitHubRepo[] = await res.json();
      if (!Array.isArray(repos) || repos.length === 0) {
        hasMore = false;
        break;
      }

      allRepos.push(...repos);
      if (repos.length < 100) {
        hasMore = false;
      } else {
        page++;
      }
    }

    if (allRepos.length === 0) {
      return [];
    }

    const now = Date.now();
    const ninetyDaysAgo = now - 90 * 24 * 60 * 60 * 1000;

    const ranked: RankedProject[] = allRepos.map((repo: RawGitHubRepo) => {
      const isPinned = pinnedRepoNames.includes(repo.name);
      let score = (repo.stargazers_count || 0) * 3 + (repo.forks_count || 0) * 2;

      if (isPinned) score += 50;
      if (repo.description) score += 5;
      if (repo.homepage) score += 10;
      if (!repo.fork) score += 20;

      const updatedAtTime = new Date(repo.updated_at).getTime();
      if (updatedAtTime >= ninetyDaysAgo) {
        score += 15;
      }

      return {
        id: repo.id,
        name: repo.name,
        description: repo.description ? repo.description.trim() : "",
        html_url: repo.html_url,
        homepage: repo.homepage || null,
        stargazers_count: repo.stargazers_count || 0,
        forks_count: repo.forks_count || 0,
        language: repo.language || "Code",
        topics: Array.isArray(repo.topics) ? repo.topics : [],
        is_pinned: isPinned,
        score,
        updated_at: repo.updated_at || new Date().toISOString(),
      };
    });

    ranked.sort((a, b) => b.score - a.score);

    // Fetch real README snippets for the top 3 standout repositories to empower the AI summary
    const topReposToScrape = ranked.slice(0, 3);
    await Promise.all(
      topReposToScrape.map(async (repo) => {
        const snippet = await getRepoReadmeSnippet(cleanUsername, repo.name);
        if (snippet) {
          repo.readme_snippet = snippet;
        }
      })
    );

    return ranked;
  } catch (err) {
    console.error("Error ranking projects:", err);
    return [];
  }
}

/**
 * 4. getVerifiedStats: Scrapes authentic PR counts, closed issues, and real annual contribution counts
 */
export async function getVerifiedStats(
  username: string
): Promise<{ issues_closed: number; pull_requests_merged: number; annual_contributions: number }> {
  const cleanUsername = username.trim().toLowerCase();

  const [prCount, issueCount, contribCount] = await Promise.all([
    // Real merged PRs count from GitHub search API
    fetch(
      `https://api.github.com/search/issues?q=author:${cleanUsername}+type:pr+is:merged`,
      { headers: getHeaders(), next: { revalidate: 3600 } }
    )
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => (typeof d?.total_count === "number" ? d.total_count : 0))
      .catch(() => 0),

    // Real closed issues count from GitHub search API
    fetch(
      `https://api.github.com/search/issues?q=author:${cleanUsername}+type:issue+is:closed`,
      { headers: getHeaders(), next: { revalidate: 3600 } }
    )
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => (typeof d?.total_count === "number" ? d.total_count : 0))
      .catch(() => 0),

    // Real scraped annual contributions count from GitHub profile contributions HTML
    fetch(`https://github.com/users/${cleanUsername}/contributions`, {
      headers: { "User-Agent": "port-dev-portfolio" },
      next: { revalidate: 3600 },
    })
      .then((r) => (r.ok ? r.text() : ""))
      .then((html) => {
        const match = html.match(/<h2[^>]*>\s*([\d,]+)\s*contributions\s*in the last year/i);
        if (match && match[1]) {
          return parseInt(match[1].replace(/,/g, ""), 10) || 0;
        }
        return 0;
      })
      .catch(() => 0),
  ]);

  return {
    pull_requests_merged: prCount,
    issues_closed: issueCount,
    annual_contributions: contribCount,
  };
}

/**
 * 5. getProfileReadme: Scrapes the user's special profile README (${username}/${username}) if it exists
 */
export async function getProfileReadme(username: string): Promise<string> {
  const cleanUsername = username.trim().toLowerCase();
  try {
    const res = await fetch(
      `https://api.github.com/repos/${cleanUsername}/${cleanUsername}/readme`,
      { headers: getHeaders(), next: { revalidate: 3600 } }
    );
    if (!res.ok) return "";

    const data = await res.json();
    if (data.content && data.encoding === "base64") {
      const decoded = Buffer.from(data.content, "base64").toString("utf-8");
      return cleanMarkdown(decoded).substring(0, 1000);
    }
    return "";
  } catch {
    return "";
  }
}

/**
 * 6. getRepoReadmeSnippet: Scrapes a repository's README to extract its real purpose and description
 */
export async function getRepoReadmeSnippet(
  username: string,
  repoName: string
): Promise<string> {
  const cleanUsername = username.trim().toLowerCase();
  try {
    const res = await fetch(
      `https://api.github.com/repos/${cleanUsername}/${repoName}/readme`,
      { headers: getHeaders(), next: { revalidate: 3600 } }
    );
    if (!res.ok) return "";

    const data = await res.json();
    if (data.content && data.encoding === "base64") {
      const decoded = Buffer.from(data.content, "base64").toString("utf-8");
      return cleanMarkdown(decoded).substring(0, 450);
    }
    return "";
  } catch {
    return "";
  }
}

/**
 * Utility: Strips Markdown formatting, badges, and code blocks for clean text input
 */
function cleanMarkdown(md: string): string {
  return md
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[!\[.*?\]\(.*?\)\]\(.*?\)/g, " ")
    .replace(/!\[.*?\]\(.*?\)/g, " ")
    .replace(/\[(.*?)\]\(.*?\)/g, "$1")
    .replace(/^#+\s+/gm, "")
    .replace(/[*_~=]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * 7. Calculate real language breakdown from ranked projects
 */
export function getTopLanguages(projects: RankedProject[]) {
  const map: Record<string, number> = {};
  for (const p of projects) {
    if (p.language && p.language !== "Code") {
      map[p.language] = (map[p.language] || 0) + 1;
    }
  }

  const total = Object.values(map).reduce((a, b) => a + b, 0) || 1;
  return Object.entries(map)
    .map(([language, count]) => ({
      language,
      count,
      percentage: Math.round((count / total) * 100),
    }))
    .sort((a, b) => b.count - a.count);
}
