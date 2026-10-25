import React from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { CompareSlider } from "@/components/CompareSlider";
import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";
import { FloatingSupportButton } from "@/components/SupportModal";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A]">
      {/* Sticky Header / AnimatedNav */}
      <Navbar />

      <main className="flex-1">
        {/* Animated Hero Section with Lucide icons, live counter & CTA */}
        <Hero />

        {/* Visual Compare Slider: Raw GitHub README vs high-converting port profile */}
        <CompareSlider />

        {/* Feature & Integration Cards */}
        <Features />
      </main>

      {/* Footer */}
      <Footer />

      {/* Support / Coffee Floating Trigger */}
      <FloatingSupportButton />
    </div>
  );
}
