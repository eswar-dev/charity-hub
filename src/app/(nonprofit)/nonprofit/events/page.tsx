"use client";

import { useState } from "react";
import Link from "next/link";
import { events } from "@/data/events";
import { StatusBadge } from "@/components/shared/StatusBadge";

export default function NonprofitEventsPage() {
  const [typeFilter, setTypeFilter] = useState("All");
  const myEvents = events.filter((e) => e.nonprofitId === "np-001");

  const filtered =
    typeFilter === "All"
      ? myEvents
      : myEvents.filter((e) =>
          typeFilter === "Nonprofit-Led"
            ? e.type === "Nonprofit-Led"
            : e.type === "SE-Led"
        );

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-3xl font-semibold text-[var(--ch-navy)]">Events</h1>
        <Link
          href="/nonprofit/events/create"
          className="rounded-full bg-[var(--ch-teal)] px-5 py-2.5 text-sm font-medium text-white"
        >
          + Create Nonprofit Event
        </Link>
      </div>
      <div className="mt-4 flex gap-2">
        {["All", "Nonprofit-Led", "SE-Led"].map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setTypeFilter(f)}
            className={`rounded-full px-4 py-1.5 text-sm ${typeFilter === f ? "bg-[var(--ch-teal)] text-white" : "border"}`}
          >
            {f}
          </button>
        ))}
      </div>
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
            {filtered.map((e) => (
              <tr key={e.id} className="border-b">
                <td className="px-4 py-3">
                  <Link href={`/nonprofit/events/${e.id}`} className="font-medium text-[var(--ch-teal)]">
                    {e.title}
                  </Link>
                </td>
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
