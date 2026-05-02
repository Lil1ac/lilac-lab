"use client";

import { useState } from "react";
import type { Post } from "@/lib/types";
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

const emptyPost: Post = {
  slug: "new-post",
  title: "New Post",
  excerpt: "文章摘要",
  publishedAt: new Date().toISOString().slice(0, 10),
  tags: []
};

export function PostsEditor({ initialPosts }: { initialPosts: Post[] }) {
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [posts, setPosts] = useState(initialPosts);

  function updatePost(index: number, nextPost: Post) {
    setPosts(posts.map((post, postIndex) => (postIndex === index ? nextPost : post)));
  }

  async function handleSave() {
    setStatus("Saving...");

    try {
      await saveContent({
        password,
        file: "content/posts.json",
        data: posts,
        message: "content: update posts"
      });
      setStatus("Saved to GitHub. Pull the branch locally to sync this JSON file.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Save failed.");
    }
  }

  return (
    <section className="space-y-4">
      {posts.map((post, index) => (
        <div key={`${post.slug}-${index}`} className="panel rounded-lg p-5">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="text-sm text-slate-300">Title</span>
              <input className="mt-2 w-full rounded-md border border-cyan-200/15 bg-slate-950/60 px-3 py-2 text-cyan-50" value={post.title} onChange={(event) => updatePost(index, { ...post, title: event.target.value })} />
            </label>
            <label className="block">
              <span className="text-sm text-slate-300">Slug</span>
              <input className="mt-2 w-full rounded-md border border-cyan-200/15 bg-slate-950/60 px-3 py-2 text-cyan-50" value={post.slug} onChange={(event) => updatePost(index, { ...post, slug: event.target.value })} />
            </label>
            <label className="block md:col-span-2">
              <span className="text-sm text-slate-300">Excerpt</span>
              <textarea className="mt-2 min-h-24 w-full rounded-md border border-cyan-200/15 bg-slate-950/60 px-3 py-2 text-cyan-50" value={post.excerpt} onChange={(event) => updatePost(index, { ...post, excerpt: event.target.value })} />
            </label>
            <label className="block">
              <span className="text-sm text-slate-300">Published At</span>
              <input className="mt-2 w-full rounded-md border border-cyan-200/15 bg-slate-950/60 px-3 py-2 text-cyan-50" value={post.publishedAt} onChange={(event) => updatePost(index, { ...post, publishedAt: event.target.value })} />
            </label>
            <label className="block">
              <span className="text-sm text-slate-300">Tags, comma separated</span>
              <input className="mt-2 w-full rounded-md border border-cyan-200/15 bg-slate-950/60 px-3 py-2 text-cyan-50" value={tagsToText(post.tags)} onChange={(event) => updatePost(index, { ...post, tags: textToTags(event.target.value) })} />
            </label>
          </div>
          <div className="mt-4 flex justify-end">
            <button type="button" onClick={() => setPosts(posts.filter((_, postIndex) => postIndex !== index))} className="rounded-md border border-red-300/20 px-3 py-2 text-sm text-red-100">
              Remove
            </button>
          </div>
        </div>
      ))}

      <div className="panel rounded-lg p-5">
        <div className="grid gap-4 md:grid-cols-[1fr_auto_auto]">
          <AdminPassword password={password} onPasswordChange={setPassword} />
          <button type="button" onClick={() => setPosts([...posts, emptyPost])} className="self-end rounded-md border border-cyan-200/20 px-5 py-2 text-cyan-100">
            Add Post
          </button>
          <button type="button" onClick={handleSave} className="self-end rounded-md bg-cyan-300/15 px-5 py-2 text-cyan-50 hover:bg-cyan-300/25">
            Save Posts
          </button>
        </div>
        {status ? <p className="mt-4 text-sm text-slate-300">{status}</p> : null}
      </div>
    </section>
  );
}
