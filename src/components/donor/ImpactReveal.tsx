"use client";

import { useEffect, useState } from "react";
import { CdnImage } from "@/components/shared/CdnImage";
import { CdnVideo } from "@/components/shared/CdnVideo";
import Link from "next/link";
import { PhaseBanner } from "@/components/shared/PhaseBanner";
import { getDonationsForEvent } from "@/data/donations";
import { getImpactMediaKey } from "@/lib/media-catalog";

interface ImpactRevealProps {
  eventId: string;
  totalRaised: number;
  nonprofitName: string;
  /** Optional event highlight video asset key */
  eventVideoKey?: string;
}

export function ImpactReveal({
  eventId,
  totalRaised,
  nonprofitName,
  eventVideoKey,
}: ImpactRevealProps) {
  const [display, setDisplay] = useState(0);
  const donors = getDonationsForEvent(eventId);
  const impactMediaKey = getImpactMediaKey(eventId);

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
      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
        {eventVideoKey ? (
          <div className="relative aspect-video w-full bg-gray-900">
            <CdnVideo
              src={eventVideoKey}
              poster={impactMediaKey}
              className="h-full w-full object-cover"
              controls
              muted
              playsInline
            />
          </div>
        ) : (
          <CdnImage
            src={impactMediaKey}
            alt=""
            width={900}
            height={400}
            className="h-48 w-full object-cover md:h-56"
            cdnOptions={{ width: 1200, height: 514, fit: "cover" }}
          />
        )}
        <div className="animate-count-up bg-gradient-to-br from-[var(--ch-navy)] to-[var(--ch-teal)] p-8 text-center text-white md:p-12">
          <p className="text-sm uppercase tracking-widest opacity-80">Total Raised</p>
          <p className="font-display mt-2 text-5xl font-bold md:text-6xl">
            ${display.toLocaleString()}
          </p>
        </div>
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
        {donors.length > 0 ? (
          <div className="grid gap-3 sm:grid-cols-2">
            {donors.map((d) => (
              <div key={d.id} className="flex items-center gap-3 rounded-xl border p-3">
                <CdnImage
                  src={d.avatar}
                  alt=""
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                  cdnOptions={{ width: 80, height: 80, fit: "cover" }}
                />
                <div>
                  <p className="text-sm font-medium">{d.donorName}</p>
                  <p className="text-xs text-gray-500">${d.amount}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center gap-4 rounded-xl border p-4">
            <CdnImage
              src={impactMediaKey}
              alt=""
              width={64}
              height={64}
              className="rounded-xl object-cover"
              cdnOptions={{ width: 128, height: 128, fit: "cover" }}
            />
            <p className="text-sm text-gray-600">
              Be the first supporter — every gift starts the impact story for this event.
            </p>
          </div>
        )}
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
