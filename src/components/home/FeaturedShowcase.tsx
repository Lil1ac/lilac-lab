import Link from "next/link";
import { ArrowUpRight, Cpu, GitBranch, Layers } from "lucide-react";
import { projects } from "@/data/projects";
import { SectionHeader } from "./SectionHeader";

const icons = [Cpu, GitBranch, Layers];

export function FeaturedShowcase() {
  const featured = projects.filter((project) => project.featured);

  return (
    <section className="mt-16">
      <SectionHeader
        label="Featured Projects"
        title="正在形成的个人项目矩阵"
        description="这里展示长期维护、值得公开记录的项目。后续你在后台新增或修改项目后，首页会自动读取这些内容。"
        href="/projects"
        action="View all projects"
      />
      <div className="grid gap-4 lg:grid-cols-2">
        {featured.map((project, index) => {
          const Icon = icons[index % icons.length];

          return (
            <Link
              key={project.slug}
              href={project.href}
              className="group relative overflow-hidden rounded-lg border border-cyan-200/15 bg-slate-950/65 p-6 transition hover:border-cyan-100/45 hover:bg-slate-900/75"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/70 to-transparent opacity-0 transition group-hover:opacity-100" />
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-11 w-11 items-center justify-center border border-cyan-200/20 bg-cyan-300/10 text-cyan-100">
                  <Icon size={20} />
                </div>
                <span className="text-xs text-slate-500">{project.updatedAt}</span>
              </div>
              <h3 className="mt-6 text-2xl font-semibold text-cyan-50">{project.title}</h3>
              <p className="mt-4 min-h-[4.5rem] text-sm leading-6 text-slate-300">{project.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="border border-cyan-200/15 bg-cyan-300/5 px-2.5 py-1 text-xs text-cyan-100/80">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-7 inline-flex items-center gap-2 text-sm text-cyan-100">
                Open project
                <ArrowUpRight size={16} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
