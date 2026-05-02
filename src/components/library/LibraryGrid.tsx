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
        <div className="relative overflow-hidden border border-cyan-100/12 p-8 md:p-10">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(125,211,252,0.06)_1px,transparent_1px),linear-gradient(rgba(125,211,252,0.05)_1px,transparent_1px)] bg-[size:56px_56px]" />
          <div className="relative max-w-3xl">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/60">Waiting for local data</p>
            <h2 className="mt-5 text-4xl font-semibold leading-tight text-cyan-50 md:text-6xl">Gal Tracker 接入前的预留页</h2>
            <p className="mt-6 leading-8 text-slate-300">
              这里不会直接同步 Bangumi 收藏。正式数据会从正在开发的 gal-tracker 本地记录工具接入，用来展示游玩状态、进度、评分、笔记和个人统计。
            </p>
            <p className="mt-4 text-sm leading-7 text-slate-400">
              当前页面先保留筛选、列表和详情页结构，等本地数据模型稳定后再导入真实记录。
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
