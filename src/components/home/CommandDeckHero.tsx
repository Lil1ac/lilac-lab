import Link from "next/link";
import { ArrowUpRight, LayoutDashboard, Radio, Sparkles, Terminal } from "lucide-react";
import { galgames } from "@/data/galgames";
import { posts } from "@/data/posts";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { buildMetrics } from "@/lib/content";

const statusRows = [
  { label: "Build", value: "Personal OS", tone: "text-cyan-100" },
  { label: "Focus", value: "Tools / Logs / Games", tone: "text-violet-100" },
  { label: "Sync", value: "GitHub backed content", tone: "text-emerald-100" }
];

export function CommandDeckHero() {
  const metrics = buildMetrics({ projects, posts, galgames });
  const featuredProject = projects.find((project) => project.featured) ?? projects[0];

  return (
    <section className="relative overflow-hidden rounded-lg border border-cyan-200/15 bg-slate-950/70">
      <div className="hero-grid absolute inset-0 opacity-80" />
      <div className="scanline absolute inset-0" />
      <div className="relative grid gap-10 px-5 py-8 sm:px-8 lg:min-h-[680px] lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:py-12">
        <div className="flex max-w-3xl flex-col justify-between gap-10">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 border border-cyan-200/20 bg-cyan-300/5 px-3 py-2 text-xs uppercase tracking-[0.22em] text-cyan-100/80">
              <Radio size={14} />
              Online Workspace
            </div>
            <h1 className="text-5xl font-semibold leading-[0.95] text-cyan-50 sm:text-6xl lg:text-7xl">
              {profile.handle}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">{profile.status}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {profile.links.slice(0, 3).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex items-center gap-2 rounded-md bg-cyan-200 px-4 py-2.5 text-sm font-medium text-slate-950 transition hover:bg-cyan-100"
                >
                  {link.label}
                  <ArrowUpRight size={16} />
                </Link>
              ))}
              <Link
                href="/admin"
                className="inline-flex items-center gap-2 rounded-md border border-cyan-200/20 px-4 py-2.5 text-sm text-cyan-100 transition hover:border-cyan-100/45 hover:bg-cyan-300/10"
              >
                <LayoutDashboard size={16} />
                Admin
              </Link>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <MetricTile label="Projects" value={metrics.projects} />
            <MetricTile label="Posts" value={metrics.posts} />
            <MetricTile label="Tracked Hours" value={metrics.playHours} />
          </div>
        </div>

        <div className="relative flex min-w-0 items-center">
          <div className="deck-visual min-w-0 w-full overflow-hidden rounded-lg border border-cyan-200/15 bg-slate-900/55 p-4 shadow-2xl shadow-cyan-950/30">
            <div className="mb-4 flex items-center justify-between border-b border-cyan-200/10 pb-3">
              <div className="flex items-center gap-2 text-sm text-cyan-100">
                <Terminal size={16} />
                command.deck
              </div>
              <div className="flex gap-1.5">
                <span className="h-2 w-2 rounded-full bg-rose-300/80" />
                <span className="h-2 w-2 rounded-full bg-amber-300/80" />
                <span className="h-2 w-2 rounded-full bg-emerald-300/80" />
              </div>
            </div>

            <div className="grid min-w-0 gap-4 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="min-w-0 space-y-3">
                {statusRows.map((row) => (
                  <div key={row.label} className="border border-cyan-200/10 bg-slate-950/45 p-3">
                    <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500">{row.label}</div>
                    <div className={`mt-1 text-sm ${row.tone}`}>{row.value}</div>
                  </div>
                ))}
                <div className="border border-violet-200/15 bg-violet-300/5 p-3">
                  <div className="flex items-center gap-2 text-sm text-violet-100">
                    <Sparkles size={15} />
                    Gal Tracker reserved
                  </div>
                  <p className="mt-2 text-xs leading-5 text-slate-400">
                    本地记录软件稳定后，再把公开字段接入这里。
                  </p>
                </div>
              </div>

              <div className="relative min-h-[340px] min-w-0 overflow-hidden border border-cyan-200/10 bg-[#050814]/80 p-4">
                <div className="radar-ring absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-200/20" />
                <div className="radar-ring absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-200/20" />
                <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-200 shadow-[0_0_32px_rgba(103,232,249,0.9)]" />
                <div className="absolute left-6 top-6 max-w-[12rem] border-l border-cyan-200/30 pl-3">
                  <div className="text-xs uppercase tracking-[0.18em] text-cyan-200/70">Featured</div>
                  <div className="mt-2 text-lg font-semibold text-cyan-50">{featuredProject?.title ?? "Lilac Lab"}</div>
                </div>
                <div className="absolute bottom-6 right-6 max-w-[13rem] border-r border-violet-200/30 pr-3 text-right">
                  <div className="text-xs uppercase tracking-[0.18em] text-violet-200/70">Latest Log</div>
                  <div className="mt-2 text-sm leading-5 text-slate-200">{posts[0]?.title ?? "Design log"}</div>
                </div>
                <div className="orbit-dot left-[24%] top-[34%]" />
                <div className="orbit-dot left-[72%] top-[28%]" />
                <div className="orbit-dot left-[66%] top-[70%]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MetricTile({ label, value }: { label: string; value: number }) {
  return (
    <div className="border border-cyan-200/15 bg-slate-950/45 p-4">
      <div className="text-3xl font-semibold text-cyan-50">{value}</div>
      <div className="mt-1 text-xs uppercase tracking-[0.18em] text-cyan-200/55">{label}</div>
    </div>
  );
}
