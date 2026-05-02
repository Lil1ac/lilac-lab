import Link from "next/link";
import { Box, Database, Gauge, PenLine } from "lucide-react";
import { workbenchItems } from "@/data/siteContent";
import { SectionHeader } from "./SectionHeader";

const iconMap = [Gauge, Box, PenLine, Database];

export function SystemsMap() {
  return (
    <section className="mt-16">
      <SectionHeader
        label="Systems Map"
        title="主页不是单页名片，而是长期系统入口"
        description="这些模块对应未来可持续维护的内容边界：项目、文章、个人资料、Gal Tracker。"
      />
      <div className="relative grid gap-4 lg:grid-cols-4">
        <div className="absolute left-0 right-0 top-1/2 hidden h-px bg-gradient-to-r from-transparent via-cyan-200/25 to-transparent lg:block" />
        {workbenchItems.map((item, index) => {
          const Icon = iconMap[index % iconMap.length];

          return (
            <Link
              key={item.title}
              href={item.title === "Profile" ? "/about" : item.title === "Posts" ? "/blog" : item.title === "Projects" ? "/projects" : "/library"}
              className="relative rounded-lg border border-cyan-200/15 bg-slate-950/70 p-5 transition hover:border-violet-200/40 hover:bg-slate-900/70"
            >
              <div className="mb-5 flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-200/20 bg-cyan-300/10 text-cyan-100">
                  <Icon size={18} />
                </div>
                <span className="text-xs text-slate-500">0{index + 1}</span>
              </div>
              <h3 className="text-lg font-semibold text-cyan-50">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{item.description}</p>
              <div className="mt-5 text-xs uppercase tracking-[0.16em] text-violet-200/70">{item.action}</div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
