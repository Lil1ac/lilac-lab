import Link from "next/link";
import { PageShell } from "@/components/site/PageShell";
import { posts } from "@/data/posts";

export default function BlogPage() {
  return (
    <PageShell title="Dev Log" description="开发记录、设计复盘和个人系统维护日志。现在先作为文章索引，后续升级为 MDX 详情。">
      <div className="log-stream">
        {posts.map((post) => (
          <Link key={post.slug} href="/blog" className="log-line">
            <time className="font-mono text-xs text-cyan-200/50">{post.publishedAt}</time>
            <div>
              <h2 className="text-2xl font-semibold text-cyan-50">{post.title}</h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">{post.excerpt}</p>
              <div className="mt-4 flex flex-wrap gap-3">
                {post.tags.map((tag) => (
                  <span key={tag} className="text-xs text-violet-100/65">
                    /{tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
