import { PostCard } from "@/components/cards/PostCard";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { DashboardHero } from "@/components/home/DashboardHero";
import { posts } from "@/data/posts";
import { projects } from "@/data/projects";

export default function HomePage() {
  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <DashboardHero />
      <section className="mt-10 grid gap-4 lg:grid-cols-2">
        {projects
          .filter((project) => project.featured)
          .map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        {posts.slice(0, 2).map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </section>
    </main>
  );
}
