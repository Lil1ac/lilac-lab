"use client";

import { useState } from "react";
import type { Project } from "@/lib/types";
import { AdminPassword } from "./AdminPassword";
import { saveContent } from "./adminApi";

function tagsToText(tags: string[]) {
  return tags.join(", ");
}

function textToTags(text: string) {
  return text
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

const emptyProject: Project = {
  slug: "new-project",
  title: "New Project",
  description: "项目说明",
  tags: [],
  featured: false,
  updatedAt: new Date().toISOString().slice(0, 10),
  href: "/projects"
};

export function ProjectsEditor({ initialProjects }: { initialProjects: Project[] }) {
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [projects, setProjects] = useState(initialProjects);

  function updateProject(index: number, nextProject: Project) {
    setProjects(projects.map((project, projectIndex) => (projectIndex === index ? nextProject : project)));
  }

  async function handleSave() {
    setStatus("Saving...");

    try {
      await saveContent({
        password,
        file: "content/projects.json",
        data: projects,
        message: "content: update projects"
      });
      setStatus("Saved to GitHub. Pull the branch locally to sync this JSON file.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Save failed.");
    }
  }

  return (
    <section className="space-y-4">
      {projects.map((project, index) => (
        <div key={`${project.slug}-${index}`} className="panel rounded-lg p-5">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="text-sm text-slate-300">Title</span>
              <input className="mt-2 w-full rounded-md border border-cyan-200/15 bg-slate-950/60 px-3 py-2 text-cyan-50" value={project.title} onChange={(event) => updateProject(index, { ...project, title: event.target.value })} />
            </label>
            <label className="block">
              <span className="text-sm text-slate-300">Slug</span>
              <input className="mt-2 w-full rounded-md border border-cyan-200/15 bg-slate-950/60 px-3 py-2 text-cyan-50" value={project.slug} onChange={(event) => updateProject(index, { ...project, slug: event.target.value })} />
            </label>
            <label className="block md:col-span-2">
              <span className="text-sm text-slate-300">Description</span>
              <textarea className="mt-2 min-h-24 w-full rounded-md border border-cyan-200/15 bg-slate-950/60 px-3 py-2 text-cyan-50" value={project.description} onChange={(event) => updateProject(index, { ...project, description: event.target.value })} />
            </label>
            <label className="block">
              <span className="text-sm text-slate-300">Tags, comma separated</span>
              <input className="mt-2 w-full rounded-md border border-cyan-200/15 bg-slate-950/60 px-3 py-2 text-cyan-50" value={tagsToText(project.tags)} onChange={(event) => updateProject(index, { ...project, tags: textToTags(event.target.value) })} />
            </label>
            <label className="block">
              <span className="text-sm text-slate-300">Updated At</span>
              <input className="mt-2 w-full rounded-md border border-cyan-200/15 bg-slate-950/60 px-3 py-2 text-cyan-50" value={project.updatedAt} onChange={(event) => updateProject(index, { ...project, updatedAt: event.target.value })} />
            </label>
            <label className="block md:col-span-2">
              <span className="text-sm text-slate-300">Href</span>
              <input className="mt-2 w-full rounded-md border border-cyan-200/15 bg-slate-950/60 px-3 py-2 text-cyan-50" value={project.href} onChange={(event) => updateProject(index, { ...project, href: event.target.value })} />
            </label>
          </div>
          <div className="mt-4 flex items-center justify-between gap-3">
            <label className="flex items-center gap-2 text-sm text-slate-300">
              <input type="checkbox" checked={project.featured} onChange={(event) => updateProject(index, { ...project, featured: event.target.checked })} />
              Featured on homepage
            </label>
            <button type="button" onClick={() => setProjects(projects.filter((_, projectIndex) => projectIndex !== index))} className="rounded-md border border-red-300/20 px-3 py-2 text-sm text-red-100">
              Remove
            </button>
          </div>
        </div>
      ))}

      <div className="panel rounded-lg p-5">
        <div className="grid gap-4 md:grid-cols-[1fr_auto_auto]">
          <AdminPassword password={password} onPasswordChange={setPassword} />
          <button type="button" onClick={() => setProjects([...projects, emptyProject])} className="self-end rounded-md border border-cyan-200/20 px-5 py-2 text-cyan-100">
            Add Project
          </button>
          <button type="button" onClick={handleSave} className="self-end rounded-md bg-cyan-300/15 px-5 py-2 text-cyan-50 hover:bg-cyan-300/25">
            Save Projects
          </button>
        </div>
        {status ? <p className="mt-4 text-sm text-slate-300">{status}</p> : null}
      </div>
    </section>
  );
}
