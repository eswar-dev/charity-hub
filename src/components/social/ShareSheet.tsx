"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { useToast } from "@/context/ToastContext";

interface ShareSheetProps {
  open: boolean;
  title: string;
  onClose: () => void;
}

const platforms = [
  { id: "copy", label: "Copy Link" },
  { id: "twitter", label: "Twitter/X" },
  { id: "facebook", label: "Facebook" },
  { id: "whatsapp", label: "WhatsApp" },
  { id: "email", label: "Email" },
] as const;

export function ShareSheet({ open, title, onClose }: ShareSheetProps) {
  const { showToast } = useToast();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const handleShare = (id: string, label: string) => {
    if (id === "copy") {
      showToast("Link copied!", "success");
    } else {
      showToast(`Opens ${label}...`, "success");
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[90] flex items-end justify-center bg-black/40 md:items-center" onClick={onClose}>
      <div
        className="w-full max-w-md rounded-t-2xl bg-white p-6 shadow-xl md:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Share"
      >
        <div className="mb-4 flex items-center justify-between">
          <p className="font-semibold text-[var(--ch-navy)]">Share &quot;{title}&quot;</p>
          <button type="button" onClick={onClose} aria-label="Close share">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {platforms.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => handleShare(p.id, p.label)}
              className="rounded-xl border py-3 text-sm font-medium hover:bg-gray-50"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
