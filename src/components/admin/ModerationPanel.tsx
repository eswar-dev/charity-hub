"use client";

import { useState } from "react";
import { useToast } from "@/context/ToastContext";
import { StatusBadge } from "@/components/shared/StatusBadge";
import type { ReviewQueueItem } from "@/types";

interface ModerationPanelProps {
  item: ReviewQueueItem;
  onClose: () => void;
}

export function ModerationPanel({ item, onClose }: ModerationPanelProps) {
  const { showToast } = useToast();
  const [status, setStatus] = useState(item.status);
  const [escalated, setEscalated] = useState(false);

  const handleAction = (action: string, variant: "success" | "warning" | "error" = "success") => {
    if (action === "Approve & Activate" || action === "Approve") setStatus("Approved" as typeof status);
    if (action === "Reject") setStatus("Rejected" as typeof status);
    if (action === "Escalate to Payment Workflow") setEscalated(true);
    showToast(`${action} recorded for ${item.id}`, variant);
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md overflow-y-auto border-l border-gray-200 bg-white shadow-2xl">
      <div className="sticky top-0 flex items-center justify-between border-b bg-white px-6 py-4">
        <h2 className="font-display text-lg font-semibold text-[var(--ch-navy)]">
          Review {item.id}
        </h2>
        <button
          type="button"
          onClick={onClose}
          className="text-sm text-gray-500 hover:text-gray-800"
          aria-label="Close review panel"
        >
          Close
        </button>
      </div>

      <div className="space-y-6 p-6">
        <div>
          <p className="text-xs text-gray-500">Type</p>
          <p className="font-medium">{item.type}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Status</p>
          <StatusBadge status={status} />
        </div>

        {item.type === "Nonprofit Onboarding" && (
          <>
            <div className="rounded-xl bg-gray-50 p-4 text-sm">
              <p className="font-semibold">{item.submitter}</p>
              <p className="mt-2 text-gray-600">EIN: 67-9012345</p>
              <p className="text-gray-600">Mission: Building safe shelter...</p>
            </div>
            <ul className="space-y-1 text-sm text-green-700">
              <li>EIN Verified ✓</li>
              <li>Name Match ✓</li>
              <li>Address ✓</li>
            </ul>
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => handleAction("Approve & Activate")}
                className="rounded-full bg-[var(--ch-teal)] py-2.5 text-sm font-medium text-white"
              >
                Approve & Activate
              </button>
              <button
                type="button"
                onClick={() => handleAction("Request More Info", "warning")}
                className="rounded-lg border py-2 text-sm"
              >
                Request More Info
              </button>
              <button
                type="button"
                onClick={() => handleAction("Reject", "error")}
                className="rounded-lg border border-red-200 py-2 text-sm text-red-700"
              >
                Reject
              </button>
            </div>
          </>
        )}

        {item.type === "Event Approval" && (
          <>
            <p className="text-sm font-medium">{item.event ?? "Event"}</p>
            <p className="text-sm text-gray-600">Story excerpt and banner preview...</p>
            <div className="space-y-2">
              {["Mission aligned", "CTA clear", "Nonprofit linked", "Content appropriate", "Goal realistic"].map((c) => (
                <label key={c} className="flex items-center gap-2 text-sm">
                  <input type="checkbox" defaultChecked className="rounded" />
                  {c}
                </label>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              <button type="button" onClick={() => handleAction("Approve")} className="rounded-full bg-[var(--ch-teal)] py-2.5 text-sm text-white">Approve</button>
              <button type="button" onClick={() => handleAction("Request Changes", "warning")} className="rounded-lg border py-2 text-sm">Request Changes</button>
              <button type="button" onClick={() => handleAction("Reject", "error")} className="rounded-lg border border-red-200 py-2 text-sm text-red-700">Reject</button>
            </div>
          </>
        )}

        {item.type === "Content Moderation" && (
          <>
            <div className="rounded-xl border p-4 text-sm italic text-gray-700">
              Flagged: {item.content}
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" /> Notify user
            </label>
            <div className="flex gap-2">
              <button type="button" onClick={() => handleAction("Safe → Keep Visible")} className="flex-1 rounded-lg bg-green-50 py-2 text-sm text-green-800">Safe → Keep Visible</button>
              <button type="button" onClick={() => handleAction("Unsafe → Hide", "error")} className="flex-1 rounded-lg bg-red-50 py-2 text-sm text-red-800">Unsafe → Hide</button>
            </div>
          </>
        )}

        {item.type === "Payment Issue" && (
          <>
            <p className="font-mono text-sm">TXN-8842 · $1,240</p>
            <p className="text-sm text-gray-600">{item.issue}</p>
            {escalated ? (
              <p className="rounded-lg bg-amber-50 p-3 text-sm text-amber-800">
                Escalated to payment workflow (static confirmation).
              </p>
            ) : (
              <button
                type="button"
                onClick={() => handleAction("Escalate to Payment Workflow", "warning")}
                className="w-full rounded-lg bg-[var(--ch-navy)] py-2.5 text-sm text-white"
              >
                Escalate to Payment Workflow
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
