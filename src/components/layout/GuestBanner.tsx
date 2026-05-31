"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { usePersona } from "@/context/PersonaContext";
import { useHeaderOverlay } from "@/context/HeaderOverlayContext";

const showOnPrefixes = ["/feed", "/events", "/explore", "/compete", "/creators"];

export function GuestBanner() {
  const pathname = usePathname();
  const { persona } = usePersona();
  const { isAnyOverlayOpen } = useHeaderOverlay();
  const [dismissed, setDismissed] = useState(false);

  if (dismissed || persona !== "guest" || isAnyOverlayOpen) return null;
  if (
    pathname === "/" ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/nonprofit") ||
    pathname.startsWith("/se") ||
    pathname.startsWith("/about")
  ) {
    return null;
  }
  if (!showOnPrefixes.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
    return null;
  }

  return (
    <div className="relative z-20 border-b border-gray-200 bg-[var(--ch-cream)] px-3 py-2.5 sm:px-4">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <p className="text-xs leading-snug text-gray-700 sm:text-sm">
          <span className="mr-1" aria-hidden>
            👀
          </span>
          You&apos;re exploring <span className="font-medium">anonymously</span>.
        </p>
        <div className="flex shrink-0 items-center gap-2 self-end sm:self-auto">
          <button
            type="button"
            className="rounded-full bg-[var(--ch-teal)] px-3 py-1.5 text-xs font-medium text-white"
          >
            Sign up free
          </button>
          <button type="button" className="text-xs font-medium text-[var(--ch-teal)]">
            Sign in
          </button>
          <button
            type="button"
            onClick={() => setDismissed(true)}
            className="rounded p-1 text-gray-500 hover:bg-gray-200"
            aria-label="Dismiss banner"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
