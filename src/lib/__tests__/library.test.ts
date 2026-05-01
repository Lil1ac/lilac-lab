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
  },
  {
    slug: "c",
    bangumiSubjectId: 3,
    title: "C",
    status: "completed",
    startDate: "2023-12-31",
    finishDate: "2024-01-05",
    playHours: 80,
    personalRating: 7,
    tags: ["Drama", "Music"],
    platform: "PC",
    note: "C note",
    updatedAt: "2026-01-01"
  }
];

describe("library helpers", () => {
  it("filters by status and sorts by rating", () => {
    const result = getSortedAndFilteredLibrary(records, {
      status: "completed",
      sort: "personalRating"
    });

    expect(result.map((item) => item.slug)).toEqual(["a", "c"]);
  });

  it("filters by min rating and year", () => {
    const result = getSortedAndFilteredLibrary(records, {
      minRating: 9,
      year: 2024
    });

    expect(result.map((item) => item.slug)).toEqual(["a"]);
  });

  it("keeps January 1 dates in the written ISO year", () => {
    const result = getSortedAndFilteredLibrary(records, {
      year: 2024
    });

    expect(result.map((item) => item.slug)).toContain("a");
  });

  it("filters by tag", () => {
    const result = getSortedAndFilteredLibrary(records, {
      tag: "Music"
    });

    expect(result.map((item) => item.slug)).toEqual(["b", "c"]);
  });

  it("sorts by updatedAt by default", () => {
    const result = getSortedAndFilteredLibrary(records);

    expect(result.map((item) => item.slug)).toEqual(["b", "c", "a"]);
  });

  it("sorts by play hours", () => {
    const result = getSortedAndFilteredLibrary(records, {
      sort: "playHours"
    });

    expect(result.map((item) => item.slug)).toEqual(["c", "a", "b"]);
  });

  it("does not mutate the input array", () => {
    const originalOrder = records.map((item) => item.slug);

    getSortedAndFilteredLibrary(records, {
      sort: "playHours"
    });

    expect(records.map((item) => item.slug)).toEqual(originalOrder);
  });

  it("returns unique tags and years", () => {
    expect(getLibraryTags(records)).toEqual(["Drama", "Key", "Music", "夏"]);
    expect(getLibraryYears(records)).toEqual([2026, 2024, 2023]);
  });

  it("finds record by slug", () => {
    expect(getGalgameBySlug(records, "b")?.title).toBe("B");
    expect(getGalgameBySlug(records, "missing")).toBeUndefined();
  });
});
