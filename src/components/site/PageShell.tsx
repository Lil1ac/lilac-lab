import type { ReactNode } from "react";

export function PageShell({
  title,
  description,
  children
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-14 border-b border-cyan-100/12 pb-10">
        <p className="mb-5 text-xs uppercase tracking-[0.34em] text-cyan-200/60">Lilac Lab / {title}</p>
        <h1 className="max-w-5xl text-[clamp(3.2rem,9vw,8.5rem)] font-semibold leading-[0.86] text-cyan-50">
          {title}
        </h1>
        <p className="mt-7 max-w-2xl text-base leading-8 text-slate-300">{description}</p>
      </div>
      {children}
    </main>
  );
}
