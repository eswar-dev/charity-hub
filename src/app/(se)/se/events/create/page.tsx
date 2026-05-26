"use client";

import { useState } from "react";
import Link from "next/link";
import { StepWizard } from "@/components/shared/StepWizard";
import { PhaseBanner } from "@/components/shared/PhaseBanner";
import { nonprofits } from "@/data/nonprofits";
import { NonprofitCard } from "@/components/shared/NonprofitCard";

export default function SECreateEventPage() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [selectedNp, setSelectedNp] = useState("np-001");

  if (submitted) {
    return (
      <div className="mx-auto max-w-lg text-center animate-fade-up">
        <div className="mx-auto h-12 w-12 animate-pulse rounded-full border-4 border-purple-200 border-t-purple-600" />
        <h1 className="font-display mt-6 text-2xl font-semibold">Pending Nonprofit Approval</h1>
        <p className="mt-2 text-gray-600">
          GreenPath Foundation has been notified. You&apos;ll receive a decision within 3 business days.
        </p>
        <PhaseBanner
          phase="3"
          message="In Phase 3/SOW-2, real email notifications are sent to the Nonprofit Admin."
        />
        <Link href="/se/events/evt-001" className="mt-6 inline-block text-purple-600 text-sm">
          View event status →
        </Link>
      </div>
    );
  }

  const steps = [
    {
      title: "Select Nonprofit",
      content: (
        <div className="space-y-3">
          {nonprofits.filter((n) => n.status === "Active").map((np) => (
            <NonprofitCard
              key={np.id}
              nonprofit={np}
              selected={selectedNp === np.id}
              onSelect={() => setSelectedNp(np.id)}
            />
          ))}
        </div>
      ),
    },
    {
      title: "Event Details",
      content: (
        <div className="space-y-3">
          <input className="w-full rounded-lg border px-3 py-2" placeholder="Event Title" />
          <textarea className="w-full rounded-lg border px-3 py-2" rows={4} placeholder="Story / Call to Action" />
          <select className="w-full rounded-lg border px-3 py-2" aria-label="Engagement type">
            <option>Challenge</option>
            <option>Match</option>
            <option>Milestone</option>
            <option>General</option>
          </select>
        </div>
      ),
    },
    {
      title: "Banner & Media",
      content: (
        <button type="button" className="w-full rounded-xl border-2 border-dashed py-8 text-sm text-gray-500">
          Upload banner (placeholder)
        </button>
      ),
    },
    {
      title: "Donation CTA",
      content: (
        <div className="space-y-3">
          <input className="w-full rounded-lg border px-3 py-2" placeholder="Goal amount ($)" />
          <input className="w-full rounded-lg border px-3 py-2" placeholder="CTA button text" />
        </div>
      ),
    },
    {
      title: "Submit for Approval",
      content: <p className="text-sm">Submit to GreenPath Foundation for Approval</p>,
    },
  ];

  return (
    <div>
      <Link href="/se/events" className="text-sm text-purple-600">← Back</Link>
      <StepWizard
        steps={steps}
        currentStep={step}
        onStepChange={setStep}
        onComplete={() => setSubmitted(true)}
        completeLabel="Submit to GreenPath Foundation"
      />
    </div>
  );
}
