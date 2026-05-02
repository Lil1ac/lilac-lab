import { PageShell } from "@/components/site/PageShell";
import { profile } from "@/data/profile";
import { skills } from "@/data/skills";
import { contentPrinciples } from "@/data/siteContent";

export default function AboutPage() {
  return (
    <PageShell title="About" description="关于 Lilac Lab 的方向、状态和长期记录方式。">
      <section className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-cyan-200/60">
            {profile.location} / {profile.name}
          </p>
          <h2 className="mt-4 text-4xl font-semibold leading-tight text-cyan-50 md:text-6xl">{profile.status}</h2>
        </div>
        <div className="space-y-6 text-base leading-8 text-slate-300">
          <p>Lilac Lab 是我的个人主页和长期记录入口。它优先展示正在构建的项目、开发记录、工具想法，以及逐步沉淀下来的个人系统。</p>
          <p>当前重点是把主页本身做成可持续维护的工作台：项目数据独立管理，文章先以索引形式整理，Galgame 记录等 gal-tracker 本地工具成熟后再接入。</p>
          <div className="flex flex-wrap gap-3 pt-2">
            {profile.directions.map((direction) => (
              <span key={direction} className="border border-cyan-100/15 px-3 py-1 text-sm text-cyan-100/80">
                {direction}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="lab-section">
        <div className="section-kicker">Capability</div>
        <div className="stack-atlas">
          {skills.map((skill, index) => (
            <div key={skill.group} className="stack-row">
              <div className="font-mono text-xs text-cyan-200/55">{String(index + 1).padStart(2, "0")}</div>
              <div>
                <h3 className="text-xl font-semibold text-cyan-50">{skill.group}</h3>
                <p className="mt-1 text-sm text-slate-400">{skill.focus}</p>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-2 lg:justify-end">
                {skill.items.map((item) => (
                  <span key={item} className="tech-word">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="lab-section border-b-0">
        <div className="section-kicker">Content Rules</div>
        <div className="grid gap-4 md:grid-cols-2">
          {contentPrinciples.map((principle, index) => (
            <p key={principle} className="border-t border-cyan-100/12 pt-4 text-sm leading-7 text-slate-300">
              <span className="mr-4 font-mono text-cyan-200/45">0{index + 1}</span>
              {principle}
            </p>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
