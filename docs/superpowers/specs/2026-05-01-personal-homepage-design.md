# Personal Homepage Design Spec

## 目标

构建一个深色科幻数据面板风的综合型个人主页。站点用于展示个人信息、项目作品、博客内容，并将 Galgame Library 作为明显的个人特色模块。第一版目标是可上线、可维护、可扩展，不引入后台、登录、评论或复杂同步系统。

## 站点定位

站点不是传统简历页，而是一个个人数字档案面板。首页以 Dashboard 形式呈现访客最需要理解的信息：用户是谁、正在做什么、有何项目、写过什么内容、有哪些 Galgame 游玩记录。

整体语言为中文为主、英文点缀。导航、说明、博客和个人记录主要使用中文；模块标题、技术名词、项目名、游戏名可以保留英文或原文。第一版不做语言切换。

## 信息架构

第一版包含以下页面：

```txt
/
  首页 Dashboard

/projects
  项目列表

/blog
  博客列表

/library
  Galgame 资料库

/library/[slug]
  单个 Galgame 详情页

/about
  关于我
```

首页承担核心入口作用，各独立页面承接更完整的信息浏览。

## 首页设计

首页首屏采用深色科幻数据面板风 Dashboard，而不是传统 Hero 页面。

首屏核心区块：

- Profile Console：展示昵称、身份标签、当前状态、技术方向和快捷入口。
- Signal Metrics：展示项目数、文章数、Galgame 数量、通关数、总游玩时长等统计。
- Activity Feed：展示最近项目、最近文章和最近 Galgame 游玩记录。
- Galgame Library Snapshot：展示封面墙、最近游玩和推荐作品，作为明显特色模块。

下方内容区：

- Featured Projects：精选项目预览。
- Latest Posts：最新或精选博客。
- Galgame Library Preview：更完整的资料库入口。
- Contact：联系方式和外部链接。

首页信息密度应高于普通个人主页，但低于后台管理系统。首屏必须让访客快速理解这是个人主页，而不是纯数据大屏。

## 视觉风格

采用深色科技感与科幻数据面板风：

- 深色背景。
- 细线框、网格背景、局部扫描线。
- 半透明信息面板。
- 柔和 cyan、blue、violet 高亮。
- 小型状态指示灯和数据标签。
- 轻量滚动进入动画和悬停反馈。

约束：

- 避免满屏复杂粒子导致性能下降。
- 避免过度霓虹和低质发光效果。
- 避免卡片套卡片。
- 避免动效遮挡或延迟核心内容。
- 移动端必须保持可读和可操作。

## Galgame Library

Galgame Library 是站点的明显特色模块，首页首屏和独立 `/library` 页面都应体现其存在感。

第一版 `/library` 功能：

- 封面墙或列表视图。
- 状态筛选：想玩、游玩中、已通关、搁置等。
- 评分筛选。
- 标签筛选。
- 年份筛选。
- 排序：游玩时间、个人评分、更新时间。

第一版 `/library/[slug]` 功能：

- Bangumi 公共元数据：标题、中文名、封面、简介、评分、排名、链接等。
- 本地个人记录：游玩状态、开始时间、通关时间、游玩时长、个人评分、平台、标签、短评或备注。

## 数据策略

Galgame 数据采用本地数据加 Bangumi 元数据补全。

本地数据负责个人记录，例如：

```ts
{
  slug: "summer-pockets",
  bangumiSubjectId: 253997,
  status: "completed",
  startDate: "2025-07-01",
  finishDate: "2025-08-10",
  playHours: 65,
  personalRating: 9,
  tags: ["Key", "泣きゲー", "夏"],
  platform: "Steam",
  note: "个人短评"
}
```

Bangumi API 负责公共元数据补全。请求必须使用规范 User-Agent。第一版只做读取和补全，不做 OAuth 登录和收藏自动同步。后续如需同步 Bangumi 收藏，再单独设计 OAuth 流程、缓存策略和隐私控制。

## 技术方案

推荐技术栈：

- Next.js
- TypeScript
- Tailwind CSS
- Framer Motion
- MDX

模块边界：

- `app` 或 `pages`：页面路由。
- `components`：通用 UI 与页面区块组件。
- `content` 或 `data`：项目、博客、Galgame 本地数据。
- `lib/bangumi`：Bangumi API 客户端、类型和缓存逻辑。
- `lib/content`：内容读取、排序、筛选和聚合逻辑。

## 第一版范围

第一版包含：

- 首页 Dashboard。
- 项目列表入口。
- 博客列表入口。
- 关于我页面。
- Galgame Library 列表页。
- Galgame 详情页。
- 本地 Galgame 数据结构。
- Bangumi 元数据读取与缓存。
- 基础筛选和排序。
- 响应式适配。
- 基础 SEO。

第一版不包含：

- 后台管理。
- 用户登录。
- 评论系统。
- 完整中英双语切换。
- Bangumi OAuth 自动同步。
- 复杂统计大屏。

## 成功标准

- 首页首屏能清晰表达个人主页、项目、博客和 Galgame Library 四个核心方向。
- Galgame Library 在首页中具有明显存在感。
- 本地数据结构支持后续扩展统计、时间线和自动同步。
- 页面在桌面和移动端均可读、可导航、无明显布局重叠。
- 外部 API 失败时页面仍能展示本地记录，并给出合理降级。

