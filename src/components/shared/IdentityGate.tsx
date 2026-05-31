"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

export type IdentityGateAction =
  | "join"
  | "donate"
  | "comment"
  | "upload"
  | "create";

export interface IdentityGateProps {
  open: boolean;
  action: IdentityGateAction;
  eventTitle?: string;
  /** Create account — typically routes to onboarding */
  onContinue?: () => void;
  /** Sign in — quick return to intended action */
  onSignIn?: () => void;
  onDismiss?: () => void;
}

const headlines: Record<IdentityGateAction, (title?: string) => string> = {
  join: (t) => (t ? `Join ${t} to participate` : "Join this event to participate"),
  comment: () => "Share your voice on this cause",
  donate: () => "Ready to give? Let's set you up first.",
  upload: () => "Share your story with the community",
  create: () => "Start creating your event",
};

export function IdentityGate({
  open,
  action,
  eventTitle,
  onContinue,
  onSignIn,
  onDismiss,
}: IdentityGateProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onDismiss?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onDismiss]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="identity-gate-title"
    >
      <div className="relative max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        <button
          type="button"
          onClick={onDismiss}
          className="absolute right-4 top-4 rounded-lg p-1 text-gray-400 hover:bg-gray-100"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
        <h2
          id="identity-gate-title"
          className="font-display pr-8 text-2xl font-semibold text-[var(--ch-navy)]"
        >
          {headlines[action](eventTitle)}
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Create a free account to join events, comment, and participate fully.
        </p>
        <div className="mt-6 space-y-3">
          <button
            type="button"
            onClick={onContinue}
            className="w-full rounded-full bg-[var(--ch-teal)] py-3 text-sm font-semibold text-white"
          >
            Create a free account
          </button>
          <button
            type="button"
            onClick={onSignIn ?? onContinue}
            className="w-full rounded-full border-2 border-[var(--ch-teal)] py-3 text-sm font-semibold text-[var(--ch-teal)]"
          >
            Sign in
          </button>
        </div>
        <p className="my-6 text-center text-xs text-gray-400">
          — or continue as guest —
        </p>
        <p className="text-center text-sm text-gray-600">
          As a guest you can browse, share, and explore freely. Create a free account to
          join events, comment, and participate.
        </p>
        <button
          type="button"
          onClick={onDismiss}
          className="mt-4 w-full text-center text-sm font-medium text-[var(--ch-teal)] hover:underline"
        >
          Continue as Guest
        </button>
      </div>
    </div>
  );
}
