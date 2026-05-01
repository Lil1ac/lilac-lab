import { describe, expect, it } from "vitest";
import { buildActivityFeed, buildMetrics } from "../content";
import type { GalgameRecord, Post, Project } from "../types";

const projects: Project[] = [
  {
    slug: "project",
    title: "Project",
    description: "Project description",
    tags: ["Next.js"],
    featured: true,
    updatedAt: "2026-04-20",
    href: "/projects"
  }
];

const posts: Post[] = [
  {
    slug: "post",
    title: "Post",
    excerpt: "Post excerpt",
    publishedAt: "2026-04-25",
    tags: ["Design"]
  }
];

const galgames: GalgameRecord[] = [
  {
    slug: "game",
    bangumiSubjectId: 1,
    title: "Game",
    status: "completed",
    startDate: "2026-01-01",
    finishDate: "2026-02-01",
    playHours: 30,
    personalRating: 9,
    tags: ["Drama"],
    platform: "PC",
    note: "Note",
    updatedAt: "2026-04-28"
  }
];

describe("content helpers", () => {
  it("builds homepage metrics", () => {
    expect(buildMetrics({ projects, posts, galgames })).toEqual({
      projects: 1,
      posts: 1,
      galgames: 1,
      completedGalgames: 1,
      playHours: 30
    });
  });

  it("builds recent activity feed", () => {
    expect(buildActivityFeed({ projects, posts, galgames }).map((item) => item.label)).toEqual([
      "Game",
      "Post",
      "Project"
    ]);
  });

  it("limits recent activity feed to six entries", () => {
    const manyPosts = Array.from({ length: 7 }, (_, index): Post => {
      const day = String(index + 1).padStart(2, "0");

      return {
        slug: `post-${index}`,
        title: `Post ${index}`,
        excerpt: "Post excerpt",
        publishedAt: `2026-05-${day}`,
        tags: ["Design"]
      };
    });

    expect(buildActivityFeed({ projects: [], posts: manyPosts, galgames: [] })).toHaveLength(6);
  });

  it("builds feed item type, href, label, and date", () => {
    expect(buildActivityFeed({ projects, posts, galgames })).toEqual([
      {
        type: "galgame",
        label: "Game",
        href: "/library/game",
        date: "2026-04-28"
      },
      {
        type: "post",
        label: "Post",
        href: "/blog/post",
        date: "2026-04-25"
      },
      {
        type: "project",
        label: "Project",
        href: "/projects",
        date: "2026-04-20"
      }
    ]);
  });
});
