"use client";

import type { ReviewQueueItem as QueueItem } from "@/types";
import { StatusBadge } from "@/components/shared/StatusBadge";

const typeColors: Record<string, string> = {
  "Nonprofit Onboarding": "bg-teal-50 text-teal-800",
  "Event Approval": "bg-purple-50 text-purple-800",
  "Content Moderation": "bg-blue-50 text-blue-800",
  "Payment Issue": "bg-amber-50 text-amber-800",
};

interface ReviewQueueItemProps {
  item: QueueItem;
  onSelect: (item: QueueItem) => void;
}

export function ReviewQueueItemRow({ item, onSelect }: ReviewQueueItemProps) {
  return (
    <tr className="border-b border-gray-50 hover:bg-gray-50/50">
      <td className="px-4 py-3">
        <span
          className={`rounded-full px-2 py-0.5 text-xs font-medium ${typeColors[item.type] ?? "bg-gray-100"}`}
        >
          {item.type}
        </span>
      </td>
      <td className="px-4 py-3 text-sm">{item.submitter}</td>
      <td className="px-4 py-3 text-sm text-gray-500">{item.date}</td>
      <td className="px-4 py-3">
        <StatusBadge status={item.status} />
      </td>
      <td className="px-4 py-3">
        <button
          type="button"
          onClick={() => onSelect(item)}
          className="rounded-lg bg-[var(--ch-navy)] px-3 py-1.5 text-xs font-medium text-white hover:opacity-90"
          aria-label={`Review item ${item.id}`}
        >
          Review
        </button>
      </td>
    </tr>
  );
}
