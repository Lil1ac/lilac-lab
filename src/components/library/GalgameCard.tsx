import Link from "next/link";
import type { GalgameRecord } from "@/lib/types";

const statusLabel = {
  wishlist: "想玩",
  playing: "游玩中",
  completed: "已通关",
  paused: "搁置"
};

export function GalgameCard({ game }: { game: GalgameRecord }) {
  return (
    <Link href={`/library/${game.slug}`} className="block border border-cyan-100/12 p-4 transition hover:border-violet-200/45">
      <div className="aspect-[3/4] border border-cyan-200/10 bg-gradient-to-br from-cyan-300/15 to-violet-300/10" />
      <h3 className="mt-4 text-base font-semibold text-cyan-50">{game.title}</h3>
      <p className="mt-2 text-sm text-slate-400">
        {statusLabel[game.status]} / {game.personalRating}/10 / {game.playHours}h
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {game.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="text-xs text-violet-100/80">
            /{tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
