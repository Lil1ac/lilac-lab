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
