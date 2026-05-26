"use client";

import { usePersona } from "@/context/PersonaContext";
import { personaHomeRoutes } from "@/lib/personaRoutes";
import { personaLabels } from "@/data/users";
import type { Persona } from "@/types";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const personas: Persona[] = ["guest", "se", "nonprofit", "admin", "founder"];

export function PersonaSwitcher() {
  const { persona, setPersona } = usePersona();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const current = personaLabels[persona];

  const switchPersona = (p: Persona) => {
    setPersona(p);
    setOpen(false);
    router.push(personaHomeRoutes[p]);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium shadow-sm hover:border-[var(--ch-teal)]"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Switch persona context"
      >
        <span>{current.emoji}</span>
        <span className="hidden sm:inline">{current.label}</span>
        <ChevronDown className="h-4 w-4 text-gray-400" />
      </button>
      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <ul
            className="absolute right-0 z-50 mt-2 w-72 rounded-xl border border-gray-100 bg-white py-2 shadow-xl"
            role="listbox"
          >
            {personas.map((p) => {
              const info = personaLabels[p];
              return (
                <li key={p}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={persona === p}
                    onClick={() => switchPersona(p)}
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
        </>
      )}
    </div>
  );
}
