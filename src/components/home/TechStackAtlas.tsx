import { skills } from "@/data/skills";

export function TechStackAtlas() {
  return (
    <section className="lab-section">
      <div className="section-kicker">Tech Stack</div>
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <h2 className="section-title">技术栈不是标签墙，而是我构建系统的工具谱系。</h2>
          <p className="mt-5 max-w-xl text-sm leading-7 text-slate-300">
            主页、后台编辑、GitHub 内容流和未来 Gal Tracker 都围绕这些能力组合展开。这里展示的是当前主要方向，不是简历式堆关键词。
          </p>
        </div>
        <div className="stack-atlas">
          {skills.map((skill, index) => (
            <div key={skill.group} className="stack-row">
              <div className="font-mono text-xs text-cyan-200/55">{String(index + 1).padStart(2, "0")}</div>
              <div>
                <h3 className="text-xl font-semibold text-cyan-50">{skill.group}</h3>
                <p className="mt-1 text-sm text-slate-400">{skill.focus}</p>
              </div>
              <div className="flex flex-wrap justify-start gap-x-4 gap-y-2 lg:justify-end">
                {skill.items.map((item) => (
                  <span key={item} className="tech-word">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
