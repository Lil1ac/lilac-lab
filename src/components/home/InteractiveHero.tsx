"use client";

import Link from "next/link";
import { ArrowUpRight, Github, Terminal } from "lucide-react";
import type { CSSProperties } from "react";
import { useState } from "react";
import { profile } from "@/data/profile";

export function InteractiveHero() {
  const [pointer, setPointer] = useState({ x: 50, y: 50 });
  const github = profile.links.find((link) => link.label.toLowerCase().includes("github"));

  return (
    <section
      className="magnetic-stage relative min-h-[880px] overflow-hidden border-b border-cyan-100/10 sm:min-h-[820px] lg:min-h-[860px]"
      style={
        {
          "--mx": `${pointer.x}%`,
          "--my": `${pointer.y}%`
        } as CSSProperties
      }
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setPointer({
          x: ((event.clientX - rect.left) / rect.width) * 100,
          y: ((event.clientY - rect.top) / rect.height) * 100
        });
      }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(148,163,184,0.06)_1px,transparent_1px),linear-gradient(rgba(148,163,184,0.05)_1px,transparent_1px)] bg-[size:72px_72px]" />
      <div className="magnetic-light absolute inset-0" />
      <div className="absolute inset-x-0 top-16 h-px bg-gradient-to-r from-transparent via-cyan-200/40 to-transparent" />

      <div className="relative mx-auto grid min-h-[880px] max-w-7xl content-center gap-12 px-4 py-16 sm:min-h-[820px] sm:px-6 lg:min-h-[860px] lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
        <div className="min-w-0 max-w-3xl">
          <div className="mb-7 flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-cyan-100/70">
            <span className="h-px w-12 bg-cyan-200/45" />
            Interactive Personal Lab
          </div>
          <h1 className="hero-title text-[clamp(4rem,11vw,10.5rem)] font-semibold leading-[0.82] tracking-normal text-cyan-50">
            Lilac
            <br />
            Lab
          </h1>
          <p className="mt-8 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">{profile.status}</p>
          <div className="mt-10 grid max-w-full grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:gap-4">
            {github ? (
              <Link href={github.href} className="magnetic-button bg-cyan-100 text-slate-950">
                <Github size={17} />
                GitHub
              </Link>
            ) : null}
            <Link href="/projects" className="magnetic-button border border-cyan-100/20 text-cyan-50">
              Selected Works
              <ArrowUpRight size={17} />
            </Link>
            <Link href="/admin" className="magnetic-button col-span-2 border border-violet-100/20 text-violet-100 sm:col-span-1">
              <Terminal size={17} />
              Admin
            </Link>
          </div>
        </div>

        <div className="relative min-h-[30rem] min-w-0 overflow-hidden lg:min-h-[42rem]">
          <div className="kinetic-orb absolute left-1/2 top-1/2 h-[21rem] w-[21rem] -translate-x-1/2 -translate-y-1/2 rounded-full sm:h-[26rem] sm:w-[26rem]" />
          <div className="absolute left-[8%] top-[18%] w-48 border-l border-cyan-200/35 pl-4 sm:w-52">
            <div className="text-xs uppercase tracking-[0.28em] text-cyan-100/60">Current</div>
            <div className="mt-3 text-2xl font-semibold text-cyan-50">Building systems for myself</div>
          </div>
          <div className="absolute right-[3%] top-[36%] hidden w-56 border-r border-violet-200/35 pr-4 text-right sm:block">
            <div className="text-xs uppercase tracking-[0.28em] text-violet-100/60">Not a resume</div>
            <div className="mt-3 text-lg leading-7 text-slate-200">Projects, logs and tools that can keep evolving.</div>
          </div>
          <div className="absolute bottom-[12%] left-[16%] grid gap-3 text-sm text-slate-300">
            {profile.directions.map((direction, index) => (
              <div key={direction} className="flex items-center gap-3">
                <span className="font-mono text-cyan-200/60">0{index + 1}</span>
                <span>{direction}</span>
              </div>
            ))}
          </div>
          <div className="absolute bottom-[16%] right-[12%] h-24 w-24 rounded-full border border-cyan-200/25">
            <div className="absolute inset-6 rounded-full border border-cyan-200/30" />
            <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-100 shadow-[0_0_28px_rgba(165,243,252,0.9)]" />
          </div>
        </div>
      </div>
    </section>
  );
}
