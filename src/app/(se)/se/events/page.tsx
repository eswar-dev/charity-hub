import Link from "next/link";
import { events } from "@/data/events";
import { StatusBadge } from "@/components/shared/StatusBadge";

export default function SEEventsPage() {
  const myEvents = events.filter((e) => e.seId === "se-001");

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="font-display text-3xl font-semibold">My Events</h1>
        <Link href="/se/events/create" className="rounded-full bg-purple-600 px-5 py-2.5 text-sm text-white">
          + Create Event
        </Link>
      </div>
      <ul className="mt-6 space-y-3">
        {myEvents.map((e) => (
          <li key={e.id}>
            <Link
              href={`/se/events/${e.id}`}
              className="flex items-center justify-between rounded-2xl border bg-white p-5 shadow-sm hover:shadow-md"
            >
              <span className="font-medium">{e.title}</span>
              <StatusBadge status={e.status} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
