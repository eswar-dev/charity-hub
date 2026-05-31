"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { consumePostAuthReturn } from "@/lib/guestEngagement";
import { usePersona } from "@/context/PersonaContext";
import Link from "next/link";
import { EventCard } from "@/components/shared/EventCard";
import { events } from "@/data/events";
import { nonprofits } from "@/data/nonprofits";
import { NonprofitCard } from "@/components/shared/NonprofitCard";
import { PhaseBanner } from "@/components/shared/PhaseBanner";

export default function SEOnboardingPage() {
  const [step, setStep] = useState(0);
  const [selectedNp, setSelectedNp] = useState<string | null>(null);
  const router = useRouter();
  const { setPersona } = usePersona();
  const sampleEvent = events[0];

  if (step === 0) {
    return (
      <div className="mx-auto max-w-md">
        <PhaseBanner
          phase="2"
          message="Identity capture happens at action gate, not at discovery."
        />
        <div className="mt-6">
          <EventCard event={sampleEvent} />
        </div>
        <button
          type="button"
          onClick={() => setStep(1)}
          className="mt-6 w-full rounded-full bg-purple-600 py-3 text-sm font-medium text-white"
        >
          Join this event
        </button>
      </div>
    );
  }

  if (step === 1) {
    return (
      <div className="mx-auto max-w-lg space-y-4">
        <h1 className="font-display text-2xl font-semibold">Create Profile</h1>
        <PhaseBanner phase="2" message="Guest mode in Phase 2; full profile required for event creation." />
        {["Full Name", "Email", "Bio"].map((f) => (
          <input key={f} className="w-full rounded-lg border px-3 py-2" placeholder={f} />
        ))}
        <div className="flex flex-wrap gap-2">
          {["Health", "Environment", "Education"].map((c) => (
            <button key={c} type="button" className="rounded-full border px-3 py-1 text-xs">
              {c}
            </button>
          ))}
        </div>
        <button type="button" onClick={() => setStep(2)} className="w-full rounded-full bg-purple-600 py-3 text-sm text-white">
          Continue
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg">
      <h1 className="font-display text-2xl font-semibold">Select Nonprofit</h1>
      <p className="mt-2 text-sm text-gray-600">Connect to a verified 501(c)(3)</p>
      <div className="mt-6 space-y-3">
        {nonprofits.filter((n) => n.status === "Active").map((np) => (
          <NonprofitCard
            key={np.id}
            nonprofit={np}
            selected={selectedNp === np.id}
            onSelect={() => setSelectedNp(np.id)}
          />
        ))}
      </div>
      <button
        type="button"
        disabled={!selectedNp}
        onClick={() => {
          setPersona("se");
          router.push(consumePostAuthReturn("/se/dashboard"));
        }}
        className="mt-6 w-full rounded-full bg-purple-600 py-3 text-sm text-white disabled:opacity-40"
      >
        Complete Setup
      </button>
      <Link href="/se/dashboard" className="mt-4 block text-center text-sm text-purple-600">
        Skip to dashboard
      </Link>
    </div>
  );
}
