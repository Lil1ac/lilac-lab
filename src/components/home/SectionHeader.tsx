import Link from "next/link";

export function SectionHeader({
  label,
  title,
  description,
  href,
  action
}: {
  label: string;
  title: string;
  description?: string;
  href?: string;
  action?: string;
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <div className="text-xs uppercase tracking-[0.26em] text-cyan-200/60">{label}</div>
        <h2 className="mt-2 text-2xl font-semibold text-cyan-50 md:text-3xl">{title}</h2>
        {description ? <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">{description}</p> : null}
      </div>
      {href && action ? (
        <Link
          href={href}
          className="inline-flex w-fit items-center rounded-md border border-cyan-200/20 px-4 py-2 text-sm text-cyan-100 transition hover:border-cyan-100/45 hover:bg-cyan-300/10"
        >
          {action}
        </Link>
      ) : null}
    </div>
  );
}
