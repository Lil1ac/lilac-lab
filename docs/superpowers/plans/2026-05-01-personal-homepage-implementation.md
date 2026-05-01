# Personal Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the first deployable version of a dark sci-fi dashboard personal homepage with Projects, Blog, About, and a prominent Galgame Library backed by local records plus Bangumi metadata.

**Architecture:** Use Next.js App Router with static-first content. Local TypeScript data drives projects, posts, and Galgame records; `lib` modules aggregate, filter, and enrich data; page components render responsive dashboard-style views with graceful fallback when Bangumi is unavailable.

**Tech Stack:** Next.js, TypeScript, Tailwind CSS, Framer Motion, MDX-ready content structure, Jest-style pure function tests via Vitest.

---

## File Structure

- Create `package.json`: project scripts and dependencies.
- Create `tsconfig.json`: strict TypeScript config.
- Create `next.config.mjs`: Next.js config, including remote image allowance for Bangumi covers.
- Create `postcss.config.mjs`: Tailwind PostCSS config.
- Create `tailwind.config.ts`: theme tokens for the dark sci-fi visual system.
- Create `vitest.config.ts`: unit test config for data and library functions.
- Create `src/app/layout.tsx`: root HTML layout, metadata, global shell.
- Create `src/app/page.tsx`: homepage dashboard.
- Create `src/app/projects/page.tsx`: project listing page.
- Create `src/app/blog/page.tsx`: blog listing page.
- Create `src/app/about/page.tsx`: about page.
- Create `src/app/library/page.tsx`: Galgame Library listing page.
- Create `src/app/library/[slug]/page.tsx`: Galgame detail page.
- Create `src/app/not-found.tsx`: fallback page.
- Create `src/app/globals.css`: global styles, grid background, base typography.
- Create `src/components/site/SiteHeader.tsx`: top navigation.
- Create `src/components/site/SiteFooter.tsx`: footer links.
- Create `src/components/site/PageShell.tsx`: shared page container.
- Create `src/components/home/DashboardHero.tsx`: homepage dashboard composition.
- Create `src/components/home/ProfileConsole.tsx`: identity/status panel.
- Create `src/components/home/SignalMetrics.tsx`: metrics panel.
- Create `src/components/home/ActivityFeed.tsx`: recent activity panel.
- Create `src/components/home/LibrarySnapshot.tsx`: homepage Galgame feature panel.
- Create `src/components/cards/ProjectCard.tsx`: project preview card.
- Create `src/components/cards/PostCard.tsx`: blog preview card.
- Create `src/components/library/LibraryFilters.tsx`: client-side filter controls.
- Create `src/components/library/LibraryGrid.tsx`: client-side filtered Galgame grid.
- Create `src/components/library/GalgameCard.tsx`: Galgame cover card.
- Create `src/components/library/GalgameDetail.tsx`: detail page content.
- Create `src/data/profile.ts`: personal profile placeholder data owned by the user.
- Create `src/data/projects.ts`: project sample data.
- Create `src/data/posts.ts`: blog sample data.
- Create `src/data/galgames.ts`: local Galgame records.
- Create `src/lib/content.ts`: content aggregation and homepage metric functions.
- Create `src/lib/library.ts`: Galgame filtering, sorting, and detail lookup.
- Create `src/lib/bangumi.ts`: Bangumi API client and fallback metadata.
- Create `src/lib/types.ts`: shared TypeScript types.
- Create `src/lib/__tests__/library.test.ts`: unit tests for filtering/sorting/detail lookup.
- Create `src/lib/__tests__/content.test.ts`: unit tests for metrics and recent activity.

## Task 1: Scaffold Next.js Project

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.mjs`
- Create: `postcss.config.mjs`
- Create: `tailwind.config.ts`
- Create: `vitest.config.ts`
- Create: `src/app/globals.css`
- Create: `src/app/layout.tsx`

- [ ] **Step 1: Create package metadata and scripts**

Create `package.json` with:

```json
{
  "name": "lilac-lab",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "@next/mdx": "^15.3.0",
    "framer-motion": "^12.0.0",
    "lucide-react": "^0.468.0",
    "next": "^15.3.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@testing-library/react": "^16.0.0",
    "@types/node": "^22.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "autoprefixer": "^10.4.20",
    "eslint": "^9.0.0",
    "eslint-config-next": "^15.3.0",
    "jsdom": "^25.0.0",
    "postcss": "^8.4.49",
    "tailwindcss": "^3.4.17",
    "typescript": "^5.7.0",
    "vitest": "^2.1.0"
  }
}
```

- [ ] **Step 2: Add TypeScript config**

Create `tsconfig.json` with:

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },
    "plugins": [
      {
        "name": "next"
      }
    ]
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 3: Add framework configuration**

Create `next.config.mjs` with:

```js
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lain.bgm.tv"
      }
    ]
  }
};

export default nextConfig;
```

Create `postcss.config.mjs` with:

```js
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {}
  }
};

