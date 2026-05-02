"use client";

import { useState } from "react";
import { AdminPassword } from "./AdminPassword";
import { saveContent } from "./adminApi";

type ProfileContent = {
  name: string;
  handle: string;
  status: string;
  location: string;
  directions: string[];
  links: Array<{ label: string; href: string }>;
};

function parseLines(value: string) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseLinks(value: string) {
  return parseLines(value).map((line) => {
    const [label = "", href = ""] = line.split("|").map((part) => part.trim());
    return { label, href };
  });
}

export function ProfileEditor({ initialProfile }: { initialProfile: ProfileContent }) {
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [profile, setProfile] = useState({
    ...initialProfile,
    directionsText: initialProfile.directions.join("\n"),
    linksText: initialProfile.links.map((link) => `${link.label} | ${link.href}`).join("\n")
  });

  async function handleSave() {
    setStatus("Saving...");
    const data = {
      name: profile.name,
      handle: profile.handle,
      status: profile.status,
      location: profile.location,
      directions: parseLines(profile.directionsText),
      links: parseLinks(profile.linksText)
    };

    try {
      await saveContent({
        password,
        file: "content/profile.json",
        data,
        message: "content: update profile"
      });
      setStatus("Saved to GitHub. Pull the branch locally to sync this JSON file.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Save failed.");
    }
  }

  return (
    <section className="panel rounded-lg p-6">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="text-sm text-slate-300">Name</span>
          <input className="mt-2 w-full rounded-md border border-cyan-200/15 bg-slate-950/60 px-3 py-2 text-cyan-50" value={profile.name} onChange={(event) => setProfile({ ...profile, name: event.target.value })} />
        </label>
        <label className="block">
          <span className="text-sm text-slate-300">Handle</span>
          <input className="mt-2 w-full rounded-md border border-cyan-200/15 bg-slate-950/60 px-3 py-2 text-cyan-50" value={profile.handle} onChange={(event) => setProfile({ ...profile, handle: event.target.value })} />
        </label>
        <label className="block md:col-span-2">
          <span className="text-sm text-slate-300">Status</span>
          <input className="mt-2 w-full rounded-md border border-cyan-200/15 bg-slate-950/60 px-3 py-2 text-cyan-50" value={profile.status} onChange={(event) => setProfile({ ...profile, status: event.target.value })} />
        </label>
        <label className="block">
          <span className="text-sm text-slate-300">Location</span>
          <input className="mt-2 w-full rounded-md border border-cyan-200/15 bg-slate-950/60 px-3 py-2 text-cyan-50" value={profile.location} onChange={(event) => setProfile({ ...profile, location: event.target.value })} />
        </label>
        <label className="block">
          <span className="text-sm text-slate-300">Directions, one per line</span>
          <textarea className="mt-2 min-h-32 w-full rounded-md border border-cyan-200/15 bg-slate-950/60 px-3 py-2 text-cyan-50" value={profile.directionsText} onChange={(event) => setProfile({ ...profile, directionsText: event.target.value })} />
        </label>
        <label className="block md:col-span-2">
          <span className="text-sm text-slate-300">Links, one per line: label | href</span>
          <textarea className="mt-2 min-h-32 w-full rounded-md border border-cyan-200/15 bg-slate-950/60 px-3 py-2 text-cyan-50" value={profile.linksText} onChange={(event) => setProfile({ ...profile, linksText: event.target.value })} />
        </label>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-[1fr_auto]">
        <AdminPassword password={password} onPasswordChange={setPassword} />
        <button type="button" onClick={handleSave} className="self-end rounded-md bg-cyan-300/15 px-5 py-2 text-cyan-50 hover:bg-cyan-300/25">
          Save Profile
        </button>
      </div>
      {status ? <p className="mt-4 text-sm text-slate-300">{status}</p> : null}
    </section>
  );
}
