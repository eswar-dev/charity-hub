"use client";

import { useState } from "react";
import Link from "next/link";
import { PhaseBanner } from "@/components/shared/PhaseBanner";

const amounts = [10, 25, 50, 100];

interface DonationWidgetProps {
  eventId: string;
}

export function DonationWidget({ eventId }: DonationWidgetProps) {
  const [phase, setPhase] = useState<"2" | "3">("2");
  const [amount, setAmount] = useState(25);
  const [step, setStep] = useState<"select" | "checkout" | "done">("select");

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-display text-lg font-semibold text-[var(--ch-navy)]">
          Donate
        </h3>
        <button
          type="button"
          onClick={() => setPhase(phase === "2" ? "3" : "2")}
          className="rounded-full border px-3 py-1 text-xs font-medium"
          aria-label="Toggle Phase 2 demo vs Phase 3 preview"
        >
          Phase {phase} preview
        </button>
      </div>

      {phase === "2" ? (
        <PhaseBanner
          phase="2"
          message="Demo flow only. No real Stripe payment in Phase 2."
        />
      ) : (
        <PhaseBanner
          phase="3"
          message="Stripe Checkout preview — greyed out in prototype."
        />
      )}

      {step === "select" && (
        <div className="mt-4 space-y-4">
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
            {amounts.map((a) => (
              <label key={a} className="cursor-pointer">
                <input
                  type="radio"
                  name="amount"
                  className="peer sr-only"
                  checked={amount === a}
                  onChange={() => setAmount(a)}
                />
                <span className="flex justify-center rounded-lg border py-2 text-sm peer-checked:border-[var(--ch-teal)] peer-checked:bg-teal-50">
                  ${a}
                </span>
              </label>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setStep("checkout")}
            className="w-full rounded-full bg-[var(--ch-teal)] py-3 text-sm font-medium text-white"
          >
            {phase === "2" ? "Continue (Demo)" : "Redirect to Stripe (Preview)"}
          </button>
          <Link
            href={`/donate/${eventId}`}
            className="block text-center text-sm text-[var(--ch-teal)] hover:underline"
          >
            Full donation flow →
          </Link>
        </div>
      )}

      {step === "checkout" && phase === "2" && (
        <div className="mt-4 space-y-4 text-center">
          <p className="text-sm text-gray-600">Demo checkout placeholder</p>
          <p className="font-display text-2xl font-semibold">${amount}</p>
          <button
            type="button"
            onClick={() => setStep("done")}
            className="w-full rounded-full bg-[var(--ch-teal)] py-3 text-sm text-white"
          >
            Complete Demo Donation
          </button>
        </div>
      )}

      {step === "checkout" && phase === "3" && (
        <div className="mt-4">
          <button
            type="button"
            disabled
            title="Phase 3 / SOW-2 only"
            className="w-full cursor-not-allowed rounded-full bg-gray-200 py-3 text-sm text-gray-500"
          >
            Redirect to Stripe Checkout
          </button>
        </div>
      )}

      {step === "done" && (
        <div className="mt-4 animate-fade-up text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-2xl text-green-700">
            ✓
          </div>
          <p className="font-semibold">Thank you for your ${amount} donation!</p>
          <Link href={`/impact/${eventId}`} className="mt-4 inline-block text-sm text-[var(--ch-teal)]">
            View impact →
          </Link>
        </div>
      )}
    </div>
  );
}
