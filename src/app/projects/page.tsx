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
