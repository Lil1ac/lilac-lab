import type { GalgameRecord, LibraryFilters } from "./types";

function getYearFromDateString(date: string) {
  return Number(date.slice(0, 4));
}

export function getSortedAndFilteredLibrary(records: GalgameRecord[], filters: LibraryFilters = {}) {
  const status = filters.status ?? "all";
  const sort = filters.sort ?? "updatedAt";

  return [...records]
    .filter((record) => status === "all" || record.status === status)
    .filter((record) => !filters.tag || record.tags.includes(filters.tag))
    .filter((record) => !filters.minRating || record.personalRating >= filters.minRating)
    .filter((record) => !filters.year || getYearFromDateString(record.startDate) === filters.year)
    .sort((left, right) => {
      if (sort === "personalRating") {
        return right.personalRating - left.personalRating;
      }

      if (sort === "playHours") {
        return right.playHours - left.playHours;
      }

      return new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime();
    });
}

export function getLibraryTags(records: GalgameRecord[]) {
  return Array.from(new Set(records.flatMap((record) => record.tags))).sort();
}

export function getLibraryYears(records: GalgameRecord[]) {
  return Array.from(new Set(records.map((record) => getYearFromDateString(record.startDate)))).sort(
    (left, right) => right - left
  );
}

export function getGalgameBySlug(records: GalgameRecord[], slug: string) {
  return records.find((record) => record.slug === slug);
}
