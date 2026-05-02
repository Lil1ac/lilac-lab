import Link from "next/link";
import { PageShell } from "@/components/site/PageShell";
import { galgames } from "@/data/galgames";
import { posts } from "@/data/posts";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { skills } from "@/data/skills";
import { nowItems, workbenchItems } from "@/data/siteContent";

const modules = [
  {
    title: "Profile",
    file: "content/profile.json",
    href: "/admin/profile",
    preview: "/about",
    count: profile.links.length + profile.directions.length,
    description: "Name, hero copy, current status, direction labels and public links."
  },
  {
    title: "Projects",
    file: "content/projects.json",
    href: "/admin/projects",
    preview: "/projects",
    count: projects.length,
    description: "Project index used by Selected Works and the Projects page."
  },
  {
    title: "Posts",
    file: "content/posts.json",
    href: "/admin/posts",
    preview: "/blog",
    count: posts.length,
    description: "Writing index used by Dev Log and the Blog page."
  },
  {
    title: "Skills",
    file: "content/skills.json",
    href: "/admin/skills",
    preview: "/about",
    count: skills.length,
    description: "Tech stack atlas shown on the homepage and About page."
  },
  {
    title: "Site Copy",
    file: "content/site.json",
    href: "/admin",
    preview: "/",
    count: nowItems.length + workbenchItems.length,
    description: "Now items, system map copy and content maintenance rules. Read-only for now."
  },
  {
    title: "Gal Tracker",
    file: "content/galgames.json",
    href: "/admin",
    preview: "/library",
    count: galgames.length,
    description: "Reserved for future import from gal-tracker. Not manually edited here yet."
  }
];

export default function AdminPage() {
  return (
    <PageShell title="Admin" description="Content control panel. Pick a content type, edit the visible fields, save to GitHub, then preview the public page.">
      <section className="grid gap-4 lg:grid-cols-3">
        {modules.map((module, index) => (
          <div key={module.file} className="border border-cyan-100/12 p-5">
            <div className="flex items-start justify-between gap-4">
              <span className="font-mono text-sm text-cyan-200/45">0{index + 1}</span>
              <span className="text-2xl font-semibold text-cyan-50">{module.count}</span>
            </div>
            <h2 className="mt-8 text-2xl font-semibold text-cyan-50">{module.title}</h2>
            <p className="mt-3 min-h-16 text-sm leading-6 text-slate-300">{module.description}</p>
            <code className="mt-5 block break-all border-t border-cyan-100/10 pt-4 text-xs text-cyan-200/70">
              {module.file}
            </code>
            <div className="mt-5 flex gap-3">
              <Link href={module.href} className="bg-cyan-100 px-4 py-2 text-sm text-slate-950">
                Edit
              </Link>
              <Link href={module.preview} className="border border-cyan-100/20 px-4 py-2 text-sm text-cyan-100">
                Preview
              </Link>
            </div>
          </div>
        ))}
      </section>

      <section className="lab-section border-b-0">
        <div className="section-kicker">Publishing Flow</div>
        <div className="grid gap-4 md:grid-cols-4">
          {["Edit in Admin", "Save to GitHub", "Pull locally or deploy", "Preview public page"].map((step, index) => (
            <div key={step} className="border-t border-cyan-100/12 pt-4">
              <span className="font-mono text-sm text-cyan-200/45">0{index + 1}</span>
              <p className="mt-3 text-lg font-semibold text-cyan-50">{step}</p>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
