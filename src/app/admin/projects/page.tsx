import { ProjectsEditor } from "@/components/admin/ProjectsEditor";
import { PageShell } from "@/components/site/PageShell";
import { projects } from "@/data/projects";

export default function AdminProjectsPage() {
  return (
    <PageShell title="Edit Projects" description="新增、删除或修改项目，并保存到 GitHub 的 content/projects.json。">
      <ProjectsEditor initialProjects={projects} />
    </PageShell>
  );
}
