import { ProfileEditor } from "@/components/admin/ProfileEditor";
import { PageShell } from "@/components/site/PageShell";
import { profile } from "@/data/profile";

export default function AdminProfilePage() {
  return (
    <PageShell title="Edit Profile" description="维护主页首屏、About 页面和站点导航中使用的个人资料。">
      <ProfileEditor initialProfile={profile} />
    </PageShell>
  );
}
