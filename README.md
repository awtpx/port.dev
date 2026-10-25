# port — Automated Developer Portfolios & Dynamic AI Resumes

An automated developer portfolio and dynamic resume generator powered by GitHub and AI, built as a **100% pure Next.js 15 App Router** application. Zero external backend servers (no Python, FastAPI, Express, Docker, or Redis).

---

## ⚡ Features & Updates

* **100% Pure Next.js 15:** Uses React 19 Server Components (RSC), Next.js built-in data caching (`next: { revalidate: 3600 }`), and Route Handlers.
* **Modern Neo-Brutalist Blue Theme:**
  * High-contrast black borders (`border-2 border-black border-b-[5px]`).
  * Electric Royal Blue (`#2563EB`) & Ice Blue (`#DBEAFE`) accents.
  * Tactile button feedback (`active:translate-y-0.5 active:border-b-2`).
  * **Strict Icon Standard:** 100% Lucide SVG icons (zero raw emojis on UI).
* **Live GitHub Contribution Graph:**
  * Real-time contribution chart calendar synced from GitHub activity.
  * Heatmap, streak data, merged pull requests, and closed issues.
* **All Public Repositories:**
  * Ingests all available public repositories from the user's GitHub profile.
  * Interactive repository search, language filter tags, and multi-criteria sorting (highest ranked, most stars, most forks, recently updated).
* **AI Executive Bio & SEO:**
  * Powered by `groq-sdk` with `llama-3.3-70b-versatile` & `llama-3.1-8b-instant`.
  * Automatic schema.org JSON-LD structured data (`WebSite`, `Person`).
  * Dynamic `sitemap.xml` and `robots.txt` generation.
* **Dynamic ATS PDF Resume:**
  * Generated on-the-fly via `@react-pdf/renderer` directly in Next.js Route Handlers (`/api/resume?username=...`).
* **Self-Hosted Typography:** `DM Sans` embedded locally via `next/font/local` in `/public/fonts` without external Google Fonts CDN network calls.

---

## 🛠️ Tech Stack

* **Framework:** Next.js 15 (App Router, Turbopack, TypeScript)
* **Styling:** Tailwind CSS with Neo-Brutalist design tokens
* **Icons:** `lucide-react`
* **Animations:** `framer-motion`
* **Font:** Self-hosted `DM Sans` (`next/font/local`)
* **AI Engine:** `groq-sdk` (`llama-3.3-70b-versatile`)
* **PDF Engine:** `@react-pdf/renderer`
* **State Management:** `zustand`

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment (`.env.local`)
```env
# Optional: Higher rate limits for GitHub API (60 req/hr unauth vs 5,000 req/hr auth)
GITHUB_TOKEN=your_github_personal_access_token_here

# Optional: Groq API key for Llama 3.3 AI bio generation (fallback generator activates if omitted)
GROQ_API_KEY=your_groq_api_key_here

# Base URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 3. Run Development Server
```bash
npm run dev
```

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## 📄 License
MIT License. Open-source developer tooling.