export default config;
```

Create `tailwind.config.ts` with:

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        panel: "rgba(8, 14, 28, 0.76)",
        line: "rgba(125, 211, 252, 0.22)",
        cyanSignal: "#67e8f9",
        violetSignal: "#a78bfa",
        ink: "#dbeafe"
      },
      boxShadow: {
        panel: "0 0 0 1px rgba(125, 211, 252, 0.18), 0 24px 80px rgba(0, 0, 0, 0.35)",
        signal: "0 0 28px rgba(103, 232, 249, 0.22)"
      }
    }
  },
  plugins: []
};

export default config;
```

- [ ] **Step 4: Add test configuration**

Create `vitest.config.ts` with:

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    include: ["src/**/*.test.ts", "src/**/*.test.tsx"]
  },
  resolve: {
    alias: {
      "@": "/src"
    }
  }
});
```

- [ ] **Step 5: Add global styles**

Create `src/app/globals.css` with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  color-scheme: dark;
  background: #050814;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-height: 100vh;
  background:
    linear-gradient(rgba(103, 232, 249, 0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(103, 232, 249, 0.05) 1px, transparent 1px),
    radial-gradient(circle at 18% 12%, rgba(103, 232, 249, 0.14), transparent 28rem),
    radial-gradient(circle at 85% 18%, rgba(167, 139, 250, 0.14), transparent 30rem),
    #050814;
  background-size: 48px 48px, 48px 48px, auto, auto, auto;
  color: #dbeafe;
  font-family: Arial, "Microsoft YaHei", sans-serif;
}

a {
  color: inherit;
  text-decoration: none;
}

::selection {
  background: rgba(103, 232, 249, 0.28);
}

.panel {
  border: 1px solid rgba(125, 211, 252, 0.2);
  background: rgba(8, 14, 28, 0.74);
  box-shadow: 0 0 0 1px rgba(125, 211, 252, 0.08), 0 24px 80px rgba(0, 0, 0, 0.32);
  backdrop-filter: blur(18px);
}
```

- [ ] **Step 6: Add root layout**

Create `src/app/layout.tsx` with:

```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lilac Lab",
  description: "个人主页、项目、博客与 Galgame Library。"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 7: Install dependencies**

Run:

```bash
npm install
```

Expected: `node_modules` and `package-lock.json` are created, and npm exits with code 0.

- [ ] **Step 8: Verify scaffold builds far enough**

Run:

```bash
npm run build
```

Expected: build fails only if no root page exists yet, with a Next.js route-related error. If dependency or TypeScript config errors appear, fix them before continuing.

- [ ] **Step 9: Commit scaffold**

Run:

```bash
git add package.json package-lock.json tsconfig.json next.config.mjs postcss.config.mjs tailwind.config.ts vitest.config.ts src/app/globals.css src/app/layout.tsx
git commit -m "chore: scaffold next app"
```

Expected: commit succeeds.

## Task 2: Add Typed Local Content and Tests

**Files:**
- Create: `src/lib/types.ts`
- Create: `src/data/profile.ts`
- Create: `src/data/projects.ts`
- Create: `src/data/posts.ts`
- Create: `src/data/galgames.ts`
- Create: `src/lib/library.ts`
- Create: `src/lib/content.ts`
- Create: `src/lib/__tests__/library.test.ts`
- Create: `src/lib/__tests__/content.test.ts`

- [ ] **Step 1: Define shared types**

Create `src/lib/types.ts` with:

```ts
export type Project = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  featured: boolean;
  updatedAt: string;
  href: string;
};

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  tags: string[];
};

export type GalgameStatus = "wishlist" | "playing" | "completed" | "paused";

export type GalgameRecord = {
  slug: string;
  bangumiSubjectId: number;
  title: string;
  status: GalgameStatus;
  startDate: string;
  finishDate?: string;
  playHours: number;
  personalRating: number;
  tags: string[];
  platform: string;
  note: string;
  updatedAt: string;
};

export type BangumiSubject = {
  id: number;
  name: string;
  nameCn: string;
  summary: string;
  image: string;
  score?: number;
  rank?: number;
  url: string;
};

export type LibraryFilters = {
  status?: GalgameStatus | "all";
  tag?: string;
  minRating?: number;
  year?: number;
  sort?: "updatedAt" | "personalRating" | "playHours";
};
```

- [ ] **Step 2: Add profile data**

Create `src/data/profile.ts` with:

```ts
export const profile = {
  name: "Lilac",
  handle: "Lilac Lab",
  status: "Building personal systems",
  location: "China",
  directions: ["Frontend", "Full-stack", "Personal Knowledge Systems"],
  links: [
    { label: "GitHub", href: "https://github.com/Lil1ac" },
    { label: "Library", href: "/library" },
    { label: "Blog", href: "/blog" }
  ]
};
```

- [ ] **Step 3: Add sample project and post data**

Create `src/data/projects.ts` with:

```ts
import type { Project } from "@/lib/types";

export const projects: Project[] = [
  {
    slug: "lilac-lab",
    title: "Lilac Lab",
    description: "深色科幻数据面板风个人主页，整合项目、博客与 Galgame Library。",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    featured: true,
    updatedAt: "2026-05-01",
    href: "https://github.com/Lil1ac/lilac-lab"
  }
];
```

Create `src/data/posts.ts` with:

```ts
import type { Post } from "@/lib/types";

