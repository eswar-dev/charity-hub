import Link from "next/link";
import { events } from "@/data/events";
import { socialEntrepreneurs } from "@/data/users";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { activeChallenges } from "@/data/challenges";
import { seActivityFeed } from "@/data/activityFeed";
import { ActivityFeedList } from "@/components/social/ActivityFeedList";

const alex = socialEntrepreneurs[0];
const myEvents = events.filter((e) => e.seId === alex.id);

export default function SEDashboardPage() {
  const participants = myEvents.reduce((s, e) => s + (e.participants || 0), 0);
  const raised = myEvents.reduce((s, e) => s + e.raised, 0);

  return (
    <div className="space-y-8">
      <section className="rounded-2xl bg-gradient-to-r from-[var(--ch-teal)] to-[var(--ch-navy)] p-8 text-white">
        <h1 className="font-display text-2xl font-semibold">{alex.name}&apos;s Impact</h1>
        <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {[
            { value: participants || 284, label: "participants" },
            { value: `$${raised.toLocaleString()}`, label: "raised" },
            { value: myEvents.length, label: "events" },
            { value: "9,420", label: "impact score" },
          ].map((stat) => (
            <div key={stat.label}>
              <p
                className="text-4xl font-bold"
                style={{ fontFamily: "var(--font-impact)" }}
              >
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-teal-100">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="font-semibold text-[var(--ch-navy)]">⚡ Live Activity</h2>
        <ActivityFeedList items={seActivityFeed} />
      </section>

      <section className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="font-semibold text-[var(--ch-navy)]">Challenges You&apos;ve Created</h2>
        <ul className="mt-4 space-y-2 text-sm">
          {activeChallenges
            .filter((c) => c.seId === alex.id)
            .map((c) => (
              <li key={c.id} className="flex justify-between border-b py-2 last:border-0">
                <span className="font-medium">{c.challengeTag}</span>
                <span className="text-gray-500">
                  {c.acceptedCount} accepted · ${c.donationUnlocked * c.acceptedCount} unlocked
                </span>
              </li>
            ))}
        </ul>
        <Link href="/se/events/create" className="mt-4 inline-block text-sm font-medium text-purple-600">
          + Create New Challenge
        </Link>
      </section>

      <section>
        <h2 className="mb-4 font-semibold text-[var(--ch-navy)]">My Events</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {myEvents.map((e) => (
            <Link
              key={e.id}
              href={`/se/events/${e.id}`}
              className="rounded-2xl border bg-white p-5 shadow-sm hover:shadow-md"
            >
              <StatusBadge status={e.status} />
              <h3 className="mt-2 font-semibold">{e.title}</h3>
              <p className="mt-1 text-xs text-gray-500">
                {e.participants || 0} participating · ${e.raised.toLocaleString()} raised
              </p>
            </Link>
          ))}
        </div>
      </section>

      <div className="flex flex-wrap gap-3">
        <Link href="/se/events/create" className="rounded-full bg-purple-600 px-5 py-2.5 text-sm text-white">
          Create New Event
        </Link>
        <Link href="/se/profile" className="rounded-lg border px-4 py-2 text-sm">
          View Profile
        </Link>
        <Link href="/feed" className="rounded-lg border px-4 py-2 text-sm">
          Community Feed
        </Link>
      </div>
    </div>
  );
}
