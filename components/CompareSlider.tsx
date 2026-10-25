"use client";

import React, { useState, useRef, useCallback } from "react";
import {
  Code2,
  Sparkles,
  GitPullRequest,
  CheckCircle2,
  FileDown,
  Star,
  GitFork,
  MapPin,
  MoveHorizontal,
  Flame,
} from "lucide-react";

export function CompareSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const isDragging = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const clamped = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPosition(clamped);
  }, []);

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-neutral-100/70 border-y-2 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-[#DBEAFE] text-xs font-bold text-[#1E3A8A] px-3.5 py-1.5 rounded-full border border-black mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#1E3A8A]" />
            <span>Interactive Comparison</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#0F172A]">
            Stop Losing Opportunities to Raw READMEs
          </h2>
          <p className="mt-3 text-base sm:text-lg text-neutral-600 font-medium">
            Drag the slider to see how <strong>port</strong> transforms generic GitHub markdown into a verified, recruiter-ready developer profile.
          </p>
        </div>

        {/* Comparison Interactive Container */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchMove={handleTouchMove}
          className="relative max-w-5xl mx-auto h-[500px] sm:h-[480px] rounded-2xl border-2 border-black border-b-[6px] shadow-2xl bg-white overflow-hidden select-none cursor-ew-resize"
        >
          {/* UNDER LAYER: port High-Converting Portfolio (Revealed on Right) */}
          <div className="absolute inset-0 bg-[#F8FAFC] p-6 sm:p-8 flex flex-col justify-between">
            <div className="flex items-center justify-between border-b-2 border-black pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#2563EB] text-white border-2 border-black flex items-center justify-center font-black text-xl">
                  LT
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-lg text-black uppercase">
                      Linus Torvalds
                    </span>
                    <span className="bg-[#2563EB] text-white text-[10px] font-black px-2 py-0.5 rounded border border-black">
                      VERIFIED BUILDER
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-neutral-600 font-semibold">
                    <MapPin className="w-3.5 h-3.5 text-black" />
                    <span>Portland, OR • Linux Foundation</span>
                  </div>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-2">
                <span className="neo-badge bg-[#DBEAFE] text-xs font-bold text-[#1E3A8A]">
                  <Flame className="w-3.5 h-3.5 text-[#1E3A8A]" />
                  Top 0.01% Global Rank
                </span>
                <span className="neo-btn-primary text-xs py-1.5 px-3">
                  <FileDown className="w-3.5 h-3.5" />
                  Resume.pdf
                </span>
              </div>
            </div>

            {/* Simulated Ranked Projects Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-auto">
              <div className="neo-card p-4 bg-white">
                <div className="flex items-center justify-between">
                  <span className="font-black text-base text-black flex items-center gap-1.5">
                    <Code2 className="w-4 h-4 text-[#2563EB]" /> linux
                  </span>
                  <div className="flex items-center gap-2 text-xs font-bold text-neutral-700">
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-[#b07800] text-[#b07800]" /> 182k
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="w-3.5 h-3.5" /> 54k
                    </span>
                  </div>
                </div>
                <p className="text-xs text-neutral-600 mt-2 line-clamp-2">
                  Linux kernel source tree. Powers the internet, mobile supercomputers, and cloud systems worldwide.
                </p>
                <div className="flex items-center gap-1.5 mt-3">
                  <span className="bg-[#DBEAFE] text-[#1E3A8A] text-[10px] font-bold px-2 py-0.5 rounded border border-black">
                    C
                  </span>
                  <span className="bg-neutral-100 text-[10px] font-bold px-2 py-0.5 rounded border border-neutral-300">
                    OS Kernel
                  </span>
                </div>
              </div>

              <div className="neo-card p-4 bg-white">
                <div className="flex items-center justify-between">
                  <span className="font-black text-base text-black flex items-center gap-1.5">
                    <Code2 className="w-4 h-4 text-[#2563EB]" /> git
                  </span>
                  <div className="flex items-center gap-2 text-xs font-bold text-neutral-700">
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-[#b07800] text-[#b07800]" /> 52k
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="w-3.5 h-3.5" /> 26k
                    </span>
                  </div>
                </div>
                <p className="text-xs text-neutral-600 mt-2 line-clamp-2">
                  Fast, scalable, distributed revision control system with an unusually rich command set.
                </p>
                <div className="flex items-center gap-1.5 mt-3">
                  <span className="bg-[#DBEAFE] text-[#1E3A8A] text-[10px] font-bold px-2 py-0.5 rounded border border-black">
                    C
                  </span>
                  <span className="bg-neutral-100 text-[10px] font-bold px-2 py-0.5 rounded border border-neutral-300">
                    VCS Engine
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom verified stats banner */}
            <div className="flex items-center justify-between pt-3 border-t border-neutral-200 text-xs font-bold text-neutral-600">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-[#2563EB]">
                  <GitPullRequest className="w-3.5 h-3.5" /> 840+ Merged PRs
                </span>
                <span className="flex items-center gap-1 text-[#2563EB]">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 1,200+ Issues Solved
                </span>
              </div>
              <span className="text-[11px] text-neutral-400">port verified metrics</span>
            </div>
          </div>

          {/* OVER LAYER: Raw Unstyled GitHub Markdown (Clipped by slider position) */}
          <div
            className="absolute inset-0 bg-white border-r-2 border-black"
            style={{ width: `${sliderPosition}%` }}
          >
            <div className="w-[1000px] max-w-[1000px] p-6 sm:p-8 font-mono text-neutral-800 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs text-neutral-500 mb-4 pb-2 border-b border-neutral-200">
                  <span>README.md</span>
                  <span>•</span>
                  <span>raw markdown</span>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-neutral-900 font-mono">
                    # Hi there, I am Linus 👋
                  </h3>
                  <p className="text-xs text-neutral-600 leading-relaxed font-mono">
                    - 🔭 I’m currently working on Linux Kernel<br />
                    - 🌱 I’m currently learning nothing, I invented git<br />
                    - 👯 I’m looking to collaborate on low-level OS code<br />
                    - 💬 Ask me about C, compilers, and kernels<br />
                    - 📫 How to reach me: torvalds@linux-foundation.org
                  </p>

                  <div className="p-3 bg-neutral-100 rounded border border-neutral-300 text-[11px] text-neutral-600 mt-4">
                    ```sh<br />
                    $ git clone https://github.com/torvalds/linux.git<br />
                    $ make defconfig &amp;&amp; make -j$(nproc)<br />
                    ```
                  </div>

                  <p className="text-[11px] text-neutral-400 italic mt-3">
                    [GitHub stats card badge failed to load...]
                  </p>
                </div>
              </div>

              <div className="text-[11px] text-neutral-400 border-t border-neutral-200 pt-3">
                Unformatted raw README • No verified stats • No ATS resume download
              </div>
            </div>
          </div>

          {/* Draggable Vertical Divider Handle */}
          <div
            className="absolute top-0 bottom-0 z-30 flex items-center justify-center -translate-x-1/2 pointer-events-none"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="w-1 h-full bg-black shadow-lg" />
            <div
              onMouseDown={handleMouseDown}
              className="pointer-events-auto absolute w-10 h-10 rounded-full bg-[#2563EB] text-white border-2 border-black flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-transform cursor-grab active:cursor-grabbing"
            >
              <MoveHorizontal className="w-5 h-5 text-white" />
            </div>
          </div>

          {/* Floating Pill Badges indicating sides */}
          <div className="absolute top-4 left-4 z-20 pointer-events-none">
            <span className="bg-neutral-900/80 text-white text-[10px] font-mono px-2.5 py-1 rounded-md border border-white/20">
              BEFORE: Raw GitHub
            </span>
          </div>

          <div className="absolute top-4 right-4 z-20 pointer-events-none">
            <span className="bg-[#2563EB] text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-md border border-black shadow">
              AFTER: port
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
