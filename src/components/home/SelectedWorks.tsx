import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";

export function SelectedWorks() {
  return (
    <section className="lab-section">
      <div className="section-kicker">Selected Works</div>
      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <h2 className="section-title max-w-3xl">项目应该像作品索引，而不是一堆说明卡片。</h2>
        <Link href="/projects" className="text-sm text-cyan-100 transition hover:text-cyan-50">
          View archive <ArrowUpRight className="inline" size={15} />
        </Link>
      </div>
      <div className="work-index">
        {projects.map((project, index) => (
          <Link key={project.slug} href={project.href} className="work-row group">
            <div className="font-mono text-sm text-cyan-200/45">0{index + 1}</div>
            <div>
              <h3 className="text-3xl font-semibold text-cyan-50 transition group-hover:translate-x-2 sm:text-5xl">
                {project.title}
              </h3>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">{project.description}</p>
            </div>
            <div className="flex flex-col items-start gap-4 lg:items-end">
              <div className="text-sm text-slate-500">{project.updatedAt}</div>
              <div className="flex max-w-md flex-wrap gap-2 lg:justify-end">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-xs uppercase tracking-[0.18em] text-violet-100/65">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
