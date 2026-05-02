import { ProfileEditor } from "@/components/admin/ProfileEditor";
import { PageShell } from "@/components/site/PageShell";
import { profile } from "@/data/profile";

export default function AdminProfilePage() {
  return (
    <PageShell title="Edit Profile" description="通过表单修改个人信息，并保存到 GitHub 的 content/profile.json。">
      <ProfileEditor initialProfile={profile} />
    </PageShell>
  );
}
