import Link from "next/link";
import { profile } from "@/data/profile";

export function ProfileConsole() {
  return (
    <section className="panel rounded-lg p-6">
      <p className="text-xs uppercase tracking-[0.22em] text-cyan-200/70">Profile Console</p>
      <h1 className="mt-4 text-4xl font-semibold text-cyan-50 sm:text-5xl">{profile.handle}</h1>
      <p className="mt-4 text-slate-300">{profile.status}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {profile.directions.map((direction) => (
          <span key={direction} className="rounded border border-cyan-200/15 px-3 py-1 text-sm text-cyan-100">
            {direction}
          </span>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        {profile.links.map((link) => (
          <Link key={link.href} href={link.href} className="rounded-md bg-cyan-300/10 px-4 py-2 text-sm text-cyan-100">
            {link.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
