import { LibraryGrid } from "@/components/library/LibraryGrid";
import { PageShell } from "@/components/site/PageShell";
import { galgames } from "@/data/galgames";

export default function LibraryPage() {
  return (
    <PageShell title="Galgame Library" description="整理游玩状态、评分、时长、平台和个人短评。">
      <LibraryGrid records={galgames} />
    </PageShell>
  );
}
