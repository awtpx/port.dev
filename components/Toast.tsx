"use client";

import React from "react";
import { useAppStore } from "@/lib/store";
import { CheckCircle2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Toast() {
  const { toastMessage, clearToast } = useAppStore();

  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#111111] text-white px-5 py-3.5 rounded-xl border-2 border-black border-b-[5px] shadow-2xl"
        >
          <div className="w-6 h-6 rounded-full bg-[#2563EB] flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-semibold">{toastMessage}</span>
          <button
            onClick={clearToast}
            className="ml-2 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
