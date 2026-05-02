import { ActivityFeed } from "@/components/home/ActivityFeed";
import { CommandDeckHero } from "@/components/home/CommandDeckHero";
import { ContactDock } from "@/components/home/ContactDock";
import { FeaturedShowcase } from "@/components/home/FeaturedShowcase";
import { NowPanel } from "@/components/home/NowPanel";
import { SystemsMap } from "@/components/home/SystemsMap";
import { WritingLogs } from "@/components/home/WritingLogs";

export default function HomePage() {
  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <CommandDeckHero />
      <FeaturedShowcase />
      <WritingLogs />
      <SystemsMap />
      <section className="mt-16 grid gap-4 lg:grid-cols-[1fr_0.85fr]">
        <NowPanel />
        <ActivityFeed />
      </section>
      <ContactDock />
    </main>
  );
}
