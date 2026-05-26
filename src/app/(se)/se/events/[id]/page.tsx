"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { getEventById } from "@/data/events";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { useState } from "react";

const steps = ["Draft", "Submitted", "Under Review", "Approved"];

export default function SEEventStatusPage({ params }: { params: { id: string } }) {
  const event = getEventById(params.id);
  const [status, setStatus] = useState(event?.status ?? "Pending Approval");
  if (!event) notFound();

  const stepIndex =
    status === "Live" || status === "Published"
      ? 3
      : status === "Pending Approval"
        ? 2
        : status === "Changes Requested"
          ? 2
          : 1;

  return (
    <div>
      <Link href="/se/events" className="text-sm text-purple-600">← Back</Link>
      <h1 className="font-display mt-4 text-2xl font-semibold">{event.title}</h1>
      <StatusBadge status={status} />

      <div className="mt-8 flex items-center justify-between gap-2">
        {steps.map((s, i) => (
          <div key={s} className="flex flex-1 flex-col items-center">
            <div
              className={`h-3 w-3 rounded-full ${i <= stepIndex ? "bg-purple-600" : "bg-gray-200"}`}
            />
            <span className="mt-1 text-[10px] text-center">{s}</span>
          </div>
        ))}
      </div>

      {status === "Changes Requested" && (
        <div className="mt-6 rounded-xl border border-purple-200 bg-purple-50 p-4">
          <p className="text-sm">Please update mission alignment in your story.</p>
          <button type="button" onClick={() => setStatus("Pending Approval")} className="mt-3 rounded-lg bg-purple-600 px-4 py-2 text-sm text-white">
            Edit & Resubmit
          </button>
        </div>
      )}

      {(status === "Live" || status === "Published") && (
        <div className="mt-6 space-y-3">
          <Link href={`/events/${event.id}`} className="text-sm text-purple-600">
            View live event →
          </Link>
          <div className="flex gap-2">
            <input readOnly value={`https://charityhub.app/events/${event.id}`} className="flex-1 rounded-lg border px-3 py-2 text-sm" aria-label="Event link" />
            <button type="button" className="rounded-lg bg-purple-600 px-4 py-2 text-sm text-white" onClick={() => navigator.clipboard?.writeText(`https://charityhub.app/events/${event.id}`)}>
              Copy
            </button>
          </div>
        </div>
      )}

      {status === "Rejected" && (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          Rejection reason: Mission alignment insufficient for this nonprofit.
        </div>
      )}

      <div className="mt-8 flex gap-2">
        <button type="button" onClick={() => setStatus("Live")} className="text-xs text-gray-500 underline">
          Demo: set Approved
        </button>
        <button type="button" onClick={() => setStatus("Changes Requested")} className="text-xs text-gray-500 underline">
          Demo: Changes Requested
        </button>
      </div>
    </div>
  );
}
