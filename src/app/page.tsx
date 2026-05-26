"use client";

import Link from "next/link";
import { TopBar } from "@/components/layout/TopBar";
import { personaHomeRoutes } from "@/lib/personaRoutes";
import type { Persona } from "@/types";
import {
  ArrowRight,
  Building2,
  Heart,
  LayoutDashboard,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";

const personaCards: {
  persona: Persona;
  title: string;
  description: string;
  href: string;
  icon: typeof Heart;
  color: string;
}[] = [
  {
    persona: "guest",
    title: "Guest / Anonymous",
    description: "Public event discovery — no login wall",
    href: "/events",
    icon: Users,
    color: "var(--ch-gray-600)",
  },
  {
    persona: "se",
    title: "Social Entrepreneur",
    description: "Alex Rivera — onboarding, events, profile",
    href: "/se/dashboard",
    icon: Sparkles,
    color: "#7C3AED",
  },
  {
    persona: "nonprofit",
    title: "501(c)(3) Nonprofit Admin",
    description: "GreenPath Foundation — Launchpad & approvals",
    href: "/nonprofit/launchpad",
    icon: Building2,
    color: "var(--ch-teal)",
  },
  {
    persona: "admin",
    title: "Charity Hub Admin",
    description: "Review queue, moderation, payments",
    href: "/admin",
    icon: LayoutDashboard,
    color: "var(--ch-navy)",
  },
  {
    persona: "founder",
    title: "Founders / Operators",
    description: "Ecosystem overview & flow diagrams",
    href: "/flows",
    icon: Zap,
    color: "var(--ch-amber)",
  },
];

const loop = ["Awareness", "Participation", "Engagement", "Donation", "Distribution / Impact"];

const layers = [
  { name: "Admin Layer", items: "Review · Moderation · Monitoring", solid: true },
  { name: "Trust Layer", items: "Verification · Approval · Controls", solid: true },
  { name: "Engagement Layer", items: "Events · Content · Posts", solid: true },
  { name: "Giving Layer", items: "Donation · Transactions", solid: true },
  { name: "Impact Layer", items: "Progress · Impact Reveal", solid: true },
  { name: "Stripe / Payments", items: "Phase 3 / SOW-2", solid: false },
  { name: "AI Support", items: "Phase 1/2 internal", solid: false },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[var(--ch-cream)]">
      <TopBar title="Ecosystem Overview" />

      <main className="mx-auto max-w-6xl px-4 py-10 lg:px-8">
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--ch-navy)] via-[#134063] to-[var(--ch-teal)] px-8 py-16 text-white">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_20%,#14BDBD_0%,transparent_50%)]" />
          <div className="relative max-w-2xl">
            <p className="text-sm uppercase tracking-widest text-teal-200/90">
              Static Prototype v2.0
            </p>
            <h1 className="font-display mt-4 text-4xl font-bold leading-tight md:text-5xl">
              Charity Hub
            </h1>
            <p className="mt-4 text-lg text-teal-50/90">
              Any event can become a reason to give.
            </p>
            <p className="mt-2 text-sm opacity-80">
              Event-led charitable fundraising for US 501(c)(3) nonprofits, Social
              Entrepreneurs, and donors.
            </p>
            <Link
              href="/events"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[var(--ch-navy)]"
            >
              Explore as Guest
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-2xl font-semibold text-[var(--ch-navy)]">
            Platform Ecosystem
          </h2>
          <div className="mt-6 grid gap-3">
            {layers.map((layer) => (
              <div
                key={layer.name}
                className={`rounded-xl px-6 py-4 ${
                  layer.solid
                    ? "border border-gray-100 bg-white shadow-sm"
                    : "border-2 border-dashed border-gray-300 bg-gray-50/80 opacity-75"
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-semibold text-[var(--ch-navy)]">
                    {layer.name}
                  </span>
                  {!layer.solid && (
                    <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-medium text-amber-800">
                      Phase 3 / Demo
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600">{layer.items}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-xl font-semibold text-[var(--ch-navy)]">
            Core Product Loop
          </h2>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {loop.map((step, i) => (
              <span key={step} className="flex items-center gap-2">
                <span className="rounded-full bg-[var(--ch-teal)] px-4 py-2 text-xs font-medium text-white">
                  {step}
                </span>
                {i < loop.length - 1 && (
                  <ArrowRight className="h-4 w-4 text-gray-400" aria-hidden />
                )}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-2xl font-semibold text-[var(--ch-navy)]">
            Enter a Persona Experience
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {personaCards.map((card) => {
              const Icon = card.icon;
              return (
                <Link
                  key={card.persona}
                  href={personaHomeRoutes[card.persona]}
                  className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <div
                    className="inline-flex rounded-xl p-3 text-white"
                    style={{ backgroundColor: card.color }}
                  >
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <h3 className="font-display mt-4 text-lg font-semibold group-hover:text-[var(--ch-teal)]">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">{card.description}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[var(--ch-teal)]">
                    Enter <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="mt-12 rounded-2xl border bg-white p-8 text-center shadow-sm">
          <Heart className="mx-auto h-8 w-8 text-[var(--ch-coral)]" aria-hidden />
          <h2 className="font-display mt-4 text-xl font-semibold">
            Workflow Diagrams
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Six interactive lifecycle diagrams with phase annotations
          </p>
          <Link
            href="/flows"
            className="mt-6 inline-flex rounded-full border-2 border-[var(--ch-navy)] px-8 py-3 text-sm font-medium text-[var(--ch-navy)] hover:bg-[var(--ch-navy)] hover:text-white transition"
          >
            View Flow Index
          </Link>
        </section>
      </main>
    </div>
  );
}
