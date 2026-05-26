"use client";

import { useState } from "react";
import Link from "next/link";
import { ReviewQueueItemRow } from "@/components/admin/ReviewQueueItem";
import { ModerationPanel } from "@/components/admin/ModerationPanel";
import { reviewQueue } from "@/data/adminQueue";
import type { ReviewQueueItem } from "@/types";

export default function ReviewQueuePage() {
  const [filter, setFilter] = useState<string>("All");
  const [selected, setSelected] = useState<ReviewQueueItem | null>(null);

  const filtered =
    filter === "All"
      ? reviewQueue
      : reviewQueue.filter((i) => i.type === filter);

  const types = ["All", ...Array.from(new Set(reviewQueue.map((i) => i.type)))];

  return (
    <div>
      <Link href="/admin" className="text-sm text-[var(--ch-teal)]">
        ← Back
      </Link>
      <h1 className="font-display mt-4 text-3xl font-semibold text-[var(--ch-navy)]">
        Review Queue
      </h1>
      <p className="text-sm text-gray-500">Admin &gt; Review Queue</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {types.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setFilter(t)}
            className={`rounded-full px-4 py-1.5 text-sm ${
              filter === t
                ? "bg-[var(--ch-navy)] text-white"
                : "border bg-white text-gray-600"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border bg-white shadow-sm">
        <table className="w-full text-left">
          <thead className="border-b bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Submitted by</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <ReviewQueueItemRow
                key={item.id}
                item={item}
                onSelect={setSelected}
              />
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <ModerationPanel item={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
