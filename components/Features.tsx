"use client";

import React from "react";
import {
  Activity,
  Sparkles,
  FileDown,
  Layers,
  CheckCircle2,
  Zap,
  Code2,
} from "lucide-react";
import { GithubIcon as Github } from "@/components/icons";

const FEATURES = [
  {
    icon: Github,
    title: "All Public Repositories",
    badge: "Full Sync",
    description:
      "Automatically imports every single public repository from your GitHub profile with interactive search, language filters, and sorting.",
    accent: "bg-[#DBEAFE]",
  },
  {
    icon: Activity,
    title: "Live Contribution Graph",
    badge: "Real-Time Activity",
    description:
      "Displays your official GitHub contribution chart, daily commit heatmaps, streak data, merged pull requests, and closed issues.",
    accent: "bg-[#2563EB] text-white",
  },
  {
    icon: Sparkles,
    title: "AI Executive Bio Generator",
    badge: "Groq Powered",
    description:
      "Synthesizes your technical expertise and standout projects into a punchy, recruiter-targeted executive summary.",
    accent: "bg-white",
  },
  {
    icon: Code2,
    title: "Intelligent Repo Ranking",
    badge: "Smart Heuristics",
    description:
      "Ranks repositories dynamically based on stars, forks, pinned items, documentation, and recency of updates.",
    accent: "bg-[#DBEAFE]",
  },
  {
    icon: FileDown,
    title: "Dynamic ATS Resume PDF",
    badge: "React-PDF Engine",
    description:
      "One click renders a pixel-perfect, recruiter-ready PDF resume directly in memory via Next.js Route Handlers.",
    accent: "bg-[#2563EB] text-white",
  },
  {
    icon: Layers,
    title: "100% Pure Next.js App Router",
    badge: "Zero Backend Bloat",
    description:
      "Zero external servers (no Python, Redis, or Docker). Pure React Server Components with built-in data caching.",
    accent: "bg-white",
  },
];

export function Features() {
  return (
    <section className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 bg-[#DBEAFE] text-xs font-bold text-[#1E3A8A] px-3.5 py-1.5 rounded-full border border-black mb-3">
          <Zap className="w-3.5 h-3.5 text-[#1E3A8A]" />
          <span>Core Capabilities</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#0F172A]">
          Engineered for Developers Who Build
        </h2>
        <p className="mt-4 text-base sm:text-lg text-neutral-600 font-medium">
          Everything you need to showcase your code craftsmanship, contribution frequency, and open-source impact in one unified URL.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {FEATURES.map((feat, index) => {
          const Icon = feat.icon;
          return (
            <div
              key={index}
              className="neo-card p-6 sm:p-7 flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div
                    className={`w-12 h-12 rounded-xl ${feat.accent} border-2 border-black flex items-center justify-center`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider bg-neutral-100 text-neutral-700 px-2.5 py-1 rounded-md border border-neutral-300">
                    {feat.badge}
                  </span>
                </div>

                <h3 className="text-xl font-black text-[#0F172A] mb-2.5">
                  {feat.title}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed font-medium">
                  {feat.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center gap-2 text-xs font-bold text-neutral-700">
                <CheckCircle2 className="w-4 h-4 text-[#2563EB]" />
                <span>Automated &amp; Zero Config</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
