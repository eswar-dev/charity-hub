"use client";

import { useState } from "react";

const factors = [
  "Meaningful Participation",
  "Quality Contributions",
  "Verified Trust",
  "Measurable Outcomes",
  "Community Uplift",
];

export function AlgorithmBadge() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        className="rounded-full bg-teal-50 px-3 py-1 text-xs font-medium text-[var(--ch-teal)]"
        aria-label="Optimized for impact, not ads"
      >
        ⚡ Optimized for Impact, Not Ads
      </button>
      {open && (
        <div
          className="absolute left-0 top-full z-50 mt-2 w-56 rounded-xl border bg-white p-3 text-xs shadow-lg"
          role="tooltip"
        >
          <p className="mb-2 font-semibold text-[var(--ch-navy)]">Impact factors</p>
          <ul className="space-y-1 text-gray-600">
            {factors.map((f) => (
              <li key={f}>• {f}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
