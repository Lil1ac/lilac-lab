import { notFound } from "next/navigation";
import { GalgameDetail } from "@/components/library/GalgameDetail";
import { galgames } from "@/data/galgames";
import { getBangumiSubject } from "@/lib/bangumi";
import { getGalgameBySlug } from "@/lib/library";

export function generateStaticParams() {
  return galgames.map((game) => ({ slug: game.slug }));
}

export default async function GalgameDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const game = getGalgameBySlug(galgames, slug);

  if (!game) {
    notFound();
  }

  const subject = await getBangumiSubject(game.bangumiSubjectId);

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <GalgameDetail game={game} subject={subject} />
    </main>
  );
}
