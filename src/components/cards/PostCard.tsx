import Link from "next/link";
import type { Post } from "@/lib/types";

export function PostCard({ post }: { post: Post }) {
  return (
    <Link href="/blog" className="panel block rounded-lg p-5 transition hover:border-violet-200/45">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-semibold text-cyan-50">{post.title}</h3>
        <span className="text-xs text-violet-200/70">{post.publishedAt}</span>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-300">{post.excerpt}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <span key={tag} className="rounded border border-violet-200/15 px-2 py-1 text-xs text-violet-100/80">
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
