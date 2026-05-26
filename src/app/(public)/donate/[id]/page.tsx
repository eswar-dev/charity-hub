"use client";

import { useState } from "react";
import Link from "next/link";
import { TopBar } from "@/components/layout/TopBar";
import { PhaseBanner } from "@/components/shared/PhaseBanner";
import { getEventById } from "@/data/events";
import { notFound } from "next/navigation";

export default function DonatePage({ params }: { params: { id: string } }) {
  const event = getEventById(params.id);
  const [step, setStep] = useState(0);
  const [phase, setPhase] = useState<"2" | "3">("2");
  const [amount, setAmount] = useState(25);

  if (!event) notFound();

  return (
    <div className="min-h-screen bg-[var(--ch-cream)]">
      <TopBar title="Donate" breadcrumbs={["Donate", event.title]} />
      <main className="mx-auto max-w-md px-4 py-8">
        <Link href={`/events/${event.id}`} className="text-sm text-[var(--ch-teal)]">← Back</Link>

        <button
          type="button"
          onClick={() => setPhase(phase === "2" ? "3" : "2")}
          className="mt-4 rounded-full border px-3 py-1 text-xs"
        >
          Phase {phase} (reviewer toggle)
        </button>

        {step === 0 && (
          <div className="mt-6 rounded-2xl border bg-white p-6 shadow-sm animate-fade-up">
            <h1 className="font-display text-xl font-semibold">Identity gate</h1>
            <p className="mt-2 text-sm text-gray-600">Sign in or continue as guest</p>
            <div className="mt-4 flex flex-col gap-2">
              <button type="button" onClick={() => setStep(1)} className="rounded-full bg-[var(--ch-teal)] py-2.5 text-sm text-white">
                Continue as Guest
              </button>
              <button type="button" onClick={() => setStep(1)} className="rounded-lg border py-2.5 text-sm">
                Sign In (demo)
              </button>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="mt-6 rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="font-semibold">Select Amount</h2>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {[10, 25, 50, 100].map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => setAmount(a)}
                  className={`rounded-lg border py-2 text-sm ${amount === a ? "border-[var(--ch-teal)] bg-teal-50" : ""}`}
                >
                  ${a}
                </button>
              ))}
            </div>
            <input
              type="number"
              className="mt-3 w-full rounded-lg border px-3 py-2"
              placeholder="Custom amount"
              onChange={(e) => setAmount(Number(e.target.value) || 0)}
              aria-label="Custom donation amount"
            />
            <button type="button" onClick={() => setStep(2)} className="mt-4 w-full rounded-full bg-[var(--ch-teal)] py-3 text-sm text-white">
              Continue
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="mt-6 space-y-4">
            {phase === "2" ? (
              <>
                <PhaseBanner phase="2" message="Demo checkout — no real payment." />
                <div className="rounded-2xl border bg-white p-6 text-center">
                  <p className="text-sm text-gray-500">Fake checkout</p>
                  <p className="font-display text-3xl font-bold mt-2">${amount}</p>
                  <button type="button" onClick={() => setStep(3)} className="mt-4 w-full rounded-full bg-[var(--ch-teal)] py-3 text-sm text-white">
                    Complete Demo Payment
                  </button>
                </div>
              </>
            ) : (
              <>
                <PhaseBanner phase="3" message="Stripe redirect placeholder." />
                <button type="button" disabled className="w-full cursor-not-allowed rounded-full bg-gray-200 py-3 text-sm text-gray-500">
                  Redirect to Stripe Checkout
                </button>
              </>
            )}
          </div>
        )}

        {step === 3 && (
          <div className="mt-6 rounded-2xl border bg-white p-8 text-center shadow-sm animate-fade-up">
            <p className="text-4xl">🧾</p>
            <h2 className="font-display mt-4 text-xl font-semibold">Thank you!</h2>
            <p className="text-sm text-gray-600">Receipt #{Math.random().toString(36).slice(2, 8).toUpperCase()}</p>
            <p className="mt-2 font-medium">${amount} to {event.title}</p>
            <Link href={`/impact/${event.id}`} className="mt-6 inline-block text-sm text-[var(--ch-teal)]">
              View impact →
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
