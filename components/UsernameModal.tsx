"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";
import { X, ArrowRight, Sparkles, Loader2 } from "lucide-react";
import { GithubIcon as Github } from "@/components/icons";
import { motion, AnimatePresence } from "framer-motion";

const POPULAR_PROFILES = [
  { username: "torvalds", name: "Linus Torvalds", role: "Linux & Git Creator" },
  { username: "shadcn", name: "shadcn", role: "Creator of shadcn/ui" },
  { username: "leerob", name: "Lee Robinson", role: "VP of Product" },
  { username: "gaearon", name: "Dan Abramov", role: "Redux & React Builder" },
];

export function UsernameModal() {
  const { isUsernameModalOpen, closeUsernameModal } = useAppStore();
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleGenerate = (targetUsername?: string) => {
    const raw = (targetUsername || username).trim().replace(/^@/, "");
    if (!raw) {
      setError("Please enter a valid GitHub username");
      return;
    }
    if (!/^[a-zA-Z0-9_-]+$/.test(raw)) {
      setError("GitHub usernames may only contain alphanumeric characters and hyphens");
      return;
    }

    setError(null);
    setIsLoading(true);
    closeUsernameModal();
    router.push(`/${raw}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleGenerate();
    }
  };

  return (
    <AnimatePresence>
      {isUsernameModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="w-full max-w-lg bg-white rounded-2xl border-2 border-black border-b-[6px] shadow-2xl p-6 sm:p-8 relative"
          >
            {/* Close Button */}
            <button
              onClick={closeUsernameModal}
              className="absolute top-5 right-5 p-2 rounded-lg hover:bg-neutral-100 border border-neutral-300 transition-colors"
            >
              <X className="w-5 h-5 text-black" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-[#DBEAFE] border-2 border-black flex items-center justify-center">
                <Github className="w-6 h-6 text-[#2563EB]" />
              </div>
              <span className="text-xs uppercase tracking-wider font-bold bg-[#2563EB] text-white px-2.5 py-0.5 rounded-full border border-black">
                Instant Portfolio
              </span>
            </div>

            <h3 className="text-2xl font-black tracking-tight text-[#0F172A] mt-3">
              Generate Your Developer Portfolio
            </h3>
            <p className="text-sm text-neutral-600 mt-1 mb-6">
              Enter any GitHub username to automatically rank all repositories, load live contribution charts, and generate an AI summary.
            </p>

            {/* Input Field */}
            <div className="space-y-3">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-400 font-bold">
                  @
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (error) setError(null);
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="github-username"
                  autoFocus
                  className="w-full pl-9 pr-14 py-3.5 bg-neutral-50 rounded-xl border-2 border-black border-b-[4px] font-medium text-base text-black placeholder:text-neutral-400 focus:outline-none focus:bg-white focus:border-black transition-all"
                />
                <button
                  onClick={() => handleGenerate()}
                  disabled={isLoading}
                  className="absolute right-2.5 top-2.5 bottom-2.5 px-3.5 bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg border border-black font-bold flex items-center justify-center transition-all disabled:opacity-50"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                  ) : (
                    <ArrowRight className="w-4 h-4 text-white" />
                  )}
                </button>
              </div>

              {error && (
                <p className="text-xs font-semibold text-red-600 pl-1">{error}</p>
              )}
            </div>

            {/* Suggested Profiles */}
            <div className="mt-6 pt-5 border-t border-neutral-200">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
                <span>Or explore popular developers:</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {POPULAR_PROFILES.map((p) => (
                  <button
                    key={p.username}
                    onClick={() => handleGenerate(p.username)}
                    className="flex flex-col text-left p-2.5 rounded-xl border border-neutral-200 hover:border-black hover:bg-[#DBEAFE]/40 transition-all text-xs group"
                  >
                    <span className="font-bold text-[#0F172A] group-hover:text-[#2563EB] flex items-center justify-between">
                      @{p.username}
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#2563EB]" />
                    </span>
                    <span className="text-[11px] text-neutral-500 truncate">
                      {p.role}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
