# lilac-lab

[English](README.en.md)

深色科幻数据面板风格的个人主页，赛博朋克终端美学。展示个人信息、项目作品、博客内容和 Galgame 资料库。

## 技术栈

- **框架:** Next.js 15 (App Router)
- **语言:** TypeScript
- **样式:** Tailwind CSS 3.4
- **动画:** Framer Motion
- **图标:** Lucide React
- **测试:** Vitest + Testing Library

## 页面

| 路由 | 说明 |
| --- | --- |
| `/` | 首页仪表盘：个人控制台、指标面板、动态信息流、资料库快照 |
| `/projects` | 项目作品集 |
| `/blog` | 博客文章列表 |
| `/library` | Galgame 资料库（支持筛选） |
| `/library/[slug]` | 单部 Galgame 详情页 |
| `/about` | 关于我 |
| `/admin` | 后台管理面板 |

## 快速开始

```bash
npm install     # 安装依赖
npm run dev     # 启动开发服务器，访问 http://localhost:3000
```

## 命令

| 命令 | 说明 |
| --- | --- |
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 生产构建 |
| `npm run start` | 启动生产服务器 |
| `npm run lint` | 代码检查 |
| `npm test` | 运行测试 |

## 内容管理

内容以静态 JSON 文件存储在 `content/` 目录，可直接编辑或使用后台面板 `/admin` 修改。详见 [docs/content-guide.md](docs/content-guide.md)。

## 项目结构

```
src/
  app/          # 页面路由与 API
  components/   # React 组件 (home, library, site, admin)
  data/         # JSON 数据访问层
  lib/          # 业务逻辑、类型定义、外部 API
content/        # 静态 JSON 文件
docs/           # 设计文档与实施计划
```

## 部署

已部署在 Vercel：[lilac-lab.vercel.app](https://lilac-lab.vercel.app)

```bash
npx vercel --prod
```
