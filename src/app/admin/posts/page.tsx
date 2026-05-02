import { PostsEditor } from "@/components/admin/PostsEditor";
import { PageShell } from "@/components/site/PageShell";
import { posts } from "@/data/posts";

export default function AdminPostsPage() {
  return (
    <PageShell title="Edit Posts" description="新增、删除或修改文章索引，并保存到 GitHub 的 content/posts.json。">
      <PostsEditor initialPosts={posts} />
    </PageShell>
  );
}
