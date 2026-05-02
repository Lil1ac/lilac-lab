import Link from "next/link";
import { Github, Mail, Settings } from "lucide-react";
import { profile } from "@/data/profile";

export function ContactDock() {
  const github = profile.links.find((link) => link.label.toLowerCase().includes("github"));

  return (
    <section className="mt-16 rounded-lg border border-cyan-200/15 bg-cyan-300/[0.04] p-6 md:p-8">
      <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <div className="text-xs uppercase tracking-[0.26em] text-cyan-200/60">Dock</div>
          <h2 className="mt-3 text-3xl font-semibold text-cyan-50">这里会继续扩展成你的个人工作台。</h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300">
            项目、文章和个人资料已经可以通过后台维护；Gal Tracker 等独立工具稳定后，再作为公开模块接入。
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          {github ? (
            <Link href={github.href} className="inline-flex items-center gap-2 rounded-md bg-cyan-200 px-4 py-2.5 text-sm font-medium text-slate-950">
              <Github size={16} />
              GitHub
            </Link>
          ) : null}
          <Link href="/about" className="inline-flex items-center gap-2 rounded-md border border-cyan-200/20 px-4 py-2.5 text-sm text-cyan-100">
            <Mail size={16} />
            About
          </Link>
          <Link href="/admin" className="inline-flex items-center gap-2 rounded-md border border-violet-200/20 px-4 py-2.5 text-sm text-violet-100">
            <Settings size={16} />
            Admin
          </Link>
        </div>
      </div>
    </section>
  );
}
