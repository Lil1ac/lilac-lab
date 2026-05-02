import { PostCard } from "@/components/cards/PostCard";
import { PageShell } from "@/components/site/PageShell";
import { posts } from "@/data/posts";

export default function BlogPage() {
  return (
    <PageShell title="Blog" description="记录开发、设计、阅读和个人系统搭建。">
      <div className="grid gap-4 md:grid-cols-2">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </PageShell>
  );
}
