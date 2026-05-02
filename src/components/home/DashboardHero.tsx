import { ActivityFeed } from "./ActivityFeed";
import { LibrarySnapshot } from "./LibrarySnapshot";
import { ProfileConsole } from "./ProfileConsole";
import { SignalMetrics } from "./SignalMetrics";

export function DashboardHero() {
  return (
    <section className="grid gap-4 lg:grid-cols-[1.2fr_1fr_0.7fr]">
      <ProfileConsole />
      <div className="grid gap-4">
        <ActivityFeed />
        <LibrarySnapshot />
      </div>
      <SignalMetrics />
    </section>
  );
}