export const posts: Post[] = [
  {
    slug: "homepage-design-log",
    title: "个人主页设计记录",
    excerpt: "记录 Lilac Lab 从个人主页扩展为个人数字档案面板的设计过程。",
    publishedAt: "2026-05-01",
    tags: ["Design", "Homepage"]
  }
];
```

- [ ] **Step 4: Add Galgame records**

Create `src/data/galgames.ts` with:

```ts
import type { GalgameRecord } from "@/lib/types";

export const galgames: GalgameRecord[] = [
  {
    slug: "summer-pockets",
    bangumiSubjectId: 253997,
    title: "Summer Pockets",
    status: "completed",
    startDate: "2025-07-01",
    finishDate: "2025-08-10",
    playHours: 65,
    personalRating: 9,
    tags: ["Key", "夏", "泣きゲー"],
    platform: "Steam",
    note: "夏日、岛屿和记忆感很强的一作。",
    updatedAt: "2025-08-10"
  },
  {
    slug: "white-album-2",
    bangumiSubjectId: 993,
    title: "WHITE ALBUM2",
    status: "playing",
    startDate: "2026-04-12",
    playHours: 18,
    personalRating: 10,
    tags: ["Leaf", "Drama", "Music"],
    platform: "PC",
    note: "正在推进中，情绪密度很高。",
    updatedAt: "2026-04-28"
  }
];
```

- [ ] **Step 5: Write failing library tests**

Create `src/lib/__tests__/library.test.ts` with:

```ts
import { describe, expect, it } from "vitest";
import { getGalgameBySlug, getLibraryTags, getLibraryYears, getSortedAndFilteredLibrary } from "../library";
import type { GalgameRecord } from "../types";

const records: GalgameRecord[] = [
  {
    slug: "a",
    bangumiSubjectId: 1,
    title: "A",
    status: "completed",
    startDate: "2024-01-01",
    finishDate: "2024-02-01",
    playHours: 40,
    personalRating: 9,
    tags: ["Key", "夏"],
    platform: "PC",
    note: "A note",
    updatedAt: "2024-02-01"
  },
  {
    slug: "b",
    bangumiSubjectId: 2,
    title: "B",
    status: "playing",
    startDate: "2026-03-01",
    playHours: 12,
    personalRating: 8,
    tags: ["Music"],
    platform: "Steam",
    note: "B note",
    updatedAt: "2026-03-10"
  }
];

describe("library helpers", () => {
  it("filters by status and sorts by rating", () => {
    const result = getSortedAndFilteredLibrary(records, {
      status: "completed",
      sort: "personalRating"
    });

    expect(result.map((item) => item.slug)).toEqual(["a"]);
  });

  it("filters by min rating and year", () => {
    const result = getSortedAndFilteredLibrary(records, {
      minRating: 9,
      year: 2024
    });

    expect(result.map((item) => item.slug)).toEqual(["a"]);
  });

  it("returns unique tags and years", () => {
    expect(getLibraryTags(records)).toEqual(["Key", "Music", "夏"]);
    expect(getLibraryYears(records)).toEqual([2026, 2024]);
  });

  it("finds record by slug", () => {
    expect(getGalgameBySlug(records, "b")?.title).toBe("B");
    expect(getGalgameBySlug(records, "missing")).toBeUndefined();
  });
});
```

- [ ] **Step 6: Run failing library tests**

Run:

```bash
npm run test -- src/lib/__tests__/library.test.ts
```

Expected: FAIL because `src/lib/library.ts` does not exist.

- [ ] **Step 7: Implement library helpers**

Create `src/lib/library.ts` with:

```ts
import type { GalgameRecord, LibraryFilters } from "./types";

export function getSortedAndFilteredLibrary(records: GalgameRecord[], filters: LibraryFilters = {}) {
  const status = filters.status ?? "all";
  const sort = filters.sort ?? "updatedAt";

  return records
    .filter((record) => status === "all" || record.status === status)
    .filter((record) => !filters.tag || record.tags.includes(filters.tag))
    .filter((record) => !filters.minRating || record.personalRating >= filters.minRating)
    .filter((record) => !filters.year || new Date(record.startDate).getFullYear() === filters.year)
    .toSorted((left, right) => {
      if (sort === "personalRating") {
        return right.personalRating - left.personalRating;
      }

      if (sort === "playHours") {
        return right.playHours - left.playHours;
      }

      return new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime();
    });
}

export function getLibraryTags(records: GalgameRecord[]) {
  return Array.from(new Set(records.flatMap((record) => record.tags))).sort((left, right) =>
    left.localeCompare(right, "zh-CN")
  );
}

export function getLibraryYears(records: GalgameRecord[]) {
  return Array.from(new Set(records.map((record) => new Date(record.startDate).getFullYear()))).sort(
    (left, right) => right - left
  );
}

export function getGalgameBySlug(records: GalgameRecord[], slug: string) {
  return records.find((record) => record.slug === slug);
}
```

- [ ] **Step 8: Write content aggregation tests**

Create `src/lib/__tests__/content.test.ts` with:

```ts
import { describe, expect, it } from "vitest";
import { buildActivityFeed, buildMetrics } from "../content";
import type { GalgameRecord, Post, Project } from "../types";

