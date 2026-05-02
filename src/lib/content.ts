import type { GalgameRecord, Post, Project } from "./types";

type ContentInput = {
  projects: Project[];
  posts: Post[];
  galgames: GalgameRecord[];
};

export function buildMetrics({ projects, posts, galgames }: ContentInput) {
  return {
    projects: projects.length,
    posts: posts.length,
    galgames: galgames.length,
    completedGalgames: galgames.filter((game) => game.status === "completed").length,
    playHours: galgames.reduce((sum, game) => sum + game.playHours, 0)
  };
}

export function buildActivityFeed({ projects, posts, galgames }: ContentInput) {
  return [
    ...projects.map((project) => ({
      type: "project" as const,
      label: project.title,
      href: project.href,
      date: project.updatedAt
    })),
    ...posts.map((post) => ({
      type: "post" as const,
      label: post.title,
      href: "/blog",
      date: post.publishedAt
    })),
    ...galgames.map((game) => ({
      type: "galgame" as const,
      label: game.title,
      href: `/library/${game.slug}`,
      date: game.updatedAt
    }))
  ]
    .sort((left, right) => new Date(right.date).getTime() - new Date(left.date).getTime())
    .slice(0, 6);
}
