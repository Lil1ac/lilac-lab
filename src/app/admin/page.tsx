import { PageShell } from "@/components/site/PageShell";
import { galgames } from "@/data/galgames";
import { posts } from "@/data/posts";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { nowItems, workbenchItems } from "@/data/siteContent";
import Link from "next/link";

const contentStats = [
  { label: "Profile Links", value: profile.links.length, file: "content/profile.json" },
  { label: "Projects", value: projects.length, file: "content/projects.json" },
  { label: "Posts", value: posts.length, file: "content/posts.json" },
  { label: "Now Items", value: nowItems.length, file: "content/site.json" },
  { label: "Gal Records", value: galgames.length, file: "content/galgames.json" }
];

const contentTypes = [
  {
    title: "个人资料",
    file: "content/profile.json",
    href: "/admin/profile",
    fields: ["name", "handle", "status", "directions", "links"],
    description: "控制首页主标题、当前状态、方向标签和快捷入口。"
  },
  {
    title: "项目",
    file: "content/projects.json",
    href: "/admin/projects",
    fields: ["slug", "title", "description", "tags", "featured", "updatedAt", "href"],
    description: "控制 Projects 页面和首页精选项目。"
  },
  {
    title: "文章索引",
    file: "content/posts.json",
    href: "/admin/posts",
    fields: ["slug", "title", "excerpt", "publishedAt", "tags"],
    description: "控制 Blog 页面和首页文章预览。"
  },
  {
    title: "首页模块",
    file: "content/site.json",
    href: "/admin",
    fields: ["nowItems", "workbenchItems", "contentPrinciples"],
    description: "控制首页 Now、内容地图和维护原则。"
  },
  {
    title: "Gal Tracker 记录",
    file: "content/galgames.json",
    href: "/admin",
    fields: ["slug", "bangumiSubjectId", "status", "playHours", "personalRating"],
    description: "当前保持为空，未来由 gal-tracker 导出公开记录后接入。"
  }
];

export default function AdminPage() {
  return (
    <PageShell title="Admin" description="内容控制面板：查看哪些内容会显示在站点上，以及应该修改哪个内容文件。">
      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {contentStats.map((item) => (
          <div key={item.label} className="panel rounded-lg p-4">
            <div className="text-2xl font-semibold text-cyan-50">{item.value}</div>
            <div className="mt-1 text-xs uppercase tracking-[0.16em] text-cyan-200/60">{item.label}</div>
            <code className="mt-3 block break-all text-xs text-slate-400">{item.file}</code>
          </div>
        ))}
      </section>

      <section className="mt-6 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="panel rounded-lg p-6">
          <h2 className="text-xl font-semibold text-cyan-50">内容类型</h2>
          <div className="mt-5 divide-y divide-cyan-200/10">
            {contentTypes.map((type) => (
              <div key={type.file} className="py-5">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="font-medium text-cyan-50">{type.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{type.description}</p>
                  </div>
                  <div className="text-right">
                    <code className="text-xs text-cyan-200/80">{type.file}</code>
                    <Link href={type.href} className="mt-2 block text-sm text-cyan-100">
                      Edit
                    </Link>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {type.fields.map((field) => (
                    <span key={field} className="rounded border border-cyan-200/15 px-2 py-1 text-xs text-cyan-100/80">
                      {field}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="panel rounded-lg p-6">
          <h2 className="text-xl font-semibold text-cyan-50">下一步后台路线</h2>
          <div className="mt-5 space-y-4 text-sm leading-6 text-slate-300">
            <p>
              当前版本把内容从代码迁到了 `content/*.json`，已经具备接入 CMS 的基础。
            </p>
            <p>
              Outstatic 2.x 目前要求 Tailwind 4，和本站 Tailwind 3 存在 peer dependency 冲突。为了不破坏现有界面，
              先保留 Git-backed 内容结构，后续单独评估 Tailwind 4 升级或接入独立 Outstatic Dashboard。
            </p>
            <p>
              现在新增内容时，只需要改 `content` 目录下对应 JSON，然后运行验证命令并提交。
            </p>
          </div>
        </aside>
      </section>

      <section className="panel mt-6 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-cyan-50">首页内容地图</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {workbenchItems.map((item) => (
            <div key={item.title} className="rounded-md border border-cyan-200/10 p-4">
              <div className="font-medium text-cyan-50">{item.title}</div>
              <p className="mt-2 text-sm leading-6 text-slate-300">{item.description}</p>
              <code className="mt-3 block text-xs text-cyan-200/80">{item.file}</code>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