const projects: Project[] = [
  {
    slug: "project",
    title: "Project",
    description: "Project description",
    tags: ["Next.js"],
    featured: true,
    updatedAt: "2026-04-20",
    href: "/projects"
  }
];

const posts: Post[] = [
  {
    slug: "post",
    title: "Post",
    excerpt: "Post excerpt",
    publishedAt: "2026-04-25",
    tags: ["Design"]
  }
];

const galgames: GalgameRecord[] = [
  {
    slug: "game",
    bangumiSubjectId: 1,
    title: "Game",
    status: "completed",
    startDate: "2026-01-01",
    finishDate: "2026-02-01",
    playHours: 30,
    personalRating: 9,
    tags: ["Drama"],
    platform: "PC",
    note: "Note",
    updatedAt: "2026-04-28"
  }
];

describe("content helpers", () => {
  it("builds homepage metrics", () => {
    expect(buildMetrics({ projects, posts, galgames })).toEqual({
      projects: 1,
      posts: 1,
      galgames: 1,
      completedGalgames: 1,
      playHours: 30
    });
  });

  it("builds recent activity feed", () => {
    expect(buildActivityFeed({ projects, posts, galgames }).map((item) => item.label)).toEqual([
      "Game",
      "Post",
      "Project"
    ]);
  });
});
```

- [ ] **Step 9: Implement content helpers**

Create `src/lib/content.ts` with:

```ts
import type { GalgameRecord, Post, Project } from "./types";

type ContentInput = {
  projects: Project[];
  posts: Post[];
  galgames: GalgameRecord[];
};

export function buildMetrics({ projects, posts, galgames }: ContentInput) {
  return {
    projects: projects.length,
    posts: posts.length,
    galgames: galgames.length,
    completedGalgames: galgames.filter((game) => game.status === "completed").length,
    playHours: galgames.reduce((sum, game) => sum + game.playHours, 0)
  };
}

export function buildActivityFeed({ projects, posts, galgames }: ContentInput) {
  return [
    ...projects.map((project) => ({
      type: "project" as const,
      label: project.title,
      href: project.href,
      date: project.updatedAt
    })),
    ...posts.map((post) => ({
      type: "post" as const,
      label: post.title,
      href: `/blog/${post.slug}`,
      date: post.publishedAt
    })),
    ...galgames.map((game) => ({
      type: "galgame" as const,
      label: game.title,
      href: `/library/${game.slug}`,
      date: game.updatedAt
    }))
  ]
    .toSorted((left, right) => new Date(right.date).getTime() - new Date(left.date).getTime())
    .slice(0, 6);
}
```

- [ ] **Step 10: Run tests**

Run:

```bash
npm run test
```

Expected: PASS for `library.test.ts` and `content.test.ts`.

- [ ] **Step 11: Commit content layer**

Run:

```bash
git add src/lib src/data
git commit -m "feat: add typed content model"
```

Expected: commit succeeds.

## Task 3: Build Shared Site Shell

**Files:**
- Create: `src/components/site/SiteHeader.tsx`
- Create: `src/components/site/SiteFooter.tsx`
- Create: `src/components/site/PageShell.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Add site header**

Create `src/components/site/SiteHeader.tsx` with:

```tsx
import Link from "next/link";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Library", href: "/library" },
  { label: "About", href: "/about" }
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-cyan-200/10 bg-[#050814]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="font-semibold tracking-[0.18em] text-cyan-100">
          LILAC LAB
        </Link>
        <nav className="flex gap-1 overflow-x-auto text-sm text-slate-300">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 transition hover:bg-cyan-300/10 hover:text-cyan-100"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Add footer and shell**

Create `src/components/site/SiteFooter.tsx` with:

```tsx
export function SiteFooter() {
  return (
    <footer className="border-t border-cyan-200/10 py-8 text-sm text-slate-400">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 sm:px-6 lg:px-8">
        <span>Lilac Lab</span>
        <span>个人主页、项目、博客与 Galgame Library。</span>
      </div>
    </footer>
  );
}
```

Create `src/components/site/PageShell.tsx` with:

```tsx
export function PageShell({
  title,
  description,
  children
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 max-w-3xl">
        <p className="mb-3 text-sm uppercase tracking-[0.2em] text-cyan-200/70">Lilac Lab</p>
        <h1 className="text-3xl font-semibold text-cyan-50 sm:text-5xl">{title}</h1>
        <p className="mt-4 text-base leading-7 text-slate-300">{description}</p>
      </div>
      {children}
    </main>
  );
}
```

- [ ] **Step 3: Wire shell into root layout**

Modify `src/app/layout.tsx` to:

```tsx
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lilac Lab",
  description: "个人主页、项目、博客与 Galgame Library。"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
