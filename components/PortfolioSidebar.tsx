"use client";

import React from "react";
import Image from "next/image";
import { GitHubProfile } from "@/types";
import {
  MapPin,
  FileDown,
  Share2,
  Globe,
  Building,
  Calendar,
  Sparkles,
} from "lucide-react";
import { GithubIcon as Github, TwitterIcon as Twitter } from "@/components/icons";
import { useAppStore } from "@/lib/store";

interface PortfolioSidebarProps {
  profile: GitHubProfile;
}

export function PortfolioSidebar({ profile }: PortfolioSidebarProps) {
  const { showToast } = useAppStore();

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      showToast("Portfolio link copied to clipboard!");
    }
  };

  const formattedDate = profile.created_at
    ? new Date(profile.created_at).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })
    : "2021";

  return (
    <aside className="w-full lg:sticky lg:top-24 space-y-6">
      {/* Neo-brutalist Profile Card */}
      <div className="neo-card overflow-hidden bg-white">
        {/* Profile Header Banner with blue gradient */}
        <div className="h-28 bg-[linear-gradient(94.26deg,#DBEAFE_31.3%,#2563EB_93.36%)] border-b-2 border-black relative">
          <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-white/95 backdrop-blur px-2.5 py-1 rounded-full border border-black text-[11px] font-black uppercase tracking-wider text-[#0F172A]">
            <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>Dev Verified</span>
          </div>
        </div>

        {/* Profile Avatar and Information */}
        <div className="px-6 pb-6 pt-0 relative">
          {/* Avatar with thick white border and soft shadow */}
          <div className="relative -mt-14 mb-4">
            <div className="w-24 h-24 rounded-2xl border-4 border-white bg-white shadow-xl overflow-hidden relative">
              <Image
                src={profile.avatar_url}
                alt={`${profile.name || profile.username}'s avatar`}
                fill
                className="object-cover"
                sizes="96px"
                priority
                unoptimized
              />
            </div>
          </div>

          {/* Name in uppercase & handle */}
          <div className="space-y-1">
            <h1 className="text-2xl font-black uppercase tracking-tight text-[#0F172A]">
              {profile.name || profile.username}
            </h1>
            <p className="text-sm font-bold text-neutral-500">
              @{profile.username}
            </p>
          </div>

          {/* Location badge with MapPin */}
          {profile.location && (
            <div className="mt-3 flex items-center gap-1.5 text-xs font-bold text-neutral-700 bg-neutral-100 px-3 py-1.5 rounded-lg border border-neutral-300 w-fit">
              <MapPin className="w-4 h-4 text-[#2563EB] shrink-0" />
              <span>{profile.location}</span>
            </div>
          )}

          {/* Bio text */}
          {profile.bio && (
            <p className="mt-4 text-sm text-neutral-700 leading-relaxed font-medium">
              {profile.bio}
            </p>
          )}

          {/* Company & Member since */}
          <div className="mt-4 space-y-1.5 text-xs text-neutral-600 font-semibold border-t border-neutral-100 pt-3">
            {profile.company && (
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-black shrink-0" />
                <span className="truncate">{profile.company}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-black shrink-0" />
              <span>Joined GitHub in {formattedDate}</span>
            </div>
          </div>

          {/* Followers / Following / Repos 3-column metric cards */}
          <div className="grid grid-cols-3 gap-2 mt-6">
            <div className="bg-[#F8FAFC] p-3 rounded-xl border border-neutral-200 text-center">
              <span className="block text-lg font-black text-black">
                {profile.followers}
              </span>
              <span className="text-[10px] uppercase font-bold text-neutral-500">
                Followers
              </span>
            </div>

            <div className="bg-[#F8FAFC] p-3 rounded-xl border border-neutral-200 text-center">
              <span className="block text-lg font-black text-black">
                {profile.following}
              </span>
              <span className="text-[10px] uppercase font-bold text-neutral-500">
                Following
              </span>
            </div>

            <div className="bg-[#F8FAFC] p-3 rounded-xl border border-neutral-200 text-center">
              <span className="block text-lg font-black text-black">
                {profile.public_repos}
              </span>
              <span className="text-[10px] uppercase font-bold text-neutral-500">
                Repos
              </span>
            </div>
          </div>

          {/* Download Resume Button: Links to /api/resume?username=${username} */}
          <div className="mt-6 space-y-2.5">
            <a
              href={`/api/resume?username=${profile.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="neo-btn-primary w-full py-3.5 text-sm"
            >
              <FileDown className="w-5 h-5 text-white" />
              <span>Download Dynamic Resume</span>
            </a>

            <button
              onClick={handleShare}
              className="neo-btn-secondary w-full py-3 text-sm"
            >
              <Share2 className="w-4 h-4 text-black" />
              <span>Share Portfolio</span>
            </button>
          </div>

          {/* Connect with me social link pills */}
          <div className="mt-6 pt-5 border-t border-neutral-200">
            <h4 className="text-xs font-black uppercase tracking-wider text-neutral-500 mb-3">
              Connect With Me
            </h4>
            <div className="flex flex-wrap gap-2">
              <a
                href={`https://github.com/${profile.username}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-300 hover:border-black bg-white text-xs font-bold text-[#0F172A] hover:bg-[#DBEAFE] transition-colors"
              >
                <Github className="w-3.5 h-3.5 text-black" />
                <span>GitHub</span>
              </a>

              {profile.twitter_username && (
                <a
                  href={`https://twitter.com/${profile.twitter_username}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-300 hover:border-black bg-white text-xs font-bold text-[#0F172A] hover:bg-[#DBEAFE] transition-colors"
                >
                  <Twitter className="w-3.5 h-3.5 text-black" />
                  <span>Twitter / X</span>
                </a>
              )}

              {profile.blog && (
                <a
                  href={profile.blog.startsWith("http") ? profile.blog : `https://${profile.blog}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-300 hover:border-black bg-white text-xs font-bold text-[#0F172A] hover:bg-[#DBEAFE] transition-colors"
                >
                  <Globe className="w-3.5 h-3.5 text-black" />
                  <span>Website</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
