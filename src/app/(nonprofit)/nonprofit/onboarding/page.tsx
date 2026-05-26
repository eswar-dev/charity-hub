"use client";

import { useState } from "react";
import Link from "next/link";
import { StepWizard } from "@/components/shared/StepWizard";
import { PhaseBanner } from "@/components/shared/PhaseBanner";
import { useToast } from "@/context/ToastContext";
import { CheckCircle } from "lucide-react";

export default function NonprofitOnboardingPage() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const { showToast } = useToast();

  if (submitted) {
    return (
      <div className="mx-auto max-w-lg text-center animate-fade-up">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 animate-check-pop">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </div>
        <h1 className="font-display mt-6 text-2xl font-semibold">Pending Review</h1>
        <p className="mt-2 text-gray-600">
          Your application is under review. You&apos;ll receive an email within 2 business days.
        </p>
        <Link
          href="/nonprofit/launchpad"
          className="mt-8 inline-block rounded-full bg-[var(--ch-teal)] px-8 py-3 text-sm text-white"
        >
          Launchpad Preview
        </Link>
      </div>
    );
  }

  const steps = [
    {
      title: "Discover & Register",
      content: (
        <div className="space-y-4">
          <p className="text-gray-600">Register your 501(c)(3) with Charity Hub</p>
          <PhaseBanner phase="2" message="In Phase 2 / MMVP.0 — no real EIN verification occurs." />
          {["Organization Name", "EIN (XX-XXXXXXX)", "Contact Email", "Phone"].map((f) => (
            <label key={f} className="block">
              <span className="text-sm font-medium">{f}</span>
              <input className="mt-1 w-full rounded-lg border px-3 py-2" placeholder={f} />
            </label>
          ))}
        </div>
      ),
    },
    {
      title: "Organization Profile",
      content: (
        <div className="space-y-4">
          <input className="w-full rounded-lg border px-3 py-2" placeholder="Mailing Address" />
          <select className="w-full rounded-lg border px-3 py-2" aria-label="Cause category">
            <option>Environment</option>
            <option>Education</option>
            <option>Health</option>
          </select>
          <textarea className="w-full rounded-lg border px-3 py-2" rows={3} placeholder="Mission Statement" />
          <button type="button" className="w-full rounded-xl border-2 border-dashed py-8 text-sm text-gray-500">
            Upload logo (placeholder)
          </button>
        </div>
      ),
    },
    {
      title: "Verification Attestation",
      content: (
        <div className="space-y-3">
          {[
            "I confirm this organization is a registered 501(c)(3) nonprofit",
            "I agree to Charity Hub Terms and Privacy Policy",
            "I understand donations are subject to verification before payout",
          ].map((t) => (
            <label key={t} className="flex gap-2 text-sm">
              <input type="checkbox" className="mt-1" />
              {t}
            </label>
          ))}
          <PhaseBanner phase="3" message="Real EIN validation against IRS / GuideStar happens in Phase 3/SOW-2." />
        </div>
      ),
    },
    {
      title: "Donation Settlement",
      content: (
        <div>
          <PhaseBanner
            phase="3"
            sticky
            message="Donation Settlement is Phase 3 / SOW-2. Preview only — no Stripe connection."
          />
          <button type="button" disabled className="mt-4 w-full cursor-not-allowed rounded-lg bg-gray-200 py-3 text-gray-500">
            Connect with Stripe (disabled)
          </button>
          <p className="mt-4 text-sm text-amber-800">
            Settlement Pending — required before receiving donations
          </p>
        </div>
      ),
    },
    {
      title: "Review & Submit",
      content: (
        <div className="rounded-xl bg-gray-50 p-4 text-sm space-y-2">
          <p><strong>Org:</strong> GreenPath Foundation</p>
          <p><strong>EIN:</strong> 82-1234567</p>
          <p><strong>Category:</strong> Environment</p>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Link href="/nonprofit/launchpad" className="text-sm text-[var(--ch-teal)]">← Back</Link>
      <StepWizard
        steps={steps}
        currentStep={step}
        onStepChange={setStep}
        onComplete={() => {
          setSubmitted(true);
          showToast("Application submitted for review");
        }}
        completeLabel="Submit Application"
      />
    </div>
  );
}
