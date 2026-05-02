"use client";

import type { GalgameStatus } from "@/lib/types";

const statuses: Array<{ value: GalgameStatus | "all"; label: string }> = [
  { value: "all", label: "全部" },
  { value: "wishlist", label: "想玩" },
  { value: "playing", label: "游玩中" },
  { value: "completed", label: "已通关" },
  { value: "paused", label: "搁置" }
];

export function LibraryFilters({
  status,
  onStatusChange
}: {
  status: GalgameStatus | "all";
  onStatusChange: (status: GalgameStatus | "all") => void;
}) {
  return (
    <div className="panel mb-5 flex flex-wrap gap-2 rounded-lg p-3">
      {statuses.map((item) => (
        <button
          key={item.value}
          type="button"
          onClick={() => onStatusChange(item.value)}
          className={
            status === item.value
              ? "rounded-md bg-cyan-300/20 px-3 py-2 text-sm text-cyan-50"
              : "rounded-md px-3 py-2 text-sm text-slate-300 hover:bg-cyan-300/10"
          }
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
