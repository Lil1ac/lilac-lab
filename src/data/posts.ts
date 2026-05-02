import type { Post } from "@/lib/types";

export const posts: Post[] = [
  {
    slug: "homepage-design-log",
    title: "Lilac Lab 的第一版设计",
    excerpt: "记录这个站点如何从个人主页扩展成项目、文章和个人工具入口。",
    publishedAt: "2026-05-01",
    tags: ["Design", "Homepage"]
  },
  {
    slug: "gal-tracker-direction",
    title: "Gal Tracker 开发方向",
    excerpt: "整理本地 Galgame 记录工具的目标：以自己的数据为主，而不是完全依赖外部平台同步。",
    publishedAt: "2026-05-02",
    tags: ["Gal Tracker", "Product"]
  },
  {
    slug: "personal-systems",
    title: "个人系统的长期维护",
    excerpt: "把项目、记录和工具放进同一个站点，让主页成为持续更新的个人工作台。",
    publishedAt: "2026-05-02",
    tags: ["Notes", "Workflow"]
  }
];
