export interface GitHubProfile {
  username: string;
  name: string;
  avatar_url: string;
  bio: string | null;
  location: string;
  blog: string;
  company: string;
  twitter_username: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  social_accounts?: { provider: string; url: string }[];
  about?: string;
  seo?: { title: string; description: string; keywords: string };
  issues_closed: number;
  pull_requests_merged: number;
  annual_contributions: number;
  total_stars: number;
  total_forks: number;
  profile_readme?: string;
}

export interface RankedProject {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string;
  topics: string[];
  is_pinned: boolean;
  score: number;
  updated_at: string;
  readme_snippet?: string;
}

export interface MediumPost {
  title: string;
  link: string;
  pubDate: string;
  preview: string;
  thumbnail: string;
  categories: string[];
}

export interface Contributor {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
}

export interface PortfolioData {
  profile: GitHubProfile;
  projects: RankedProject[];
  topLanguages: { language: string; count: number; percentage: number }[];
}
