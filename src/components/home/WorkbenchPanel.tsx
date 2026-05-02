import { contentPrinciples, workbenchItems } from "@/data/siteContent";

export function WorkbenchPanel() {
  return (
    <section className="mt-10 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="panel rounded-lg p-6">
        <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/70">Content Map</p>
        <h2 className="mt-2 text-2xl font-semibold text-cyan-50">内容从哪里改</h2>
        <div className="mt-6 divide-y divide-cyan-200/10">
          {workbenchItems.map((item) => (
            <div key={item.title} className="grid gap-3 py-4 sm:grid-cols-[0.6fr_1fr_0.8fr]">
              <div className="font-medium text-cyan-50">{item.title}</div>
              <div className="text-sm leading-6 text-slate-300">{item.description}</div>
              <div className="text-sm text-cyan-100">
                <span className="block text-slate-400">{item.action}</span>
                <code className="mt-1 block break-all text-xs text-cyan-200/80">{item.file}</code>
              </div>
            </div>
          ))}
        </div>
      </div>
      <aside className="panel rounded-lg p-6">
        <p className="text-xs uppercase tracking-[0.2em] text-violet-200/70">Rules</p>
        <h2 className="mt-2 text-2xl font-semibold text-cyan-50">上线内容原则</h2>
        <ul className="mt-6 space-y-4 text-sm leading-6 text-slate-300">
          {contentPrinciples.map((principle) => (
            <li key={principle} className="border-l border-violet-200/25 pl-4">
              {principle}
            </li>
          ))}
        </ul>
      </aside>
    </section>
  );
}
