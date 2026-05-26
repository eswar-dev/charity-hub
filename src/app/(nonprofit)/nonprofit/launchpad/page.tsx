import Link from "next/link";
import Image from "next/image";
import { nonprofits } from "@/data/nonprofits";
import { events } from "@/data/events";
import { StatusBadge } from "@/components/shared/StatusBadge";

const np = nonprofits[0];

export default function LaunchpadPage() {
  const myEvents = events.filter((e) => e.nonprofitId === np.id);

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Image src={np.logo} alt="" width={64} height={64} className="rounded-2xl" />
        <div>
          <h1 className="font-display text-3xl font-semibold text-[var(--ch-navy)]">
            {np.name}
          </h1>
          <div className="mt-2 flex gap-2">
            <StatusBadge status="Active" />
            <StatusBadge status="Settlement Pending" />
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Donations Raised", value: `$${np.totalRaised.toLocaleString()}` },
          { label: "Active Events", value: String(np.eventsCount) },
          { label: "Pending Approvals", value: "2" },
          { label: "Donors This Month", value: "47" },
        ].map((m) => (
          <div key={m.label} className="rounded-2xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">{m.label}</p>
            <p className="font-display mt-2 text-2xl font-bold">{m.value}</p>
          </div>
        ))}
      </div>

      <section className="rounded-2xl border bg-white shadow-sm overflow-hidden">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="font-semibold">My Events</h2>
          <Link
            href="/nonprofit/events/create"
            className="rounded-full bg-[var(--ch-teal)] px-4 py-2 text-sm text-white"
          >
            + Create Event
          </Link>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-6 py-3 text-left">Event</th>
              <th className="px-6 py-3 text-left">Type</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Donations</th>
            </tr>
          </thead>
          <tbody>
            {myEvents.map((e) => (
              <tr key={e.id} className="border-t">
                <td className="px-6 py-3">
                  <Link href={`/nonprofit/events/${e.id}`} className="font-medium text-[var(--ch-teal)]">
                    {e.title}
                  </Link>
                </td>
                <td className="px-6 py-3">{e.type}</td>
                <td className="px-6 py-3">
                  <StatusBadge status={e.status} />
                </td>
                <td className="px-6 py-3">${e.raised.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <div className="flex flex-wrap gap-3">
        <Link href="/nonprofit/events/create" className="rounded-lg border px-4 py-2 text-sm font-medium">
          Create Event
        </Link>
        <Link href="/nonprofit/approvals" className="rounded-lg border px-4 py-2 text-sm font-medium">
          View Approvals
        </Link>
        <Link href="/nonprofit/settings" className="rounded-lg border px-4 py-2 text-sm font-medium">
          Settings
        </Link>
      </div>
    </div>
  );
}
