import { galgames } from "@/data/galgames";
import { posts } from "@/data/posts";
import { projects } from "@/data/projects";
import { buildMetrics } from "@/lib/content";

const labels = {
  projects: "Projects",
  posts: "Posts",
  galgames: "Library Items",
  completedGalgames: "Completed",
  playHours: "Tracked Hours"
};

export function SignalMetrics() {
  const metrics = buildMetrics({ projects, posts, galgames });

  return (
    <section className="grid grid-cols-2 gap-3 sm:grid-cols-5 lg:grid-cols-1">
      {Object.entries(metrics).map(([key, value]) => (
        <div key={key} className="panel rounded-lg p-4">
          <div className="text-2xl font-semibold text-cyan-50">{value}</div>
          <div className="mt-1 text-xs uppercase tracking-[0.16em] text-cyan-200/60">
            {labels[key as keyof typeof labels]}
          </div>
        </div>
      ))}
    </section>
  );
}
