import { PageShell } from "@/components/site/PageShell";
import { profile } from "@/data/profile";

export default function AboutPage() {
  return (
    <PageShell title="About" description="关于 Lilac Lab 的方向、状态和长期记录。">
      <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="panel rounded-lg p-6">
          <h2 className="text-xl font-semibold text-cyan-50">{profile.name}</h2>
          <div className="mt-4 space-y-4 leading-7 text-slate-300">
            <p>
              Lilac Lab 是我的个人主页和长期记录入口。这里会优先展示正在构建的项目、开发记录、
              工具想法，以及逐步沉淀下来的个人系统。
            </p>
            <p>
              当前重点是把主页本身做成一个可持续维护的工作台：项目数据独立管理，文章先以索引形式整理，
              Galgame 记录则等待 gal-tracker 本地工具成熟后再接入。
            </p>
          </div>
        </div>
        <aside className="panel rounded-lg p-6">
          <h3 className="text-sm uppercase tracking-[0.2em] text-cyan-200/70">Focus</h3>
          <div className="mt-5 flex flex-wrap gap-2">
            {profile.directions.map((direction) => (
              <span key={direction} className="rounded border border-cyan-200/15 px-3 py-1 text-sm text-cyan-100">
                {direction}
              </span>
            ))}
          </div>
          <p className="mt-5 text-sm leading-6 text-slate-400">
            站点内容会随项目推进逐步更新，避免用虚假的完成度填充页面。
          </p>
        </aside>
      </section>
    </PageShell>
  );
}
