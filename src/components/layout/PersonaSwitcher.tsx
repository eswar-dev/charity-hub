"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { usePersona } from "@/context/PersonaContext";
import { useHeaderOverlay } from "@/context/HeaderOverlayContext";
import { personaHomeRoutes } from "@/lib/personaRoutes";
import { personaLabels } from "@/data/users";
import type { Persona } from "@/types";
import { ChevronDown, X } from "lucide-react";
import { useRouter } from "next/navigation";

const personas: Persona[] = ["guest", "se", "nonprofit", "admin", "founder"];

function PersonaPanel({
  open,
  onClose,
  persona,
  onSelect,
}: {
  open: boolean;
  onClose: () => void;
  persona: Persona;
  onSelect: (p: Persona) => void;
}) {
  if (!open) return null;

  return createPortal(
    <>
      <div
        className="fixed inset-0 z-[200] bg-black/40"
        onClick={onClose}
        aria-hidden
      />
      <div
        className="fixed inset-x-0 bottom-0 z-[201] flex max-h-[min(75vh,28rem)] flex-col rounded-t-2xl border-t border-gray-200 bg-white shadow-2xl sm:inset-auto sm:bottom-auto sm:right-4 sm:top-[4.5rem] sm:max-h-[24rem] sm:w-72 sm:rounded-xl sm:border"
        role="listbox"
        aria-label="Switch persona"
      >
        <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
          <h2 className="text-sm font-semibold text-[var(--ch-navy)]">Prototype Mode</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100"
            aria-label="Close persona menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <ul className="overflow-y-auto overscroll-contain py-2 pb-[calc(4.5rem+env(safe-area-inset-bottom))] sm:pb-2">
          {personas.map((p) => {
            const info = personaLabels[p];
            return (
              <li key={p}>
                <button
                  type="button"
                  role="option"
                  aria-selected={persona === p}
                  onClick={() => onSelect(p)}
                  className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm hover:bg-gray-50 ${
                    persona === p ? "bg-teal-50/50 font-medium" : ""
                  }`}
                >
                  <span>{info.emoji}</span>
                  <span>{info.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </>,
    document.body
  );
}

export function PersonaSwitcher() {
  const { persona, setPersona } = usePersona();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { setOverlayOpen } = useHeaderOverlay();
  const current = personaLabels[persona];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setOverlayOpen("persona", open);
    return () => setOverlayOpen("persona", false);
  }, [open, setOverlayOpen]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const switchPersona = (p: Persona) => {
    setPersona(p);
    setOpen(false);
    router.push(personaHomeRoutes[p]);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex max-w-[8.5rem] items-center gap-1 rounded-full border border-gray-200 bg-white px-2.5 py-2 text-sm font-medium shadow-sm hover:border-[var(--ch-teal)] sm:max-w-none sm:gap-2 sm:px-4"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Switch persona context"
      >
        <span>{current.emoji}</span>
        <span className="hidden truncate sm:inline">{current.label}</span>
        <ChevronDown className="h-4 w-4 shrink-0 text-gray-400" />
      </button>
      {mounted && (
        <PersonaPanel
          open={open}
          onClose={() => setOpen(false)}
          persona={persona}
          onSelect={switchPersona}
        />
      )}
    </>
  );
}
