import Link from "next/link";

const systems = [
  {
    name: "Homepage",
    href: "/",
    state: "online",
    text: "个人主页和内容入口，承载项目、文章和公开信息。"
  },
  {
    name: "Gal Tracker",
    href: "/library",
    state: "building",
    text: "未来接入本地 galgame 记录软件，不依赖 Bangumi 作为主数据源。"
  },
  {
    name: "Content Admin",
    href: "/admin",
    state: "private",
    text: "通过 UI 修改 JSON 内容，并保存到 GitHub 分支。"
  },
  {
    name: "Writing Archive",
    href: "/blog",
    state: "growing",
    text: "开发记录、复盘和长期思考的索引。"
  }
];

export function LabSystems() {
  return (
    <section className="lab-section">
      <div className="section-kicker">Lab Systems</div>
      <div className="system-map">
        {systems.map((system, index) => (
          <Link key={system.name} href={system.href} className="system-node">
            <div className="flex items-center justify-between gap-6">
              <span className="font-mono text-sm text-cyan-200/45">0{index + 1}</span>
              <span className="text-xs uppercase tracking-[0.2em] text-violet-100/55">{system.state}</span>
            </div>
            <h3 className="mt-10 text-2xl font-semibold text-cyan-50">{system.name}</h3>
            <p className="mt-4 text-sm leading-6 text-slate-300">{system.text}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
