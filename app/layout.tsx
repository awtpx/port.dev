import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { UsernameModal } from "@/components/UsernameModal";
import { SupportModal } from "@/components/SupportModal";
import { Toast } from "@/components/Toast";

// Self-hosted DM Sans font from /public/fonts
const dmSans = localFont({
  src: [
    {
      path: "../public/fonts/DMSans.ttf",
      style: "normal",
    },
    {
      path: "../public/fonts/DMSans-Italic.ttf",
      style: "italic",
    },
  ],
  variable: "--font-dm-sans",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2563EB",
};

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://port.awtpx.in";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "port — Automated Developer Portfolios & Dynamic AI Resumes",
    template: "%s | port",
  },
  description:
    "Generate an automated developer portfolio, repository showcase, and dynamic recruiter-ready resume powered by GitHub and AI. 100% pure Next.js.",
  keywords: [
    "port",
    "port.dev",
    "developer portfolio",
    "github resume",
    "ai resume generator",
    "software engineer portfolio",
    "github contribution graph",
  ],
  authors: [{ name: "port" }],
  creator: "port",
  publisher: "port",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "port",
    title: "port — Automated Developer Portfolios & Dynamic AI Resumes",
    description:
      "Turn your GitHub repositories and contributions into a high-converting developer portfolio and dynamic ATS-friendly resume.",
  },
  twitter: {
    card: "summary_large_image",
    title: "port — Automated Developer Portfolios & Dynamic AI Resumes",
    description:
      "Turn your GitHub repositories and contributions into a high-converting developer portfolio and dynamic ATS-friendly resume.",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "port",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Automated developer portfolio and dynamic resume generator powered by GitHub and AI.",
  };

  return (
    <html lang="en" className={dmSans.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased selection:bg-[#2563EB] selection:text-white">
        {children}
        <UsernameModal />
        <SupportModal />
        <Toast />
      </body>
    </html>
  );
}
