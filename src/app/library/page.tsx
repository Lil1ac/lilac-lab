import { LibraryGrid } from "@/components/library/LibraryGrid";
import { PageShell } from "@/components/site/PageShell";
import { galgames } from "@/data/galgames";

export default function LibraryPage() {
  return (
    <PageShell title="Galgame Library" description="预留给 gal-tracker 的本地 Galgame 记录展示页。">
      <LibraryGrid records={galgames} />
    </PageShell>
  );
}
