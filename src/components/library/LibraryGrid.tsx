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
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.map((game) => (
          <GalgameCard key={game.slug} game={game} />
        ))}
      </div>
    </section>
  );
}
