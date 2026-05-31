"use client";

import Link from "next/link";
import { useState } from "react";
import { CdnImage } from "@/components/shared/CdnImage";
import { nonprofits } from "@/data/nonprofits";
import { events } from "@/data/events";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { nonprofitActivityFeed } from "@/data/activityFeed";
import { ActivityFeedList } from "@/components/social/ActivityFeedList";

const np = nonprofits[0];

export default function LaunchpadPage() {
  const [financeOpen, setFinanceOpen] = useState(false);
  const myEvents = events.filter((e) => e.nonprofitId === np.id);

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <CdnImage
          src={np.logo}
          alt=""
          width={64}
          height={64}
          className="rounded-2xl object-cover"
          cdnOptions={{ width: 128, height: 128, fit: "cover" }}
        />
        <div>
          <h1 className="font-display text-3xl font-semibold text-[var(--ch-navy)]">{np.name}</h1>
          <div className="mt-2 flex gap-2">
            <StatusBadge status="Active" />
            <StatusBadge status="Settlement Pending" />
          </div>
        </div>
      </div>

      <section>
        <h2 className="mb-4 font-semibold text-[var(--ch-navy)]">Community Health</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Active Participants", value: "631" },
            { label: "Content Posts This Week", value: "24" },
            { label: "Events Running", value: String(np.eventsCount) },
            { label: "New Followers", value: "89" },
          ].map((m) => (
            <div key={m.label} className="rounded-2xl border bg-white p-5 shadow-sm">
              <p className="text-sm text-gray-500">{m.label}</p>
              <p className="font-display mt-2 text-2xl font-bold">{m.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="font-semibold">Engagement Activity</h2>
        <ActivityFeedList items={nonprofitActivityFeed} />
      </section>

      <section className="rounded-2xl border bg-white shadow-sm overflow-hidden">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="font-semibold">Event Performance</h2>
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
              <th className="px-6 py-3 text-left">Participants</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Community progress</th>
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
                <td className="px-6 py-3">{e.participants || "—"}</td>
                <td className="px-6 py-3">
                  <StatusBadge status={e.status} />
                </td>
                <td className="px-6 py-3">${e.raised.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="rounded-2xl border bg-white shadow-sm">
        <button
          type="button"
          onClick={() => setFinanceOpen(!financeOpen)}
          className="flex w-full items-center justify-between px-6 py-4 text-left font-semibold"
        >
          Financial Overview {financeOpen ? "▲" : "▼"}
        </button>
        {financeOpen && (
          <div className="grid gap-4 border-t px-6 py-4 sm:grid-cols-2">
            <div>
              <p className="text-sm text-gray-500">Total community giving</p>
              <p className="text-xl font-bold">${np.totalRaised.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Donors this month</p>
              <p className="text-xl font-bold">47</p>
            </div>
          </div>
        )}
      </section>

      <div className="flex flex-wrap gap-3">
        <Link href="/nonprofit/approvals" className="rounded-lg border px-4 py-2 text-sm font-medium">
          SE Approvals
        </Link>
        <Link href="/nonprofit/events" className="rounded-lg border px-4 py-2 text-sm">
          All Events
        </Link>
      </div>
    </div>
  );
}
