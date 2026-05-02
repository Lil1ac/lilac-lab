import Link from "next/link";
import { FileText } from "lucide-react";
import { posts } from "@/data/posts";
import { SectionHeader } from "./SectionHeader";

export function WritingLogs() {
  return (
    <section className="mt-16">
      <SectionHeader
        label="Writing Logs"
        title="把想法、开发过程和复盘留下来"
        description="目前文章先作为索引展示，等内容规模稳定后可以升级成 MDX 详情页。"
        href="/blog"
        action="Read logs"
      />
      <div className="overflow-hidden rounded-lg border border-violet-200/15 bg-slate-950/55">
        {posts.map((post, index) => (
          <Link
            key={post.slug}
            href="/blog"
            className="grid gap-4 border-b border-cyan-200/10 p-5 transition last:border-b-0 hover:bg-cyan-300/[0.04] md:grid-cols-[7rem_1fr_auto]"
          >
            <div className="flex items-center gap-3 text-sm text-violet-100">
              <FileText size={16} />
              <span>LOG-{String(index + 1).padStart(2, "0")}</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-cyan-50">{post.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">{post.excerpt}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="text-xs text-cyan-200/70">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-sm text-slate-500 md:text-right">{post.publishedAt}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
