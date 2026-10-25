"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";
import {
  Code2,
  FolderGit2,
  ArrowRight,
  CheckCircle,
  FileText,
  TrendingUp,
  Activity,
} from "lucide-react";
import { GithubIcon as Github } from "@/components/icons";
import { motion } from "framer-motion";

export function Hero() {
  const { openUsernameModal } = useAppStore();
  const [inlineUsername, setInlineUsername] = useState("");
  const router = useRouter();

  const handleInlineSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = inlineUsername.trim().replace(/^@/, "");
    if (clean) {
      router.push(`/${clean}`);
    } else {
      openUsernameModal();
    }
  };

  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
      {/* Background Subtle Neo Grid */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:32px_32px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Floating animated badge pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="neo-badge bg-[#DBEAFE] text-[#1E3A8A]"
            >
              <Code2 className="w-5 h-5 text-[#1E3A8A]" />
              <span>All Public Repositories</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="neo-badge bg-[#2563EB] text-white"
            >
              <Activity className="w-5 h-5 text-white" />
              <span>Live GitHub Contribution Graph</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="neo-badge bg-white"
            >
              <FolderGit2 className="w-5 h-5 text-black" />
              <span>Dynamic ATS Resume</span>
            </motion.div>
          </div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-[#0F172A] leading-[1.08]"
          >
            Effortless Portfolios for Developers
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-6 text-lg sm:text-xl text-neutral-600 max-w-2xl font-medium"
          >
            Turn all your GitHub repositories, real-time contribution activity, and verified coding stats into a high-converting developer portfolio with <strong>port</strong>.
          </motion.p>

          {/* Direct Input & Primary CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-10 w-full max-w-xl"
          >
            <form
              onSubmit={handleInlineSubmit}
              className="flex flex-col sm:flex-row gap-3 bg-white p-2.5 rounded-2xl border-2 border-black border-b-[6px] shadow-xl"
            >
              <div className="relative flex-1 flex items-center">
                <Github className="w-5 h-5 text-neutral-400 absolute left-4" />
                <input
                  type="text"
                  value={inlineUsername}
                  onChange={(e) => setInlineUsername(e.target.value)}
                  placeholder="Enter your GitHub username..."
                  className="w-full pl-11 pr-4 py-3 bg-transparent text-black font-semibold placeholder:text-neutral-400 focus:outline-none text-base"
                />
              </div>

              <button
                type="submit"
                className="neo-btn-primary px-6 py-3.5 text-base whitespace-nowrap shadow"
              >
                <span>Generate Portfolio</span>
                <ArrowRight className="w-5 h-5 text-white" />
              </button>
            </form>

            {/* Quick Demo links */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs font-semibold text-neutral-500">
              <span>Try with:</span>
              {["torvalds", "shadcn", "leerob", "gaearon"].map((u) => (
                <button
                  key={u}
                  type="button"
                  onClick={() => router.push(`/${u}`)}
                  className="bg-white px-2.5 py-1 rounded-md border border-neutral-300 hover:border-black text-[#111111] transition-colors"
                >
                  @{u}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Live Counter & Verified Metrics Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-bold text-neutral-600 bg-white px-6 py-3.5 rounded-2xl border-2 border-black border-b-[4px]"
          >
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#2563EB]" />
              <span>
                <strong className="text-black text-sm">18,500+</strong> Portfolios Created
              </span>
            </div>

            <div className="hidden sm:block w-px h-5 bg-neutral-300" />

            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#2563EB]" />
              <span>Real-time GitHub Sync</span>
            </div>

            <div className="hidden sm:block w-px h-5 bg-neutral-300" />

            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#2563EB]" />
              <span>Instant ATS-Friendly Resume</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
