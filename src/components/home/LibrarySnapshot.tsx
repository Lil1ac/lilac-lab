import Link from "next/link";
import { galgames } from "@/data/galgames";

export function LibrarySnapshot() {
  const featured = [...galgames].sort((left, right) => right.personalRating - left.personalRating).slice(0, 4);

  return (
    <section className="panel rounded-lg p-5">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-sm uppercase tracking-[0.2em] text-violet-200/80">Galgame Library</h2>
        <Link href="/library" className="text-sm text-cyan-100">
          View all
        </Link>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3">
        {featured.map((game) => (
          <Link key={game.slug} href={`/library/${game.slug}`} className="rounded-md border border-violet-200/15 bg-violet-300/5 p-3">
            <div className="text-sm font-medium text-cyan-50">{game.title}</div>
            <div className="mt-2 text-xs text-slate-400">
              {game.personalRating}/10 · {game.playHours}h
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
