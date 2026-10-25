"use client";

import React from "react";
import { GitPullRequest, Heart, ExternalLink, Plus, Hand } from "lucide-react";
import Image from "next/image";

interface ContributorItem {
  login: string;
  name: string;
  role: string;
  avatar: string;
  contributions: number;
  githubUrl: string;
}

const FEATURED_CONTRIBUTORS: ContributorItem[] = [
  {
    login: "torvalds",
    name: "Linus Torvalds",
    role: "Kernel Architecture",
    avatar: "https://avatars.githubusercontent.com/u/1024025?v=4",
    contributions: 312,
    githubUrl: "https://github.com/torvalds",
  },
  {
    login: "shadcn",
    name: "shadcn",
    role: "UI Systems & Design Tokens",
    avatar: "https://avatars.githubusercontent.com/u/124599?v=4",
    contributions: 184,
    githubUrl: "https://github.com/shadcn",
  },
  {
    login: "leerob",
    name: "Lee Robinson",
    role: "Next.js & App Router",
    avatar: "https://avatars.githubusercontent.com/u/9113740?v=4",
    contributions: 142,
    githubUrl: "https://github.com/leerob",
  },
  {
    login: "gaearon",
    name: "Dan Abramov",
    role: "React Ecosystem & Tooling",
    avatar: "https://avatars.githubusercontent.com/u/810438?v=4",
    contributions: 119,
    githubUrl: "https://github.com/gaearon",
  },
];

export function NextContributorCard() {
  return (
    <a
      href="https://github.com/awtpx/port.dev"
      target="_blank"
      rel="noreferrer"
      className="neo-card p-5 bg-[#DBEAFE] border-dashed border-2 border-black flex flex-col items-center justify-center text-center hover:bg-[#2563EB] hover:text-white transition-all group"
    >
      <div className="w-14 h-14 rounded-full bg-white border-2 border-black flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
        <Plus className="w-7 h-7 text-black stroke-[3]" />
      </div>

      <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider">
        <Hand className="w-4 h-4" />
        <span>You?</span>
      </div>

      <h4 className="text-sm font-black mt-1">
        Join us and contribute
      </h4>
      <p className="text-xs text-neutral-600 group-hover:text-neutral-200 mt-1 font-medium max-w-[180px]">
        Submit a PR, fix a bug, or suggest a new portfolio layout.
      </p>

      <span className="mt-3 text-[11px] font-black underline flex items-center gap-1">
        Open Repository <ExternalLink className="w-3 h-3" />
      </span>
    </a>
  );
}

export function Contributors() {
  return (
    <section className="py-20 md:py-28 bg-white border-t-2 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-[#DBEAFE] text-xs font-bold text-[#1E3A8A] px-3.5 py-1.5 rounded-full border border-black mb-3">
            <Heart className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>Open Source Community</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#0F172A]">
            Powered by Global Builders
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 font-medium">
            port is built by developers, for developers. Check out the open-source community shaping developer portfolios.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {FEATURED_CONTRIBUTORS.map((c) => (
            <a
              key={c.login}
              href={c.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="neo-card p-4 sm:p-5 flex flex-col items-center text-center hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
            >
              <div className="relative w-16 h-16 rounded-full border-2 border-black overflow-hidden mb-3 shadow-md bg-neutral-100">
                <Image
                  src={c.avatar}
                  alt={c.name}
                  fill
                  className="object-cover"
                  sizes="64px"
                  unoptimized
                />
              </div>

              <h4 className="text-sm font-black text-[#0F172A] uppercase tracking-wide">
                {c.name}
              </h4>
              <span className="text-xs font-semibold text-neutral-500">
                @{c.login}
              </span>

              <span className="mt-2 text-[11px] font-bold bg-[#DBEAFE] text-[#1E3A8A] px-2 py-0.5 rounded border border-black">
                {c.role}
              </span>

              <div className="mt-3 pt-3 border-t border-neutral-100 w-full flex items-center justify-center gap-1.5 text-[11px] font-bold text-neutral-600">
                <GitPullRequest className="w-3 h-3 text-black" />
                <span>{c.contributions} Contributions</span>
              </div>
            </a>
          ))}

          {/* Interactive Next Contributor Card */}
          <NextContributorCard />
        </div>
      </div>
    </section>
  );
}
