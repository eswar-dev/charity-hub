import Link from "next/link";
import { events } from "@/data/events";
import { socialEntrepreneurs } from "@/data/users";
import { StatusBadge } from "@/components/shared/StatusBadge";

const alex = socialEntrepreneurs[0];
const myEvents = events.filter((e) => e.seId === alex.id);

export default function SEDashboardPage() {
  return (
    <div className="space-y-8">
      <div className="rounded-2xl bg-gradient-to-r from-purple-600 to-purple-800 p-8 text-white">
        <h1 className="font-display text-2xl font-semibold">Welcome back, {alex.name} 👋</h1>
        <p className="mt-2 opacity-90">Any event can become a reason to give.</p>
      </div>

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
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 font-semibold">Engagement Feed</h2>
        <div className="space-y-3">
          {["New comment on Knockout ALS", "3 new donors joined", "Share milestone reached"].map((post) => (
            <div key={post} className="rounded-xl border bg-white p-4 text-sm">
              {post}
            </div>
          ))}
        </div>
      </section>

      <div className="flex flex-wrap gap-3">
        <Link href="/se/events/create" className="rounded-full bg-purple-600 px-5 py-2.5 text-sm text-white">
          Create New Event
        </Link>
        <Link href="/se/profile" className="rounded-lg border px-4 py-2 text-sm">View Profile</Link>
        <Link href="/events" className="rounded-lg border px-4 py-2 text-sm">Browse Events</Link>
      </div>
    </div>
  );
}
