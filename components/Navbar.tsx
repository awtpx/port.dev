"use client";

import React from "react";
import Link from "next/link";
import { useAppStore } from "@/lib/store";
import { Code2, Star, Plus, Flame } from "lucide-react";

export function Navbar() {
  const { openUsernameModal } = useAppStore();

  return (
    <header className="sticky top-0 z-40 w-full border-b-2 border-black bg-white/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-[#2563EB] border-2 border-black border-b-[4px] flex items-center justify-center group-hover:rotate-6 transition-transform">
            <Code2 className="w-6 h-6 text-white stroke-[2.5]" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-tight text-[#0F172A]">
              port
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 -mt-1">
              Developer Portfolios
            </span>
          </div>
        </Link>

        {/* Center / Secondary Badges */}
        <div className="hidden md:flex items-center gap-3">
          {/* Product Hunt Badge */}
          <a
            href="https://www.producthunt.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 bg-[#DBEAFE] text-xs font-bold text-[#1E3A8A] px-3.5 py-1.5 rounded-full border border-black hover:bg-[#2563EB] hover:text-white transition-colors"
          >
            <Flame className="w-3.5 h-3.5 text-[#1E3A8A]" />
            <span>#1 Developer Tool</span>
          </a>

          {/* GitHub Star Button */}
          <a
            href="https://github.com/awtpx/port.dev"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 bg-neutral-100 hover:bg-neutral-200 text-xs font-bold text-black px-3.5 py-1.5 rounded-full border border-neutral-300 transition-colors"
          >
            <Star className="w-3.5 h-3.5 fill-[#b07800] text-[#b07800]" />
            <span>Star on GitHub</span>
            <span className="bg-white px-1.5 py-0.5 rounded text-[10px] border border-neutral-300 font-bold">
              1.8k
            </span>
          </a>
        </div>

        {/* Primary CTA */}
        <div className="flex items-center gap-3">
          <button
            onClick={openUsernameModal}
            className="neo-btn-primary text-xs sm:text-sm py-2 px-4 sm:px-5"
          >
            <Plus className="w-4 h-4 text-white stroke-[3]" />
            <span>Create Portfolio</span>
          </button>
        </div>
      </div>
    </header>
  );
}
