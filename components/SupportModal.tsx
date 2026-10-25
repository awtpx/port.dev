"use client";

import React from "react";
import { useAppStore } from "@/lib/store";
import { Coffee, Users, Star, X, ExternalLink, Heart, Share2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function FloatingSupportButton() {
  const { openSupportModal } = useAppStore();

  return (
    <button
      onClick={openSupportModal}
      className="fixed bottom-6 left-6 z-40 flex items-center gap-2.5 bg-white px-4 py-2.5 rounded-full border-2 border-black border-b-[4px] shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all duration-200 group"
    >
      <div className="w-7 h-7 rounded-full bg-[#DBEAFE] border border-black flex items-center justify-center">
        <Coffee className="w-4 h-4 text-[#7c5400]" />
      </div>
      <span className="text-xs font-bold text-[#0F172A] group-hover:text-[#2563EB]">
        Support port
      </span>
    </button>
  );
}

export function SupportModal() {
  const { isSupportModalOpen, closeSupportModal, showToast } = useAppStore();

  const handleCopyShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.origin);
      showToast("Invite link copied to clipboard!");
    }
  };

  return (
    <AnimatePresence>
      {isSupportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="w-full max-w-md bg-white rounded-2xl border-2 border-black border-b-[6px] shadow-2xl p-6 sm:p-7 relative"
          >
            {/* Close Button */}
            <button
              onClick={closeSupportModal}
              className="absolute top-5 right-5 p-2 rounded-lg hover:bg-neutral-100 border border-neutral-300 transition-colors"
            >
              <X className="w-5 h-5 text-black" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-[#DBEAFE] border-2 border-black flex items-center justify-center">
                <Heart className="w-6 h-6 text-[#2563EB] fill-[#2563EB]" />
              </div>
              <span className="text-xs uppercase tracking-wider font-bold bg-[#2563EB] text-white px-2.5 py-0.5 rounded-full border border-black">
                Community Powered
              </span>
            </div>

            <h3 className="text-2xl font-black text-[#0F172A] mt-2">
              Back the port Mission
            </h3>
            <p className="text-sm text-neutral-600 mt-1 mb-6">
              port is 100% free and open-source. Here are three simple ways to support our infrastructure and development:
            </p>

            <div className="space-y-3">
              {/* Option 1: Invite Friends */}
              <div
                onClick={handleCopyShare}
                className="flex items-center gap-4 p-3.5 rounded-xl border-2 border-black border-b-[4px] bg-[#F8FAFC] hover:bg-[#DBEAFE]/40 hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-white border-2 border-black flex items-center justify-center shrink-0">
                  <Users className="w-6 h-6 text-[#2563EB]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-[#0F172A]">
                      Invite 2 Friends
                    </h4>
                    <Share2 className="w-4 h-4 text-neutral-500" />
                  </div>
                  <p className="text-xs text-neutral-600 mt-0.5">
                    Share your portfolio link with engineering teammates.
                  </p>
                </div>
              </div>

              {/* Option 2: Fuel our code */}
              <a
                href="https://buymeacoffee.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 p-3.5 rounded-xl border-2 border-black border-b-[4px] bg-[#F8FAFC] hover:bg-[#DBEAFE]/40 hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-white border-2 border-black flex items-center justify-center shrink-0">
                  <Coffee className="w-6 h-6 text-[#7c5400]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-[#0F172A]">
                      Fuel our code
                    </h4>
                    <ExternalLink className="w-4 h-4 text-neutral-500" />
                  </div>
                  <p className="text-xs text-neutral-600 mt-0.5">
                    Buy the team a coffee to support free hosting & AI compute.
                  </p>
                </div>
              </a>

              {/* Option 3: Star our GitHub */}
              <a
                href="https://github.com/awtpx/port.dev"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 p-3.5 rounded-xl border-2 border-black border-b-[4px] bg-[#F8FAFC] hover:bg-[#DBEAFE]/40 hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-white border-2 border-black flex items-center justify-center shrink-0">
                  <Star className="w-6 h-6 fill-[#b07800] text-[#b07800]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-[#0F172A]">
                      Star our GitHub
                    </h4>
                    <ExternalLink className="w-4 h-4 text-neutral-500" />
                  </div>
                  <p className="text-xs text-neutral-600 mt-0.5">
                    Leave a star on GitHub to help developers discover port.
                  </p>
                </div>
              </a>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={closeSupportModal}
                className="text-xs font-bold text-neutral-500 hover:text-black transition-colors"
              >
                Maybe later, thank you!
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
