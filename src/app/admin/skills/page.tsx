import { SkillsEditor } from "@/components/admin/SkillsEditor";
import { PageShell } from "@/components/site/PageShell";
import { skills } from "@/data/skills";

export default function AdminSkillsPage() {
  return (
    <PageShell title="Edit Skills" description="维护首页和 About 页显示的技术栈能力谱系，并保存到 GitHub 的 content/skills.json。">
      <SkillsEditor initialSkills={skills} />
    </PageShell>
  );
}
