import React from "react";
import type { Metadata } from "next";
import {
  getGitHubUser,
  getRankedProjects,
  getTopLanguages,
} from "@/lib/github";
import { generateAIBio, generateSEO } from "@/lib/ai";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PortfolioSidebar } from "@/components/PortfolioSidebar";
import { PortfolioContent } from "@/components/PortfolioContent";
import { FloatingSupportButton } from "@/components/SupportModal";
import Link from "next/link";
import { ArrowLeft, UserX } from "lucide-react";

interface PageProps {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { username } = await params;
  const profile = await getGitHubUser(username);

  if (!profile) {
    return {
      title: "Developer Not Found | port",
      description: "Could not find a developer profile matching this username on port.",
    };
  }

  const seo = await generateSEO(profile);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://port.dev";
  const title = `${profile.name || profile.username} (@${profile.username}) — Developer Portfolio | port`;
  const description =
    profile.bio ||
    `Explore ${profile.name || profile.username}'s GitHub repositories, contribution history, and verified developer metrics on port.`;

  return {
    title,
    description: seo.description || description,
    keywords: `${profile.username}, developer portfolio, open source, port, github resume, ${profile.location || "software engineer"}`,
    alternates: {
      canonical: `${baseUrl}/${username}`,
    },
    openGraph: {
      title,
      description: seo.description || description,
      url: `${baseUrl}/${username}`,
      siteName: "port",
      type: "profile",
      images: [
        {
          url: profile.avatar_url,
          width: 400,
          height: 400,
          alt: profile.name || profile.username,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: seo.description || description,
      images: [profile.avatar_url],
    },
  };
}

export default async function PortfolioPage({ params }: PageProps) {
  const { username } = await params;

  // Validate format
  if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
        <Navbar />
        <main className="flex-1 max-w-xl mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-neutral-100 border-2 border-black flex items-center justify-center mb-4">
            <UserX className="w-8 h-8 text-black" />
          </div>
          <h1 className="text-3xl font-black text-[#0F172A]">Invalid Username Format</h1>
          <p className="mt-2 text-sm text-neutral-600">
            GitHub usernames can only contain alphanumeric characters, underscores, and hyphens.
          </p>
          <Link href="/" className="neo-btn-primary mt-6 text-sm">
            <ArrowLeft className="w-4 h-4 text-white" />
            <span>Return to Homepage</span>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const profile = await getGitHubUser(username);

  if (!profile) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
        <Navbar />
        <main className="flex-1 max-w-xl mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-neutral-100 border-2 border-black flex items-center justify-center mb-4">
            <UserX className="w-8 h-8 text-black" />
          </div>
          <h1 className="text-3xl font-black text-[#0F172A]">Developer Not Found</h1>
          <p className="mt-2 text-sm text-neutral-600">
            We could not find a GitHub profile for &quot;@{username}&quot;. Check the spelling or search another user.
          </p>
          <Link href="/" className="neo-btn-primary mt-6 text-sm">
            <ArrowLeft className="w-4 h-4 text-white" />
            <span>Search Another Developer</span>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  // Fetch all ranked projects for the user
  const projects = await getRankedProjects(username);
  const topLanguages = getTopLanguages(projects);
  const aiBio = await generateAIBio(profile, projects);

  // SEO Schema.org Person Structured Data
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name || profile.username,
    alternateName: profile.username,
    description: profile.bio || aiBio,
    image: profile.avatar_url,
    url: `https://github.com/${profile.username}`,
    sameAs: [
      `https://github.com/${profile.username}`,
      profile.twitter_username ? `https://twitter.com/${profile.twitter_username}` : null,
      profile.blog ? profile.blog : null,
    ].filter(Boolean),
    worksFor: profile.company ? { "@type": "Organization", name: profile.company } : undefined,
    homeLocation: profile.location ? { "@type": "Place", name: profile.location } : undefined,
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* Responsive two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-8 items-start">
          {/* Left Column: Sticky Sidebar */}
          <PortfolioSidebar profile={profile} />

          {/* Right Column: Content Stream */}
          <PortfolioContent
            profile={profile}
            projects={projects}
            topLanguages={topLanguages}
            aiBio={aiBio}
          />
        </div>
      </main>

      <Footer />
      <FloatingSupportButton />
    </div>
  );
}
