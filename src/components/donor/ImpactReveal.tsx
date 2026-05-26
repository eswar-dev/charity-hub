"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PhaseBanner } from "@/components/shared/PhaseBanner";
import { getDonationsForEvent } from "@/data/donations";

interface ImpactRevealProps {
  eventId: string;
  totalRaised: number;
  nonprofitName: string;
}

export function ImpactReveal({
  eventId,
  totalRaised,
  nonprofitName,
}: ImpactRevealProps) {
  const [display, setDisplay] = useState(0);
  const donors = getDonationsForEvent(eventId);

  useEffect(() => {
    const duration = 1200;
    const steps = 40;
    const inc = totalRaised / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += inc;
      if (current >= totalRaised) {
        setDisplay(totalRaised);
        clearInterval(timer);
      } else setDisplay(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [totalRaised]);

  return (
    <div>
      <div className="animate-count-up rounded-2xl bg-gradient-to-br from-[var(--ch-navy)] to-[var(--ch-teal)] p-12 text-center text-white">
        <p className="text-sm uppercase tracking-widest opacity-80">Total Raised</p>
        <p className="font-display mt-2 text-5xl font-bold md:text-6xl">
          ${display.toLocaleString()}
        </p>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border bg-white">
        <table className="w-full text-sm">
          <tbody>
            <tr className="border-b">
              <td className="px-4 py-3 text-gray-600">Donations received</td>
              <td className="px-4 py-3 text-right font-medium">${totalRaised.toLocaleString()}</td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-3 text-gray-600">Platform fee</td>
              <td className="px-4 py-3 text-right font-medium text-gray-400">TBD</td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-gray-600">Payout to nonprofit</td>
              <td className="px-4 py-3 text-right font-medium text-[var(--ch-teal)]">
                ${Math.floor(totalRaised * 0.97).toLocaleString()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="mt-6 rounded-xl bg-teal-50 p-6 text-center text-[var(--ch-navy)]">
        Thank you from <strong>{nonprofitName}</strong> — your generosity creates lasting impact.
      </p>

      <div className="mt-8">
        <h3 className="mb-4 font-semibold">Donor recognition</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {donors.map((d) => (
            <div key={d.id} className="flex items-center gap-3 rounded-xl border p-3">
              <Image src={d.avatar} alt="" width={40} height={40} className="rounded-full" />
              <div>
                <p className="font-medium text-sm">{d.donorName}</p>
                <p className="text-xs text-gray-500">${d.amount}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <PhaseBanner
        phase="3"
        message="Payout evidence and reconciliation are Phase 3 / SOW-2 features."
      />

      <Link
        href="/events"
        className="mt-8 inline-flex rounded-full bg-[var(--ch-teal)] px-8 py-3 text-sm font-medium text-white"
      >
        Participate in the next event
      </Link>
    </div>
  );
}
