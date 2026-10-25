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
 * 1. generateAIBio: Produces concise, engaging 2-3 sentence developer bio
 */
export async function generateAIBio(
  profile: GitHubProfile,
  topRepos: RankedProject[]
): Promise<string> {
  const groq = getGroqClient();

  // If no Groq API key is configured, generate a high-quality fallback bio
  if (!groq) {
    return generateFallbackBio(profile, topRepos);
  }

  try {
    const standoutProjects = topRepos
      .slice(0, 3)
      .map((r) => `${r.name} (${r.language || "code"}, ${r.stargazers_count} stars)`)
      .join(", ");

    const prompt = `You are a tech talent scout and portfolio copywriter. Write a compelling, punchy, and modern 2 to 3 sentence developer bio for a software engineer.
Developer Name: ${profile.name || profile.username}
GitHub Bio: ${profile.bio || "Software Engineer"}
Location: ${profile.location || "Global"}
Standout Repositories: ${standoutProjects || "Open source tools"}
Public Repos: ${profile.public_repos}
Followers: ${profile.followers}

Rules:
- Exactly 2 to 3 sentences.
- Third-person perspective (or first-person if natural, but third-person preferred).
- Emphasize engineering craftsmanship, impact, and key technologies.
- Do NOT use emojis, quotes, or markdown formatting. Return plain text only.`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 180,
    });

    const aiBio = completion.choices[0]?.message?.content?.trim();
    if (aiBio && aiBio.length > 20) {
      return aiBio;
    }

    return generateFallbackBio(profile, topRepos);
  } catch (err) {
    console.warn("Groq AI Bio generation failed, falling back:", err);
    return generateFallbackBio(profile, topRepos);
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
    keywords: `${profile.username}, developer portfolio, open source, port, github resume, software engineer, web developer`,
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
 * High-quality dynamic fallback bio generator
 */
function generateFallbackBio(profile: GitHubProfile, topRepos: RankedProject[]): string {
  const name = profile.name || profile.username;
  const langs = Array.from(new Set(topRepos.map((r) => r.language).filter(Boolean))).slice(0, 3);
  const langText = langs.length > 0 ? langs.join(" and ") : "modern web frameworks";

  const topProject = topRepos[0]?.name;
  const projectMention = topProject
    ? `, with standout open-source work on ${topProject}`
    : "";

  return `${name} is an impactful software engineer crafting high-performance systems and developer tooling with ${langText}${projectMention}. Known for rigorous code quality and open-source contributions, they actively bridge scalable backend architectures with responsive, modern user interfaces.`;
}
