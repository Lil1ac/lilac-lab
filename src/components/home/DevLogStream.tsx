import Link from "next/link";
import { posts } from "@/data/posts";

export function DevLogStream() {
  return (
    <section className="lab-section">
      <div className="section-kicker">Dev Log</div>
      <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
        <div>
          <h2 className="section-title">文章区改成日志流，保留持续更新的感觉。</h2>
          <p className="mt-5 text-sm leading-7 text-slate-300">
            现在先展示文章索引；后续文章数量稳定后，再升级成 MDX 正文和单篇详情。
          </p>
        </div>
        <div className="log-stream">
          {posts.map((post) => (
            <Link key={post.slug} href="/blog" className="log-line">
              <time className="font-mono text-xs text-cyan-200/50">{post.publishedAt}</time>
              <div>
                <h3 className="text-xl font-semibold text-cyan-50">{post.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{post.excerpt}</p>
                <div className="mt-3 flex flex-wrap gap-3">
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
      </div>
    </section>
  );
}
