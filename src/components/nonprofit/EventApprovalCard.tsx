"use client";

import Image from "next/image";
import { useState } from "react";
import { useToast } from "@/context/ToastContext";
import { StatusBadge } from "@/components/shared/StatusBadge";
import type { Event } from "@/types";
import { getSEById } from "@/data/users";

interface EventApprovalCardProps {
  event: Event;
}

export function EventApprovalCard({ event }: EventApprovalCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [status, setStatus] = useState(event.status);
  const [showChanges, setShowChanges] = useState(false);
  const { showToast } = useToast();
  const se = event.seId ? getSEById(event.seId) : null;

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-3">
          {se && (
            <Image src={se.avatar} alt="" width={40} height={40} className="rounded-full" />
          )}
          <div>
            <p className="text-sm font-medium text-gray-600">{se?.name ?? "SE"}</p>
            <h3 className="font-semibold text-[var(--ch-navy)]">{event.title}</h3>
            <p className="text-xs text-gray-500">{event.startDate} · {event.causeCategory}</p>
          </div>
        </div>
        <StatusBadge status={status} />
      </div>
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="mt-4 rounded-lg border px-4 py-2 text-sm font-medium hover:bg-gray-50"
      >
        {expanded ? "Collapse" : "Review"}
      </button>
      {expanded && (
        <div className="mt-4 space-y-4 border-t pt-4">
          <p className="text-sm text-gray-700">{event.story}</p>
          <Image src={event.banner} alt="" width={400} height={120} className="rounded-xl object-cover" />
          {showChanges ? (
            <div>
              <textarea
                className="w-full rounded-lg border p-3 text-sm"
                placeholder="Describe requested changes..."
                rows={3}
              />
              <button
                type="button"
                onClick={() => {
                  setStatus("Changes Requested");
                  showToast("Change request sent to SE", "warning");
                }}
                className="mt-2 rounded-lg bg-amber-100 px-4 py-2 text-sm font-medium text-amber-900"
              >
                Send change request to Social Entrepreneur
              </button>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => {
                  setStatus("Live");
                  showToast("Event approved and published");
                }}
                className="rounded-full bg-[var(--ch-teal)] px-4 py-2 text-sm text-white"
              >
                Approve
              </button>
              <button
                type="button"
                onClick={() => setShowChanges(true)}
                className="rounded-lg border px-4 py-2 text-sm"
              >
                Request Changes
              </button>
              <button
                type="button"
                onClick={() => {
                  setStatus("Rejected");
                  showToast("Event rejected", "error");
                }}
                className="rounded-lg border border-red-200 px-4 py-2 text-sm text-red-700"
              >
                Reject
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
