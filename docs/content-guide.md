# Content Guide

这个站点目前使用静态 TypeScript 数据维护公开内容。大多数日常更新只需要修改 `src/data` 下的文件。

## 修改个人信息

文件：`src/data/profile.ts`

适合放：

- 名字或昵称
- 首页状态文案
- 技术方向
- GitHub、博客、邮箱等公开链接

## 增加项目

文件：`src/data/projects.ts`

新增一条：

```ts
{
  slug: "project-slug",
  title: "项目名称",
  description: "一句话说明项目解决什么问题，当前处于什么状态。",
  tags: ["Next.js", "TypeScript"],
  featured: true,
  updatedAt: "2026-05-02",
  href: "https://github.com/Lil1ac/project"
}
```

`featured: true` 会让项目出现在首页精选区。

## 增加文章索引

文件：`src/data/posts.ts`

新增一条：

```ts
{
  slug: "post-slug",
  title: "文章标题",
  excerpt: "一两句话摘要。",
  publishedAt: "2026-05-02",
  tags: ["Notes", "Development"]
}
```

当前博客是索引页，还没有 `/blog/[slug]` 详情页。后续如果文章数量稳定，再升级为 MDX 博客系统。

## Galgame 数据

文件：`src/data/galgames.ts`

现在保持为空。未来由 `gal-tracker` 导出公开数据后再接入，主页不直接同步 Bangumi 收藏。

## 更新后验证

修改内容后运行：

```powershell
npm run lint
npm run test
npm run build
```

如果三项都通过，再提交并推送。
