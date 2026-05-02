"use client";

import { useState } from "react";
import type { SkillGroup } from "@/lib/types";
import { AdminPassword } from "./AdminPassword";
import { saveContent } from "./adminApi";

function parseItems(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function itemsToText(items: string[]) {
  return items.join(", ");
}

const emptySkill: SkillGroup = {
  group: "New Skill Group",
  focus: "能力说明",
  items: ["New Tool"]
};

export function SkillsEditor({ initialSkills }: { initialSkills: SkillGroup[] }) {
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [skills, setSkills] = useState(initialSkills);

  function updateSkill(index: number, nextSkill: SkillGroup) {
    setSkills(skills.map((skill, skillIndex) => (skillIndex === index ? nextSkill : skill)));
  }

  async function handleSave() {
    setStatus("Saving...");

    try {
      await saveContent({
        password,
        file: "content/skills.json",
        data: skills,
        message: "content: update skills"
      });
      setStatus("Saved to GitHub. Pull the branch locally to sync this JSON file.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Save failed.");
    }
  }

  return (
    <section className="grid gap-5 lg:grid-cols-[18rem_1fr]">
      <aside className="border border-cyan-100/12 p-5">
        <p className="text-xs uppercase tracking-[0.28em] text-cyan-200/60">Tech Stack</p>
        <h2 className="mt-4 text-2xl font-semibold text-cyan-50">编辑首页和 About 页的技术栈</h2>
        <p className="mt-4 text-sm leading-6 text-slate-400">
          每一组会显示为一行能力谱系。Items 用英文逗号分隔，适合放框架、工具和方向。
        </p>
      </aside>

      <div className="space-y-4">
        {skills.map((skill, index) => (
          <div key={`${skill.group}-${index}`} className="border border-cyan-100/12 p-5">
            <div className="grid gap-4 md:grid-cols-[1fr_1fr_auto]">
              <label className="block">
                <span className="text-sm text-slate-300">Group</span>
                <input className="admin-input" value={skill.group} onChange={(event) => updateSkill(index, { ...skill, group: event.target.value })} />
              </label>
              <label className="block">
                <span className="text-sm text-slate-300">Focus</span>
                <input className="admin-input" value={skill.focus} onChange={(event) => updateSkill(index, { ...skill, focus: event.target.value })} />
              </label>
              <button type="button" onClick={() => setSkills(skills.filter((_, skillIndex) => skillIndex !== index))} className="self-end border border-red-300/20 px-4 py-2 text-sm text-red-100">
                Remove
              </button>
            </div>
            <label className="mt-4 block">
              <span className="text-sm text-slate-300">Items</span>
              <input className="admin-input" value={itemsToText(skill.items)} onChange={(event) => updateSkill(index, { ...skill, items: parseItems(event.target.value) })} />
            </label>
          </div>
        ))}

        <div className="border border-cyan-100/12 p-5">
          <div className="grid gap-4 md:grid-cols-[1fr_auto_auto]">
            <AdminPassword password={password} onPasswordChange={setPassword} />
            <button type="button" onClick={() => setSkills([...skills, emptySkill])} className="self-end border border-cyan-100/20 px-5 py-2 text-cyan-100">
              Add Group
            </button>
            <button type="button" onClick={handleSave} className="self-end bg-cyan-100 px-5 py-2 text-slate-950">
              Save Skills
            </button>
          </div>
          {status ? <p className="mt-4 text-sm text-slate-300">{status}</p> : null}
        </div>
      </div>
    </section>
  );
}
