# Content Guide

这个站点目前使用 `content/*.json` 维护公开内容，`src/data` 只负责把 JSON 包装成类型安全的数据。

可以先打开 `/admin` 查看当前内容类型、数量和对应文件。

## 修改个人信息

文件：`content/profile.json`

适合放：

- 名字或昵称
- 首页状态文案
- 技术方向
- GitHub、博客、邮箱等公开链接

## 增加项目

文件：`content/projects.json`

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

文件：`content/posts.json`

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

文件：`content/galgames.json`

现在保持为空。未来由 `gal-tracker` 导出公开数据后再接入，主页不直接同步 Bangumi 收藏。

## 管理面板

路径：`/admin`

当前 `/admin` 是内容控制面板和维护入口，用来查看内容数量、字段和文件位置。它还不是可写 CMS。

后续有两种升级路线：

- 升级 Tailwind 4 后接入 Outstatic 2.x。
- 保持当前样式系统，接入独立 Git-backed Dashboard 或自建写入 Git 的后台。

## 更新后验证

修改内容后运行：

```powershell
npm run lint
npm run test
npm run build
```

如果三项都通过，再提交并推送。
