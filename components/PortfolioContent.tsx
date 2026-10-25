"use client";

import React, { useState, useMemo } from "react";
import { RankedProject, GitHubProfile } from "@/types";
import {
  Hand,
  Code2,
  User,
  GitPullRequest,
  CheckCircle2,
  Star,
  GitFork,
  ExternalLink,
  Pin,
  Sparkles,
  Layers,
  ArrowUpRight,
  Activity,
  Search,
  Filter,
  Calendar,
} from "lucide-react";
import { GithubIcon as Github } from "@/components/icons";

interface PortfolioContentProps {
  profile: GitHubProfile;
  projects: RankedProject[];
  topLanguages: { language: string; count: number; percentage: number }[];
  aiBio: string;
}

export function PortfolioContent({
  profile,
  projects,
  topLanguages,
  aiBio,
}: PortfolioContentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("All");
  const [sortBy, setSortBy] = useState<"score" | "stars" | "forks" | "recent">("score");

  // Distinct list of languages across all projects
  const availableLanguages = useMemo(() => {
    const langs = new Set<string>();
    projects.forEach((p) => {
      if (p.language) langs.add(p.language);
    });
    return ["All", ...Array.from(langs)];
  }, [projects]);

  // Filter & sort all available repositories
  const filteredProjects = useMemo(() => {
    return projects
      .filter((repo) => {
        const matchesSearch =
          repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          repo.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          repo.topics.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesLanguage =
          selectedLanguage === "All" || repo.language === selectedLanguage;

        return matchesSearch && matchesLanguage;
      })
      .sort((a, b) => {
        if (sortBy === "stars") return b.stargazers_count - a.stargazers_count;
        if (sortBy === "forks") return b.forks_count - a.forks_count;
        if (sortBy === "recent") {
          return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
        }
        return b.score - a.score;
      });
  }, [projects, searchQuery, selectedLanguage, sortBy]);

  return (
    <div className="space-y-10">
      {/* 1. GET TO KNOW ME SECTION */}
      <section className="neo-card p-6 sm:p-8 bg-white">
        <div className="flex items-center justify-between pb-5 border-b-2 border-black">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#2563EB] text-white border-2 border-black flex items-center justify-center">
              <Hand className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-black tracking-tight text-[#0F172A]">
                Get to Know Me
              </h2>
              <p className="text-xs font-semibold text-neutral-500">
                Verified developer journey &amp; technical footprint
              </p>
            </div>
          </div>

          <span className="hidden sm:inline-flex items-center gap-1.5 bg-[#DBEAFE] text-[#1E3A8A] text-xs font-bold px-3 py-1 rounded-full border border-black">
            <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
            AI Synthesized
          </span>
        </div>

        {/* AI-Generated About Story Box */}
        <div className="mt-6 p-5 sm:p-6 rounded-xl bg-[#F8FAFC] border-2 border-black border-b-[4px] relative">
          <div className="flex items-center gap-2 mb-3">
            <User className="w-5 h-5 text-[#2563EB]" />
            <span className="text-xs font-black uppercase tracking-wider text-[#0F172A]">
              Executive Overview
            </span>
          </div>
          <p className="text-sm sm:text-base text-neutral-800 leading-relaxed font-medium">
            {aiBio}
          </p>
        </div>

        {/* PRs Merged & Issues Closed Metric Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <div className="flex items-center gap-4 p-4 rounded-xl border-2 border-black bg-white">
            <div className="w-12 h-12 rounded-xl bg-[#DBEAFE] border-2 border-black flex items-center justify-center shrink-0">
              <GitPullRequest className="w-6 h-6 text-[#2563EB]" />
            </div>
            <div>
              <div className="text-2xl font-black text-[#0F172A]">
                {profile.pull_requests_merged}+
              </div>
              <div className="text-xs font-bold text-neutral-600">
                Pull Requests Merged
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl border-2 border-black bg-white">
            <div className="w-12 h-12 rounded-xl bg-[#2563EB] border-2 border-black flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-black text-[#0F172A]">
                {profile.issues_closed}+
              </div>
              <div className="text-xs font-bold text-neutral-600">
                Closed Issues &amp; Bug Fixes
              </div>
            </div>
          </div>
        </div>

        {/* Top Languages Badge Tags */}
        <div className="mt-8 pt-6 border-t border-neutral-200">
          <div className="flex items-center gap-2 mb-4">
            <Code2 className="w-5 h-5 text-[#2563EB]" />
            <h3 className="text-sm font-black uppercase tracking-wider text-[#0F172A]">
              Primary Tech Stack &amp; Languages
            </h3>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {topLanguages.map((tl) => (
              <div
                key={tl.language}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg border-2 border-black bg-white text-xs font-bold text-black"
              >
                <span>{tl.language}</span>
                <span className="bg-[#DBEAFE] text-[#1E3A8A] px-1.5 py-0.5 rounded text-[10px] border border-black font-bold">
                  {tl.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. GITHUB CONTRIBUTION GRAPH SECTION */}
      <section className="neo-card p-6 sm:p-8 bg-white">
        <div className="flex items-center justify-between pb-5 border-b-2 border-black">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#DBEAFE] border-2 border-black flex items-center justify-center">
              <Activity className="w-6 h-6 text-[#2563EB]" />
            </div>
            <div>
              <h2 className="text-2xl font-black tracking-tight text-[#0F172A]">
                GitHub Contribution Activity
              </h2>
              <p className="text-xs font-semibold text-neutral-500">
                Verified commit calendar and contribution frequency
              </p>
            </div>
          </div>

          <a
            href={`https://github.com/${profile.username}`}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold bg-neutral-100 hover:bg-[#DBEAFE] px-3 py-1.5 rounded-full border border-black transition-colors"
          >
            <span>View on GitHub</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Contribution Calendar Graphic */}
        <div className="mt-6 p-4 sm:p-6 bg-[#F8FAFC] rounded-xl border-2 border-black border-b-[4px]">
          <div className="flex items-center justify-between mb-4 text-xs font-bold text-neutral-600">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#2563EB]" />
              Annual Contribution Graph (@{profile.username})
            </span>
            <span className="text-[11px] bg-[#DBEAFE] text-[#1E3A8A] px-2 py-0.5 rounded border border-black">
              Real-time Sync
            </span>
          </div>

          {/* SVG Contribution chart embed */}
          <div className="overflow-x-auto py-2">
            <div className="min-w-[680px] flex justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://ghchart.rshah.org/2563eb/${profile.username}`}
                alt={`${profile.username}'s GitHub contribution calendar`}
                className="w-full max-w-full h-auto rounded"
                loading="lazy"
              />
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-neutral-200 flex flex-wrap items-center justify-between text-xs text-neutral-500 font-semibold gap-2">
            <span>Less activity &rarr; More commits</span>
            <span className="font-mono text-[11px]">Synced via GitHub Public Activity</span>
          </div>
        </div>
      </section>

      {/* 3. ALL PUBLIC REPOSITORIES */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#2563EB] text-white border-2 border-black flex items-center justify-center">
              <Layers className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-black tracking-tight text-[#0F172A]">
                All Public Repositories
              </h2>
              <p className="text-xs font-semibold text-neutral-500">
                Imported directly from GitHub with intelligent ranking
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-black bg-[#DBEAFE] text-[#1E3A8A] px-3.5 py-1.5 rounded-full border border-black">
              {filteredProjects.length} of {projects.length} Repos
            </span>
          </div>
        </div>

        {/* Search, Filter & Sort Controls */}
        <div className="p-4 bg-white rounded-xl border-2 border-black border-b-[4px] space-y-3">
          <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search repositories..."
                className="w-full pl-9 pr-3 py-2 bg-neutral-50 rounded-lg border border-neutral-300 font-medium text-xs text-black placeholder:text-neutral-400 focus:outline-none focus:border-black transition-all"
              />
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-2 w-full md:w-auto justify-end">
              <span className="text-xs font-bold text-neutral-500 whitespace-nowrap">
                Sort by:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "score" | "stars" | "forks" | "recent")}
                className="bg-neutral-50 border border-neutral-300 text-xs font-bold rounded-lg px-2.5 py-2 text-black focus:outline-none focus:border-black"
              >
                <option value="score">Highest Ranked</option>
                <option value="stars">Most Stars</option>
                <option value="forks">Most Forks</option>
                <option value="recent">Recently Updated</option>
              </select>
            </div>
          </div>

          {/* Language Filter Tags */}
          <div className="flex items-center gap-1.5 flex-wrap pt-2 border-t border-neutral-100">
            <span className="text-xs font-bold text-neutral-500 flex items-center gap-1 mr-1">
              <Filter className="w-3 h-3" /> Language:
            </span>
            {availableLanguages.slice(0, 8).map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLanguage(lang)}
                className={`text-[11px] font-bold px-2.5 py-1 rounded-md border transition-all ${
                  selectedLanguage === lang
                    ? "bg-[#2563EB] text-white border-black"
                    : "bg-neutral-50 text-neutral-700 border-neutral-200 hover:border-black"
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* Repositories Grid */}
        {filteredProjects.length === 0 ? (
          <div className="neo-card p-12 text-center bg-white">
            <p className="text-sm font-bold text-neutral-500">
              No repositories matched your search or filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedLanguage("All");
              }}
              className="neo-btn-primary text-xs py-1.5 px-3 mt-4"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredProjects.map((repo) => (
              <div
                key={repo.id}
                className="neo-card p-5 sm:p-6 bg-white flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl transition-all duration-300 relative group"
              >
                <div>
                  {/* Header with name and pinned badge */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <Code2 className="w-4 h-4 text-[#2563EB] shrink-0" />
                      <h3 className="text-base font-black text-[#0F172A] group-hover:text-[#2563EB] transition-colors break-all">
                        {repo.name}
                      </h3>
                    </div>

                    {repo.is_pinned && (
                      <span className="flex items-center gap-1 bg-[#2563EB] text-white text-[10px] font-black uppercase px-2 py-0.5 rounded border border-black shrink-0">
                        <Pin className="w-3 h-3" /> Pinned
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-neutral-600 line-clamp-3 font-medium mt-1 mb-4">
                    {repo.description}
                  </p>

                  {/* Topics */}
                  {repo.topics.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {repo.topics.slice(0, 4).map((topic) => (
                        <span
                          key={topic}
                          className="bg-neutral-100 text-neutral-700 text-[10px] font-bold px-2 py-0.5 rounded border border-neutral-200"
                        >
                          #{topic}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bottom bar: language, stars, forks, links */}
                <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-bold">
                  <div className="flex items-center gap-3 text-neutral-700">
                    <span className="bg-[#DBEAFE] text-[#1E3A8A] px-2 py-0.5 rounded border border-black text-[11px] font-bold">
                      {repo.language}
                    </span>

                    <span className="flex items-center gap-1 text-neutral-700">
                      <Star className="w-3.5 h-3.5 fill-[#b07800] text-[#b07800]" />
                      {repo.stargazers_count}
                    </span>

                    <span className="flex items-center gap-1 text-neutral-700">
                      <GitFork className="w-3.5 h-3.5" />
                      {repo.forks_count}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {repo.homepage && (
                      <a
                        href={repo.homepage}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg border border-neutral-300 hover:border-black bg-neutral-50 hover:bg-[#DBEAFE] transition-colors"
                        title="Live Demo"
                      >
                        <ArrowUpRight className="w-4 h-4 text-black" />
                      </a>
                    )}

                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-lg border border-neutral-300 hover:border-black bg-neutral-50 hover:bg-[#DBEAFE] transition-colors"
                      title="View GitHub Repository"
                    >
                      <Github className="w-4 h-4 text-black" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
