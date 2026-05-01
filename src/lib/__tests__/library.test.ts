import { describe, expect, it } from "vitest";
import {
  getGalgameBySlug,
  getLibraryTags,
  getLibraryYears,
  getSortedAndFilteredLibrary
} from "../library";
import type { GalgameRecord } from "../types";

const records: GalgameRecord[] = [
  {
    slug: "a",
    bangumiSubjectId: 1,
    title: "A",
    status: "completed",
    startDate: "2024-01-01",
    finishDate: "2024-02-01",
    playHours: 40,
    personalRating: 9,
    tags: ["Key", "夏"],
    platform: "PC",
    note: "A note",
    updatedAt: "2024-02-01"
  },
  {
    slug: "b",
    bangumiSubjectId: 2,
    title: "B",
    status: "playing",
    startDate: "2026-03-01",
    playHours: 12,
    personalRating: 8,
    tags: ["Music"],
    platform: "Steam",
    note: "B note",
    updatedAt: "2026-03-10"
  }
];

describe("library helpers", () => {
  it("filters by status and sorts by rating", () => {
    const result = getSortedAndFilteredLibrary(records, {
      status: "completed",
      sort: "personalRating"
    });

    expect(result.map((item) => item.slug)).toEqual(["a"]);
  });

  it("filters by min rating and year", () => {
    const result = getSortedAndFilteredLibrary(records, {
      minRating: 9,
      year: 2024
    });

    expect(result.map((item) => item.slug)).toEqual(["a"]);
  });

  it("returns unique tags and years", () => {
    expect(getLibraryTags(records)).toEqual(["Key", "Music", "夏"]);
    expect(getLibraryYears(records)).toEqual([2026, 2024]);
  });

  it("finds record by slug", () => {
    expect(getGalgameBySlug(records, "b")?.title).toBe("B");
    expect(getGalgameBySlug(records, "missing")).toBeUndefined();
  });
});
