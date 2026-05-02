export type Project = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  featured: boolean;
  updatedAt: string;
  href: string;
};

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  tags: string[];
};

export type SkillGroup = {
  group: string;
  focus: string;
  items: string[];
};

export type GalgameStatus = "wishlist" | "playing" | "completed" | "paused";

export type GalgameRecord = {
  slug: string;
  bangumiSubjectId: number;
  title: string;
  status: GalgameStatus;
  startDate: string;
  finishDate?: string;
  playHours: number;
  personalRating: number;
  tags: string[];
  platform: string;
  note: string;
  updatedAt: string;
};

export type BangumiSubject = {
  id: number;
  name: string;
  nameCn: string;
  summary: string;
  image: string;
  score?: number;
  rank?: number;
  url: string;
};

export type LibraryFilters = {
  status?: GalgameStatus | "all";
  tag?: string;
  minRating?: number;
  year?: number;
  sort?: "updatedAt" | "personalRating" | "playHours";
};
