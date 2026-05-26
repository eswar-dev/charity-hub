"use client";

import { useState } from "react";
import Link from "next/link";
import { TopBar } from "@/components/layout/TopBar";
import { EventCard } from "@/components/shared/EventCard";
import { events } from "@/data/events";
import { Search } from "lucide-react";

const categories = ["All", "Education", "Health", "Environment", "Arts", "Animals"];

export default function PublicEventsPage() {
  const [category, setCategory] = useState("All");
  const filtered =
    category === "All"
      ? events.filter((e) => e.status === "Live" || e.status === "Published")
      : events.filter(
          (e) =>
            (e.status === "Live" || e.status === "Published") &&
            e.causeCategory === category
        );

  return (
    <div className="min-h-screen bg-[var(--ch-cream)]">
      <TopBar title="Discover Events" />
      <main className="mx-auto max-w-6xl px-4 py-8 lg:px-8">
        <h1 className="font-display text-4xl font-semibold text-[var(--ch-navy)]">
          Discover Causes That Move You
        </h1>
        <div className="relative mt-6 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            className="w-full rounded-full border bg-white py-3 pl-10 pr-4"
            placeholder="Search events..."
            aria-label="Search events"
          />
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={`rounded-full px-4 py-1.5 text-sm ${
                category === c ? "bg-[var(--ch-teal)] text-white" : "border bg-white"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((e) => (
            <EventCard key={e.id} event={e} />
          ))}
        </div>
        <Link href="/" className="mt-8 inline-block text-sm text-[var(--ch-teal)]">
          ← Ecosystem overview
        </Link>
      </main>
    </div>
  );
}
