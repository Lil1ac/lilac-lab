import type { BangumiSubject, GalgameRecord } from "@/lib/types";

const statusLabel = {
  wishlist: "想玩",
  playing: "游玩中",
  completed: "已通关",
  paused: "搁置"
};

export function GalgameDetail({
  game,
  subject
}: {
  game: GalgameRecord;
  subject?: BangumiSubject;
}) {
  return (
    <section className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
      <div className="panel rounded-lg p-5">
        <div className="aspect-[3/4] rounded-md border border-cyan-200/10 bg-gradient-to-br from-cyan-300/15 to-violet-300/10" />
      </div>
      <div className="panel rounded-lg p-6">
        <p className="text-sm uppercase tracking-[0.2em] text-violet-200/70">Galgame Record</p>
        <h1 className="mt-4 text-3xl font-semibold text-cyan-50">{subject?.nameCn || game.title}</h1>
        <p className="mt-2 text-slate-400">{subject?.name || game.title}</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <span>状态：{statusLabel[game.status]}</span>
          <span>评分：{game.personalRating}/10</span>
          <span>平台：{game.platform}</span>
          <span>游玩时长：{game.playHours}h</span>
          <span>开始：{game.startDate}</span>
          <span>通关：{game.finishDate ?? "进行中"}</span>
        </div>
        <p className="mt-6 leading-7 text-slate-300">{game.note}</p>
        {subject?.summary ? <p className="mt-6 leading-7 text-slate-400">{subject.summary}</p> : null}
        <a className="mt-6 inline-block text-cyan-100" href={`https://bgm.tv/subject/${game.bangumiSubjectId}`}>
          Bangumi 条目
        </a>
      </div>
    </section>
  );
}