```

- [ ] **Step 4: Run type check through build**

Run:

```bash
npm run build
```

Expected: build still fails only because route pages have not been created. Imports and layout should type-check.

- [ ] **Step 5: Commit site shell**

Run:

```bash
git add src/components/site src/app/layout.tsx
git commit -m "feat: add site shell"
```

Expected: commit succeeds.

## Task 4: Build Homepage Dashboard

**Files:**
- Create: `src/app/page.tsx`
- Create: `src/components/home/DashboardHero.tsx`
- Create: `src/components/home/ProfileConsole.tsx`
- Create: `src/components/home/SignalMetrics.tsx`
- Create: `src/components/home/ActivityFeed.tsx`
- Create: `src/components/home/LibrarySnapshot.tsx`
- Create: `src/components/cards/ProjectCard.tsx`
- Create: `src/components/cards/PostCard.tsx`

- [ ] **Step 1: Add reusable cards**

Create `src/components/cards/ProjectCard.tsx` with:

```tsx
import type { Project } from "@/lib/types";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <a href={project.href} className="panel block rounded-lg p-5 transition hover:border-cyan-200/45">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-semibold text-cyan-50">{project.title}</h3>
        <span className="text-xs text-cyan-200/70">{project.updatedAt}</span>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-300">{project.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span key={tag} className="rounded border border-cyan-200/15 px-2 py-1 text-xs text-cyan-100/80">
            {tag}
          </span>
        ))}
      </div>
    </a>
  );
}
```

Create `src/components/cards/PostCard.tsx` with:

```tsx
import Link from "next/link";
import type { Post } from "@/lib/types";

export function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="panel block rounded-lg p-5 transition hover:border-violet-200/45">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-semibold text-cyan-50">{post.title}</h3>
        <span className="text-xs text-violet-200/70">{post.publishedAt}</span>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-300">{post.excerpt}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <span key={tag} className="rounded border border-violet-200/15 px-2 py-1 text-xs text-violet-100/80">
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
```

- [ ] **Step 2: Add dashboard panels**

Create `src/components/home/ProfileConsole.tsx` with:

```tsx
import Link from "next/link";
import { profile } from "@/data/profile";

