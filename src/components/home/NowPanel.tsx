import Link from "next/link";
import { nowItems } from "@/data/siteContent";

export function NowPanel() {
  return (
    <section>
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/70">Now</p>
          <h2 className="mt-2 text-2xl font-semibold text-cyan-50">当前正在维护的东西</h2>
        </div>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        {nowItems.map((item) => (
          <Link key={item.title} href={item.href} className="panel block rounded-lg p-5 transition hover:border-cyan-200/45">
            <div className="text-xs uppercase tracking-[0.18em] text-cyan-200/60">{item.label}</div>
            <h3 className="mt-3 text-lg font-semibold text-cyan-50">{item.title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-300">{item.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
