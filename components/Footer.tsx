"use client";

import React from "react";
import Link from "next/link";
import { Code2, Heart, Coffee } from "lucide-react";
import { GithubIcon as Github, TwitterIcon as Twitter } from "@/components/icons";
import { useAppStore } from "@/lib/store";

export function Footer() {
  const { openUsernameModal, openSupportModal } = useAppStore();

  return (
    <footer className="border-t-2 border-black bg-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b-2 border-neutral-200">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#2563EB] border-2 border-black border-b-[4px] flex items-center justify-center">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-black tracking-tight text-[#0F172A]">
                port
              </span>
            </Link>
            <p className="mt-3 text-sm text-neutral-600 max-w-sm font-medium">
              Automated developer portfolios and dynamic ATS resume generator powered by GitHub and AI. 100% pure Next.js App Router.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <a
                href="https://github.com/awtpx/port.dev"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-neutral-100 hover:bg-[#DBEAFE] border border-neutral-300 hover:border-black flex items-center justify-center transition-colors"
                title="GitHub Repo"
              >
                <Github className="w-4 h-4 text-black" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-neutral-100 hover:bg-[#DBEAFE] border border-neutral-300 hover:border-black flex items-center justify-center transition-colors"
                title="Twitter"
              >
                <Twitter className="w-4 h-4 text-black" />
              </a>
              <button
                onClick={openSupportModal}
                className="w-9 h-9 rounded-lg bg-neutral-100 hover:bg-[#DBEAFE] border border-neutral-300 hover:border-black flex items-center justify-center transition-colors"
                title="Support"
              >
                <Coffee className="w-4 h-4 text-[#7c5400]" />
              </button>
            </div>
          </div>

          {/* Quick Explore */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-neutral-900 mb-4">
              Featured Developers
            </h4>
            <ul className="space-y-2 text-sm font-semibold text-neutral-600">
              <li>
                <Link href="/torvalds" className="hover:text-[#2563EB] hover:underline">
                  Linus Torvalds
                </Link>
              </li>
              <li>
                <Link href="/shadcn" className="hover:text-[#2563EB] hover:underline">
                  shadcn
                </Link>
              </li>
              <li>
                <Link href="/leerob" className="hover:text-[#2563EB] hover:underline">
                  Lee Robinson
                </Link>
              </li>
              <li>
                <Link href="/gaearon" className="hover:text-[#2563EB] hover:underline">
                  Dan Abramov
                </Link>
              </li>
            </ul>
          </div>

          {/* Action */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-neutral-900 mb-4">
              Get Started
            </h4>
            <button
              onClick={openUsernameModal}
              className="neo-btn-primary text-xs py-2 px-4 w-full justify-center"
            >
              Generate Portfolio
            </button>
            <p className="text-[11px] text-neutral-500 mt-2 font-medium">
              Free forever. No OAuth tokens or authentication needed.
            </p>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-neutral-500">
          <p>© {new Date().getFullYear()} port. Open source developer tooling.</p>
          <div className="flex items-center gap-1.5">
            <span>Crafted for developers with</span>
            <Heart className="w-3.5 h-3.5 fill-[#2563EB] text-[#2563EB]" />
          </div>
        </div>
      </div>
    </footer>
  );
}
