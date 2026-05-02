import { PageShell } from "@/components/site/PageShell";
import { profile } from "@/data/profile";

export default function AboutPage() {
  return (
    <PageShell title="About" description="关于 Lilac Lab 的方向、状态和长期记录。">
      <section className="panel max-w-3xl rounded-lg p-6">
        <h2 className="text-xl font-semibold text-cyan-50">{profile.name}</h2>
        <p className="mt-4 leading-7 text-slate-300">
          这里会逐步整理个人介绍、技术方向、项目经历、博客索引和 Galgame Library 的维护说明。
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {profile.directions.map((direction) => (
            <span key={direction} className="rounded border border-cyan-200/15 px-3 py-1 text-sm text-cyan-100">
              {direction}
            </span>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
