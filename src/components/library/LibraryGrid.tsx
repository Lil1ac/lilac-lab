"use client";

import { useMemo, useState } from "react";
import { getSortedAndFilteredLibrary } from "@/lib/library";
import type { GalgameRecord, GalgameStatus } from "@/lib/types";
import { GalgameCard } from "./GalgameCard";
import { LibraryFilters } from "./LibraryFilters";

export function LibraryGrid({ records }: { records: GalgameRecord[] }) {
  const [status, setStatus] = useState<GalgameStatus | "all">("all");
  const filtered = useMemo(
    () => getSortedAndFilteredLibrary(records, { status, sort: "updatedAt" }),
    [records, status]
  );

  return (
    <section>
      <LibraryFilters status={status} onStatusChange={setStatus} />
      {filtered.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((game) => (
            <GalgameCard key={game.slug} game={game} />
          ))}
        </div>
      ) : (
        <div className="panel rounded-lg p-6">
          <h2 className="text-xl font-semibold text-cyan-50">Gal Tracker 接入前的预留页</h2>
          <p className="mt-4 max-w-2xl leading-7 text-slate-300">
            这里不会直接同步 Bangumi 收藏。正式数据会从正在开发的 gal-tracker 本地记录工具接入，
            用来展示游玩状态、进度、评分、笔记和个人统计。
          </p>
          <p className="mt-4 text-sm text-slate-400">
            当前页面先保留筛选、列表和详情页结构，等本地数据模型稳定后再导入真实记录。
          </p>
        </div>
      )}
    </section>
  );
}
