"use client";

import { useState } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { EventCard } from "@/components/shared/EventCard";
import { CreatorCard } from "@/components/social/CreatorCard";
import { NonprofitCard } from "@/components/shared/NonprofitCard";
import { events } from "@/data/events";
import { creators } from "@/data/creators";
import { nonprofits } from "@/data/nonprofits";
import { Search } from "lucide-react";

const categories = [
  { id: "Environment", emoji: "🌱", label: "Environment" },
  { id: "Education", emoji: "📚", label: "Education" },
  { id: "Health", emoji: "❤️", label: "Health" },
  { id: "Arts", emoji: "🎨", label: "Arts" },
  { id: "Animals", emoji: "🐾", label: "Animals" },
  { id: "Human Services", emoji: "🏘", label: "Human Services" },
];

export default function ExplorePage() {
  const [category, setCategory] = useState<string | null>(null);

  const filteredEvents = category
    ? events.filter((e) => e.causeCategory === category)
    : events;
  const filteredCreators = category
    ? creators.filter((c) => c.causeCategories.includes(category))
    : creators;
  const filteredNps = category
    ? nonprofits.filter((n) => n.causeCategory === category)
    : nonprofits;

  return (
    <div className="min-h-screen bg-[var(--feed-bg)]">
      <TopBar title="Explore" breadcrumbs={["Social", "Explore"]} />
      <main className="mx-auto max-w-6xl px-4 py-8 lg:px-8">
        <h1 className="font-display text-3xl font-semibold text-[var(--ch-navy)]">
          Explore Causes That Move You
        </h1>
        <div className="relative mt-6">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            className="w-full rounded-2xl border bg-white py-4 pl-12 pr-4 text-lg shadow-sm"
            placeholder="Search events, creators, nonprofits…"
            aria-label="Search"
          />
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setCategory(null)}
            className={`rounded-full px-4 py-2 text-sm ${!category ? "bg-[var(--ch-teal)] text-white" : "border bg-white"}`}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCategory(c.id)}
              className={`rounded-full px-4 py-2 text-sm ${
                category === c.id ? "bg-[var(--ch-teal)] text-white" : "border bg-white"
              }`}
            >
              {c.emoji} {c.label}
            </button>
          ))}
        </div>

        <section className="mt-12">
          <h2 className="font-display text-xl font-semibold">Trending Events</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-xl font-semibold">Impact Creators</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCreators.map((c) => (
              <CreatorCard key={c.id} creator={c} />
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-xl font-semibold">Verified Nonprofits</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredNps.map((np) => (
              <NonprofitCard key={np.id} nonprofit={np} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