export function ProfileConsole() {
  return (
    <section className="panel rounded-lg p-6">
      <p className="text-xs uppercase tracking-[0.22em] text-cyan-200/70">Profile Console</p>
      <h1 className="mt-4 text-4xl font-semibold text-cyan-50 sm:text-5xl">{profile.handle}</h1>
      <p className="mt-4 text-slate-300">{profile.status}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {profile.directions.map((direction) => (
          <span key={direction} className="rounded border border-cyan-200/15 px-3 py-1 text-sm text-cyan-100">
            {direction}
          </span>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        {profile.links.map((link) => (
          <Link key={link.href} href={link.href} className="rounded-md bg-cyan-300/10 px-4 py-2 text-sm text-cyan-100">
            {link.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
```

Create `src/components/home/SignalMetrics.tsx` with:

```tsx
import { buildMetrics } from "@/lib/content";
import { galgames } from "@/data/galgames";
import { posts } from "@/data/posts";
import { projects } from "@/data/projects";

const labels = {
  projects: "Projects",
  posts: "Posts",
  galgames: "Galgame",
  completedGalgames: "Completed",
  playHours: "Play Hours"
};

export function SignalMetrics() {
  const metrics = buildMetrics({ projects, posts, galgames });

  return (
    <section className="grid grid-cols-2 gap-3 sm:grid-cols-5 lg:grid-cols-1">
      {Object.entries(metrics).map(([key, value]) => (
        <div key={key} className="panel rounded-lg p-4">
          <div className="text-2xl font-semibold text-cyan-50">{value}</div>
          <div className="mt-1 text-xs uppercase tracking-[0.16em] text-cyan-200/60">
            {labels[key as keyof typeof labels]}
          </div>
        </div>
      ))}
    </section>
  );
}
```

Create `src/components/home/ActivityFeed.tsx` with:

```tsx
import Link from "next/link";
import { galgames } from "@/data/galgames";
import { posts } from "@/data/posts";
import { projects } from "@/data/projects";
import { buildActivityFeed } from "@/lib/content";

export function ActivityFeed() {
  const activities = buildActivityFeed({ projects, posts, galgames });

  return (
    <section className="panel rounded-lg p-5">
      <h2 className="text-sm uppercase tracking-[0.2em] text-cyan-200/70">Activity Feed</h2>
      <div className="mt-5 space-y-4">
        {activities.map((activity) => (
          <Link key={`${activity.type}-${activity.href}`} href={activity.href} className="block border-l border-cyan-200/20 pl-4">
            <div className="text-sm text-cyan-50">{activity.label}</div>
            <div className="mt-1 text-xs text-slate-400">
              {activity.type} · {activity.date}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
```

Create `src/components/home/LibrarySnapshot.tsx` with:

```tsx
import Link from "next/link";
import { galgames } from "@/data/galgames";

export function LibrarySnapshot() {
  const featured = galgames.toSorted((left, right) => right.personalRating - left.personalRating).slice(0, 4);

  return (
    <section className="panel rounded-lg p-5">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-sm uppercase tracking-[0.2em] text-violet-200/80">Galgame Library</h2>
        <Link href="/library" className="text-sm text-cyan-100">
          View all
        </Link>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3">
        {featured.map((game) => (
          <Link key={game.slug} href={`/library/${game.slug}`} className="rounded-md border border-violet-200/15 bg-violet-300/5 p-3">
            <div className="text-sm font-medium text-cyan-50">{game.title}</div>
            <div className="mt-2 text-xs text-slate-400">{game.personalRating}/10 · {game.playHours}h</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Compose dashboard hero and homepage**

Create `src/components/home/DashboardHero.tsx` with:

```tsx
import { ActivityFeed } from "./ActivityFeed";
import { LibrarySnapshot } from "./LibrarySnapshot";
import { ProfileConsole } from "./ProfileConsole";
import { SignalMetrics } from "./SignalMetrics";

export function DashboardHero() {
  return (
    <section className="grid gap-4 lg:grid-cols-[1.2fr_1fr_0.7fr]">
      <ProfileConsole />
      <div className="grid gap-4">
        <ActivityFeed />
        <LibrarySnapshot />
      </div>
      <SignalMetrics />
    </section>
  );
}
```

Create `src/app/page.tsx` with:

```tsx
import { PostCard } from "@/components/cards/PostCard";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { DashboardHero } from "@/components/home/DashboardHero";
import { posts } from "@/data/posts";
import { projects } from "@/data/projects";

export default function HomePage() {
  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <DashboardHero />
      <section className="mt-10 grid gap-4 lg:grid-cols-2">
        {projects.filter((project) => project.featured).map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
        {posts.slice(0, 2).map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </section>
    </main>
  );
}
```

- [ ] **Step 4: Build homepage**

Run:

```bash
npm run build
```

Expected: build still fails because secondary routes are missing, but homepage imports should type-check.

- [ ] **Step 5: Commit homepage dashboard**

Run:

```bash
git add src/app/page.tsx src/components/home src/components/cards
git commit -m "feat: add dashboard homepage"
```

Expected: commit succeeds.

## Task 5: Build Static Projects, Blog, and About Pages

**Files:**
- Create: `src/app/projects/page.tsx`
- Create: `src/app/blog/page.tsx`
- Create: `src/app/about/page.tsx`

- [ ] **Step 1: Add projects page**

Create `src/app/projects/page.tsx` with:

```tsx
import { ProjectCard } from "@/components/cards/ProjectCard";
import { PageShell } from "@/components/site/PageShell";
import { projects } from "@/data/projects";

export default function ProjectsPage() {
  return (
    <PageShell title="Projects" description="项目作品与实验记录。">
      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </PageShell>
  );
}
```

- [ ] **Step 2: Add blog page**

Create `src/app/blog/page.tsx` with:

```tsx
import { PostCard } from "@/components/cards/PostCard";
import { PageShell } from "@/components/site/PageShell";
import { posts } from "@/data/posts";

export default function BlogPage() {
  return (
    <PageShell title="Blog" description="记录开发、设计、阅读和个人系统搭建。">
      <div className="grid gap-4 md:grid-cols-2">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </PageShell>
  );
}
```

- [ ] **Step 3: Add about page**

Create `src/app/about/page.tsx` with:

```tsx
import { PageShell } from "@/components/site/PageShell";
import { profile } from "@/data/profile";

export default function AboutPage() {
  return (
    <PageShell title="About" description="关于 Lilac Lab 的方向、状态和长期记录。">
      <section className="panel max-w-3xl rounded-lg p-6">
        <h2 className="text-xl font-semibold text-cyan-50">{profile.name}</h2>
        <p className="mt-4 leading-7 text-slate-300">
          这里会逐步整理个人介绍、技术方向、项目经历、博客索引和 Galgame Library 的维护说明。
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {profile.directions.map((direction) => (
            <span key={direction} className="rounded border border-cyan-200/15 px-3 py-1 text-sm text-cyan-100">
              {direction}
            </span>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
```

- [ ] **Step 4: Build static pages**

Run:

```bash
npm run build
```

Expected: build still fails only because `/library` routes are missing. Projects, Blog, and About should type-check.

- [ ] **Step 5: Commit static pages**

Run:

```bash
git add src/app/projects src/app/blog src/app/about
git commit -m "feat: add static content pages"
```

Expected: commit succeeds.

## Task 6: Build Galgame Library Pages

**Files:**
- Create: `src/components/library/GalgameCard.tsx`
- Create: `src/components/library/LibraryFilters.tsx`
- Create: `src/components/library/LibraryGrid.tsx`
- Create: `src/components/library/GalgameDetail.tsx`
- Create: `src/app/library/page.tsx`
- Create: `src/app/library/[slug]/page.tsx`
- Create: `src/app/not-found.tsx`

- [ ] **Step 1: Add Galgame card**

Create `src/components/library/GalgameCard.tsx` with:

```tsx
import Link from "next/link";
import type { GalgameRecord } from "@/lib/types";

const statusLabel = {
  wishlist: "想玩",
  playing: "游玩中",
  completed: "已通关",
  paused: "搁置"
};

export function GalgameCard({ game }: { game: GalgameRecord }) {
  return (
    <Link href={`/library/${game.slug}`} className="panel block rounded-lg p-4 transition hover:border-violet-200/45">
      <div className="aspect-[3/4] rounded-md border border-cyan-200/10 bg-gradient-to-br from-cyan-300/15 to-violet-300/10" />
      <h3 className="mt-4 text-base font-semibold text-cyan-50">{game.title}</h3>
      <p className="mt-2 text-sm text-slate-400">{statusLabel[game.status]} · {game.personalRating}/10 · {game.playHours}h</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {game.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="rounded border border-violet-200/15 px-2 py-1 text-xs text-violet-100/80">
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
```

- [ ] **Step 2: Add client filters and grid**

Create `src/components/library/LibraryFilters.tsx` with:

```tsx
"use client";

import type { GalgameStatus } from "@/lib/types";

const statuses: Array<{ value: GalgameStatus | "all"; label: string }> = [
  { value: "all", label: "全部" },
  { value: "wishlist", label: "想玩" },
  { value: "playing", label: "游玩中" },
  { value: "completed", label: "已通关" },
  { value: "paused", label: "搁置" }
];

export function LibraryFilters({
  status,
  onStatusChange
}: {
  status: GalgameStatus | "all";
  onStatusChange: (status: GalgameStatus | "all") => void;
}) {
  return (
    <div className="panel mb-5 flex flex-wrap gap-2 rounded-lg p-3">
      {statuses.map((item) => (
        <button
          key={item.value}
          type="button"
          onClick={() => onStatusChange(item.value)}
          className={
            status === item.value
              ? "rounded-md bg-cyan-300/20 px-3 py-2 text-sm text-cyan-50"
              : "rounded-md px-3 py-2 text-sm text-slate-300 hover:bg-cyan-300/10"
          }
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
```

Create `src/components/library/LibraryGrid.tsx` with:

```tsx
"use client";

import { useMemo, useState } from "react";
import { getSortedAndFilteredLibrary } from "@/lib/library";
import type { GalgameRecord, GalgameStatus } from "@/lib/types";
import { GalgameCard } from "./GalgameCard";
import { LibraryFilters } from "./LibraryFilters";

export function LibraryGrid({ records }: { records: GalgameRecord[] }) {
  const [status, setStatus] = useState<GalgameStatus | "all">("all");
  const filtered = useMemo(
    () => getSortedAndFilteredLibrary(records, { status, sort: "updatedAt" }),
    [records, status]
  );

  return (
    <section>
      <LibraryFilters status={status} onStatusChange={setStatus} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.map((game) => (
          <GalgameCard key={game.slug} game={game} />
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Add detail component**

Create `src/components/library/GalgameDetail.tsx` with:

```tsx
import type { BangumiSubject, GalgameRecord } from "@/lib/types";

const statusLabel = {
  wishlist: "想玩",
  playing: "游玩中",
  completed: "已通关",
  paused: "搁置"
};

export function GalgameDetail({
  game,
  subject
}: {
  game: GalgameRecord;
  subject?: BangumiSubject;
}) {
  return (
    <section className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
      <div className="panel rounded-lg p-5">
        <div className="aspect-[3/4] rounded-md border border-cyan-200/10 bg-gradient-to-br from-cyan-300/15 to-violet-300/10" />
      </div>
      <div className="panel rounded-lg p-6">
        <p className="text-sm uppercase tracking-[0.2em] text-violet-200/70">Galgame Record</p>
        <h1 className="mt-4 text-3xl font-semibold text-cyan-50">{subject?.nameCn || game.title}</h1>
        <p className="mt-2 text-slate-400">{subject?.name || game.title}</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <span>状态：{statusLabel[game.status]}</span>
          <span>评分：{game.personalRating}/10</span>
          <span>平台：{game.platform}</span>
          <span>游玩时长：{game.playHours}h</span>
          <span>开始：{game.startDate}</span>
          <span>通关：{game.finishDate ?? "进行中"}</span>
        </div>
        <p className="mt-6 leading-7 text-slate-300">{game.note}</p>
        {subject?.summary ? <p className="mt-6 leading-7 text-slate-400">{subject.summary}</p> : null}
        <a className="mt-6 inline-block text-cyan-100" href={`https://bgm.tv/subject/${game.bangumiSubjectId}`}>
          Bangumi 条目
        </a>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Add library routes**

Create `src/app/library/page.tsx` with:

```tsx
import { LibraryGrid } from "@/components/library/LibraryGrid";
import { PageShell } from "@/components/site/PageShell";
import { galgames } from "@/data/galgames";

export default function LibraryPage() {
  return (
    <PageShell title="Galgame Library" description="整理游玩状态、评分、时长、平台和个人短评。">
      <LibraryGrid records={galgames} />
    </PageShell>
  );
}
```

Create `src/app/not-found.tsx` with:

```tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto min-h-screen max-w-3xl px-4 py-20">
      <div className="panel rounded-lg p-8">
        <h1 className="text-3xl font-semibold text-cyan-50">页面不存在</h1>
        <p className="mt-4 text-slate-300">这个地址没有对应的内容。</p>
        <Link href="/" className="mt-6 inline-block text-cyan-100">
          返回首页
        </Link>
      </div>
    </main>
  );
}
```

Create `src/app/library/[slug]/page.tsx` with:

```tsx
import { notFound } from "next/navigation";
import { GalgameDetail } from "@/components/library/GalgameDetail";
import { galgames } from "@/data/galgames";
import { getBangumiSubject } from "@/lib/bangumi";
import { getGalgameBySlug } from "@/lib/library";

export function generateStaticParams() {
  return galgames.map((game) => ({ slug: game.slug }));
}

export default async function GalgameDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const game = getGalgameBySlug(galgames, slug);

  if (!game) {
    notFound();
  }

  const subject = await getBangumiSubject(game.bangumiSubjectId);

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <GalgameDetail game={game} subject={subject} />
    </main>
  );
}
```

- [ ] **Step 5: Run tests before Bangumi client**

Run:

```bash
npm run test
```

Expected: tests still pass; build fails because `src/lib/bangumi.ts` is missing.

- [ ] **Step 6: Commit library UI**

Run:

```bash
git add src/components/library src/app/library src/app/not-found.tsx
git commit -m "feat: add galgame library pages"
```

Expected: commit succeeds.

## Task 7: Add Bangumi Metadata Client With Fallback

**Files:**
- Create: `src/lib/bangumi.ts`
- Create: `src/lib/__tests__/bangumi.test.ts`

- [ ] **Step 1: Write Bangumi fallback test**

Create `src/lib/__tests__/bangumi.test.ts` with:

```ts
import { describe, expect, it, vi } from "vitest";
import { getBangumiSubject } from "../bangumi";

describe("bangumi client", () => {
  it("returns undefined when fetch fails", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network")));

    await expect(getBangumiSubject(253997)).resolves.toBeUndefined();
  });

  it("normalizes subject response", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          id: 253997,
          name: "Summer Pockets",
          name_cn: "Summer Pockets",
          summary: "summary",
          images: { common: "https://lain.bgm.tv/pic.jpg" },
          rating: { score: 8.1 },
          rank: 123
        })
      })
    );

    await expect(getBangumiSubject(253997)).resolves.toEqual({
      id: 253997,
      name: "Summer Pockets",
      nameCn: "Summer Pockets",
      summary: "summary",
      image: "https://lain.bgm.tv/pic.jpg",
      score: 8.1,
      rank: 123,
      url: "https://bgm.tv/subject/253997"
    });
  });
});
```

- [ ] **Step 2: Run failing Bangumi test**

Run:

```bash
npm run test -- src/lib/__tests__/bangumi.test.ts
```

Expected: FAIL because `src/lib/bangumi.ts` does not exist.

- [ ] **Step 3: Implement Bangumi client**

Create `src/lib/bangumi.ts` with:

```ts
import type { BangumiSubject } from "./types";

type BangumiSubjectResponse = {
  id: number;
  name: string;
  name_cn?: string;
  summary?: string;
  images?: {
    common?: string;
    large?: string;
    medium?: string;
  };
  rating?: {
    score?: number;
  };
  rank?: number;
};

const userAgent = "LilacLab/0.1.0 (https://github.com/Lil1ac/lilac-lab)";

export async function getBangumiSubject(id: number): Promise<BangumiSubject | undefined> {
  try {
    const response = await fetch(`https://api.bgm.tv/v0/subjects/${id}`, {
      headers: {
        "User-Agent": userAgent,
        Accept: "application/json"
      },
      next: {
        revalidate: 60 * 60 * 24
      }
    });

    if (!response.ok) {
      return undefined;
    }

    const subject = (await response.json()) as BangumiSubjectResponse;

    return {
      id: subject.id,
      name: subject.name,
      nameCn: subject.name_cn ?? subject.name,
      summary: subject.summary ?? "",
      image: subject.images?.common ?? subject.images?.medium ?? subject.images?.large ?? "",
      score: subject.rating?.score,
      rank: subject.rank,
      url: `https://bgm.tv/subject/${subject.id}`
    };
  } catch {
    return undefined;
  }
}
```

- [ ] **Step 4: Run tests**

Run:

```bash
npm run test
```

Expected: PASS for all tests.

- [ ] **Step 5: Commit Bangumi client**

Run:

```bash
git add src/lib/bangumi.ts src/lib/__tests__/bangumi.test.ts
git commit -m "feat: add bangumi metadata client"
```

Expected: commit succeeds.

## Task 8: Final Build, Responsive Review, and Push

**Files:**
- Modify: no source files unless verification finds concrete issues.

- [ ] **Step 1: Run unit tests**

Run:

```bash
npm run test
```

Expected: all tests pass.

- [ ] **Step 2: Run production build**

Run:

```bash
npm run build
```

Expected: Next.js production build completes successfully.

- [ ] **Step 3: Start local dev server**

Run:

```bash
npm run dev
```

Expected: local server starts and prints a localhost URL, usually `http://localhost:3000`.

- [ ] **Step 4: Manually inspect key pages**

Open these URLs in a browser:

```txt
http://localhost:3000/
http://localhost:3000/projects
http://localhost:3000/blog
http://localhost:3000/library
http://localhost:3000/library/summer-pockets
http://localhost:3000/about
```

Expected: no page has overlapping text, broken navigation, unreadable contrast, or missing main content at desktop width and mobile width.

- [ ] **Step 5: Commit verification fixes if needed**

If source files changed during verification, run:

```bash
git status -sb
git add src
git commit -m "fix: polish first version"
```

Expected: commit succeeds only when verification produced source changes.

- [ ] **Step 6: Push branch**

Run:

```bash
git push
```

Expected: local `main` pushes to `origin/main` successfully.

