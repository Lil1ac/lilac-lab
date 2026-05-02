import { ContactDock } from "@/components/home/ContactDock";
import { DevLogStream } from "@/components/home/DevLogStream";
import { InteractiveHero } from "@/components/home/InteractiveHero";
import { LabSystems } from "@/components/home/LabSystems";
import { SelectedWorks } from "@/components/home/SelectedWorks";
import { TechStackAtlas } from "@/components/home/TechStackAtlas";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <InteractiveHero />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <TechStackAtlas />
        <SelectedWorks />
        <DevLogStream />
        <LabSystems />
        <ContactDock />
      </div>
    </main>
  );
}
