import Link from "next/link";
import { events } from "@/data/events";
import { StatusBadge } from "@/components/shared/StatusBadge";

export default function AdminEventsPage() {
  return (
    <div>
      <Link href="/admin" className="text-sm text-[var(--ch-teal)]">← Back</Link>
      <h1 className="font-display mt-4 text-3xl font-semibold text-[var(--ch-navy)]">
        Event Moderation
      </h1>
      <div className="mt-6 overflow-hidden rounded-2xl border bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="border-b bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-3 text-left">Event</th>
              <th className="px-4 py-3 text-left">Type</th>
              <th className="px-4 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {events.map((e) => (
              <tr key={e.id} className="border-b">
                <td className="px-4 py-3 font-medium">{e.title}</td>
                <td className="px-4 py-3">{e.type}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={e.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
