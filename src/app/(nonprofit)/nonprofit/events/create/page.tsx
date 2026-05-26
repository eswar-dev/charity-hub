"use client";

import { useState } from "react";
import Link from "next/link";
import { StepWizard } from "@/components/shared/StepWizard";
import { useToast } from "@/context/ToastContext";

export default function CreateNonprofitEventPage() {
  const [step, setStep] = useState(0);
  const [published, setPublished] = useState(false);
  const { showToast } = useToast();

  if (published) {
    return (
      <div className="relative text-center">
        {[...Array(12)].map((_, i) => (
          <span
            key={i}
            className="confetti-dot absolute left-1/2 h-2 w-2 rounded-full"
            style={{
              background: ["#0D7377", "#F59E0B", "#7C3AED"][i % 3],
              left: `${30 + (i % 6) * 8}%`,
              animationDelay: `${i * 0.08}s`,
            }}
          />
        ))}
        <h1 className="font-display text-2xl font-semibold">Event Published!</h1>
        <Link href="/events/evt-002" className="mt-6 inline-block text-[var(--ch-teal)]">
          View public event page →
        </Link>
      </div>
    );
  }

  const steps = [
    {
      title: "Event Basics",
      content: (
        <div className="space-y-3">
          <input className="w-full rounded-lg border px-3 py-2" placeholder="Event Title" />
          <textarea className="w-full rounded-lg border px-3 py-2" rows={4} placeholder="Story / Description" />
          <input type="date" className="w-full rounded-lg border px-3 py-2" aria-label="Event date" />
          <select className="w-full rounded-lg border px-3 py-2" aria-label="Format">
            <option>Virtual</option>
            <option>In-Person</option>
            <option>Hybrid</option>
          </select>
        </div>
      ),
    },
    {
      title: "Assets & CTA",
      content: (
        <div className="space-y-3">
          <button type="button" className="w-full rounded-xl border-2 border-dashed py-6 text-sm text-gray-500">
            Upload banner (placeholder)
          </button>
          <input className="w-full rounded-lg border px-3 py-2" placeholder="Donation CTA text" />
          <input className="w-full rounded-lg border px-3 py-2" placeholder="Donation Goal ($)" type="number" />
        </div>
      ),
    },
    {
      title: "Visibility & Settlement",
      content: (
        <div className="rounded-xl bg-amber-50 p-4 text-sm text-amber-900">
          Settlement pending — donations will be blocked until Stripe Connect is complete (Phase 3).
        </div>
      ),
    },
    {
      title: "Review & Publish",
      content: <p className="text-sm text-gray-600">Review your event details before publishing.</p>,
    },
  ];

  return (
    <div>
      <Link href="/nonprofit/events" className="text-sm text-[var(--ch-teal)]">← Back</Link>
      <StepWizard
        steps={steps}
        currentStep={step}
        onStepChange={setStep}
        onComplete={() => {
          setPublished(true);
          showToast("Event published successfully");
        }}
        completeLabel="Publish Event"
      />
    </div>
  );
}
