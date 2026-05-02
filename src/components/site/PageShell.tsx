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
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 max-w-3xl">
        <p className="mb-3 text-sm uppercase tracking-[0.2em] text-cyan-200/70">Lilac Lab</p>
        <h1 className="text-3xl font-semibold text-cyan-50 sm:text-5xl">{title}</h1>
        <p className="mt-4 text-base leading-7 text-slate-300">{description}</p>
      </div>
      {children}
    </main>
  );
}
