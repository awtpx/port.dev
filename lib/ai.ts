import { GitHubProfile, RankedProject } from "@/types";
import Groq from "groq-sdk";

function getGroqClient() {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey || apiKey.trim() === "") {
    return null;
  }
  return new Groq({ apiKey });
}

/**
 * 1. generateAIBio: Produces concise, 100% grounded developer bio using scraped GitHub repos, projects, and READMEs
 */
export async function generateAIBio(
  profile: GitHubProfile,
  topRepos: RankedProject[]
): Promise<string> {
  const groq = getGroqClient();

  // If no Groq API key is configured, synthesize directly from real scraped data
  if (!groq) {
    return synthesizeRealBio(profile, topRepos);
  }

  try {
    const standoutProjectsSummary = topRepos
      .slice(0, 4)
      .map((r) => {
        const details = [
          `Project: ${r.name}`,
          r.language ? `Language: ${r.language}` : "",
          r.stargazers_count > 0 ? `Stars: ${r.stargazers_count}` : "",
          r.description ? `Description: "${r.description}"` : "",
          r.readme_snippet ? `README Excerpt: "${r.readme_snippet.substring(0, 180)}"` : "",
        ]
          .filter(Boolean)
          .join(" | ");
        return `- ${details}`;
      })
      .join("\n");

    const languages = Array.from(
      new Set(topRepos.map((r) => r.language).filter((l) => l && l !== "Code"))
    ).slice(0, 4);

    const prompt = `You are an expert technical biographer. Write a professional, accurate, and engaging 2 to 3 sentence executive summary for developer ${profile.name || profile.username}.

VERIFIED SCRAPED GITHUB FACTS (DO NOT INVENT ANYTHING OUTSIDE THIS CONTEXT):
- Name: ${profile.name || profile.username} (@${profile.username})
- GitHub Bio: ${profile.bio || "None provided"}
- Company / Org: ${profile.company || "Independent"}
- Location: ${profile.location || "Not specified"}
- Member Since: ${profile.created_at ? new Date(profile.created_at).getFullYear() : "N/A"}
- Public Repositories: ${profile.public_repos}
- Primary Languages: ${languages.join(", ") || "General Software Engineering"}
- Verified Pull Requests Merged: ${profile.pull_requests_merged}
- Verified Closed Issues: ${profile.issues_closed}
- Annual Contributions: ${profile.annual_contributions}
- Profile README Excerpt: ${profile.profile_readme || "None"}
- Standout Repositories & Real README Data:
${standoutProjectsSummary || "No public repositories found."}

STRICT INSTRUCTIONS:
1. Every claim must be grounded in the verified scraped facts above.
2. Specifically mention their standout projects by name and describe what they actually do based on their real description/README excerpt.
3. Mention their actual primary programming languages and company/location if available.
4. DO NOT invent false skills, unmentioned frameworks, or use generic filler buzzwords.
5. Return exactly 2 to 3 concise, impactful sentences as plain text without quotes or markdown formatting.`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.5,
      max_tokens: 220,
    });

    const aiBio = completion.choices[0]?.message?.content?.trim();
    if (aiBio && aiBio.length > 30) {
      return aiBio.replace(/^["']|["']$/g, "").trim();
    }

    return synthesizeRealBio(profile, topRepos);
  } catch (err) {
    console.warn("Groq AI Bio generation failed, using factual synthesizer:", err);
    return synthesizeRealBio(profile, topRepos);
  }
}

/**
 * 2. generateSEO: Returns structured JSON { title, description, keywords }
 */
