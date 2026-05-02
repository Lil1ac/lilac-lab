import Link from "next/link";
import { PageShell } from "@/components/site/PageShell";
import { projects } from "@/data/projects";

export default function ProjectsPage() {
  return (
    <PageShell title="Projects" description="项目作品与长期实验记录。这里不做卡片墙，而是展示每个项目的状态、方向和技术构成。">
      <div className="work-index">
        {projects.map((project, index) => (
          <Link key={project.slug} href={project.href} className="work-row group">
            <div className="font-mono text-sm text-cyan-200/45">0{index + 1}</div>
            <div>
              <h2 className="text-4xl font-semibold text-cyan-50 transition group-hover:translate-x-2 md:text-6xl">
                {project.title}
              </h2>
              <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-300">{project.description}</p>
            </div>
            <div className="flex flex-col items-start gap-4 lg:items-end">
              <span className="text-sm text-slate-500">{project.updatedAt}</span>
              <span className={project.featured ? "text-xs uppercase tracking-[0.2em] text-cyan-100" : "text-xs uppercase tracking-[0.2em] text-slate-500"}>
                {project.featured ? "Featured" : "Archive"}
              </span>
              <div className="flex flex-wrap gap-2 lg:justify-end">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-xs uppercase tracking-[0.16em] text-violet-100/65">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
