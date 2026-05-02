import Link from "next/link";
import { galgames } from "@/data/galgames";
import { posts } from "@/data/posts";
import { projects } from "@/data/projects";
import { buildActivityFeed } from "@/lib/content";

export function ActivityFeed() {
  const activities = buildActivityFeed({ projects, posts, galgames });

  return (
    <section className="panel rounded-lg p-5">
      <h2 className="text-sm uppercase tracking-[0.2em] text-cyan-200/70">Activity Feed</h2>
      <div className="mt-5 space-y-4">
        {activities.map((activity) => (
          <Link key={`${activity.type}-${activity.href}`} href={activity.href} className="block border-l border-cyan-200/20 pl-4">
            <div className="text-sm text-cyan-50">{activity.label}</div>
            <div className="mt-1 text-xs text-slate-400">
              {activity.type} · {activity.date}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