export async function generateSEO(
  profile: GitHubProfile
): Promise<{ title: string; description: string; keywords: string }> {
  const groq = getGroqClient();

  const fallbackSEO = {
    title: `${profile.name || profile.username} - Developer Portfolio & Resume | port`,
    description: `Explore ${profile.name || profile.username}'s developer portfolio, GitHub repositories, contributions, and verified metrics on port.`,
    keywords: `${profile.username}, developer portfolio, open source, port, github resume, ${profile.location || "software engineer"}`,
  };

  if (!groq) {
    return fallbackSEO;
  }

  try {
    const prompt = `Generate SEO meta tags for a developer portfolio page.
Developer: ${profile.name || profile.username} (@${profile.username})
Bio: ${profile.bio || "Software Engineer"}
Location: ${profile.location || "Remote"}

Return ONLY a valid JSON object matching this schema:
{
  "title": "A punchy title under 60 chars",
  "description": "Engaging description under 155 chars",
  "keywords": "comma, separated, high, value, keywords"
}`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
      response_format: { type: "json_object" },
      max_tokens: 150,
    });

    const content = completion.choices[0]?.message?.content;
    if (content) {
      const parsed = JSON.parse(content);
      return {
        title: parsed.title || fallbackSEO.title,
        description: parsed.description || fallbackSEO.description,
        keywords: parsed.keywords || fallbackSEO.keywords,
      };
    }

    return fallbackSEO;
  } catch (err) {
    console.warn("Groq SEO generation failed, falling back:", err);
    return fallbackSEO;
  }
}

/**
 * 100% Authentic, Deterministic Bio Synthesizer:
 * Constructs a real, factual overview directly from the scraped profile, repos, and READMEs with ZERO fake placeholders.
 */
function synthesizeRealBio(profile: GitHubProfile, topRepos: RankedProject[]): string {
  const name = profile.name || profile.username;
  const yearJoined = profile.created_at ? new Date(profile.created_at).getFullYear() : null;

  // Real languages sorted by frequency
  const languages = Array.from(
    new Set(topRepos.map((r) => r.language).filter((l) => l && l !== "Code"))
  ).slice(0, 3);
  const langPhrase =
    languages.length > 1
      ? `${languages.slice(0, -1).join(", ")} and ${languages[languages.length - 1]}`
      : languages[0] || "modern software engineering";

  // Sentence 1: Identity, location, company, and timeline
  const locationPhrase = profile.location ? ` based in ${profile.location}` : "";
  const companyPhrase = profile.company ? ` at ${profile.company}` : "";
  const joinedPhrase = yearJoined ? ` An active GitHub builder since ${yearJoined},` : "";

  const s1 = `${name} is an open-source developer${locationPhrase}${companyPhrase}.${joinedPhrase} they build projects primarily utilizing ${langPhrase}.`;

  // Sentence 2: Standout projects and real README / description details
  let s2 = "";
  const top1 = topRepos[0];
  const top2 = topRepos[1];

  if (top1) {
    let top1Desc = "";
    if (top1.description && top1.description.trim() !== "") {
      top1Desc = ` (${top1.description.toLowerCase().replace(/\.$/, "")})`;
    } else if (top1.readme_snippet) {
      const cleanSnippet = top1.readme_snippet.slice(0, 90).replace(/\.$/, "");
      top1Desc = ` (${cleanSnippet})`;
    }

    if (top2 && top2.name) {
      s2 = `Notable repositories include ${top1.name}${top1Desc} and ${top2.name}${
        top2.description ? ` (${top2.description.toLowerCase().replace(/\.$/, "")})` : ""
      }.`;
    } else {
      s2 = `Their flagship open-source project is ${top1.name}${top1Desc}.`;
    }
  }

  // Sentence 3: Verified contribution activity
  let s3 = "";
  const statsParts: string[] = [];
  if (profile.pull_requests_merged > 0) {
    statsParts.push(`${profile.pull_requests_merged} merged pull requests`);
  }
  if (profile.issues_closed > 0) {
    statsParts.push(`${profile.issues_closed} resolved issues`);
  }
  if (profile.annual_contributions > 0) {
    statsParts.push(`${profile.annual_contributions} contributions in the past year`);
  }

  if (statsParts.length > 0) {
    s3 = `With ${profile.public_repos} public repositories and ${statsParts.join(
      ", "
    )}, their work reflects consistent, verified technical impact.`;
  } else {
    s3 = `Across ${profile.public_repos} public repositories, their work focuses on practical utilities and developer tooling.`;
  }

  return `${s1} ${s2} ${s3}`.trim();
}
