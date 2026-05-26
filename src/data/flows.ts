import type { FlowDefinition } from "@/types";

export const flowIndex = [
  {
    slug: "nonprofit-onboarding",
    title: "501(c)(3) Nonprofit Onboarding Lifecycle",
    description: "From discovery through admin review and activation.",
  },
  {
    slug: "se-event-creation",
    title: "Social Entrepreneur Event Creation & Approval",
    description: "SE profile, nonprofit connection, submission, and approval.",
  },
  {
    slug: "donor-lifecycle",
    title: "Donor / Participant Lifecycle",
    description: "Discovery, trust, engagement, donation, and impact.",
  },
  {
    slug: "admin-lifecycle",
    title: "Admin Review, Moderation & Control",
    description: "Four swim lanes converging at audit and notification.",
  },
  {
    slug: "nonprofit-event-creation",
    title: "Nonprofit-Led Event Creation Lifecycle",
    description: "Create, configure, settlement check, publish, monitor.",
  },
  {
    slug: "ecosystem-overview",
    title: "Charity Hub Ecosystem Context",
    description: "All personas and platform layers in business view.",
  },
];

export const flows: Record<string, FlowDefinition> = {
  "nonprofit-onboarding": {
    title: "501(c)(3) Nonprofit Onboarding Lifecycle",
    nodes: [
      { id: "start", label: "Start", x: 380, y: 20, shape: "circle", persona: "nonprofit" },
      { id: "discover", label: "Discover", x: 360, y: 80, shape: "rounded", persona: "nonprofit", href: "/nonprofit/onboarding" },
      { id: "register", label: "Register", x: 360, y: 160, shape: "rect", persona: "nonprofit", href: "/nonprofit/onboarding" },
      { id: "profile", label: "Create Profile", x: 360, y: 240, shape: "rect", persona: "nonprofit" },
      { id: "attest", label: "Attestation", x: 360, y: 320, shape: "rect", persona: "nonprofit" },
      { id: "phase", label: "Phase Split", x: 360, y: 400, shape: "diamond", persona: "system" },
      { id: "submit", label: "Submit", x: 360, y: 500, shape: "rect", persona: "nonprofit" },
      { id: "review", label: "Admin Review", x: 600, y: 500, shape: "rect", persona: "admin", href: "/admin/review-queue" },
      { id: "active", label: "Active", x: 600, y: 400, shape: "circle", persona: "admin", href: "/nonprofit/launchpad" },
    ],
    edges: [
      { from: "start", to: "discover" },
      { from: "discover", to: "register" },
      { from: "register", to: "profile" },
      { from: "profile", to: "attest" },
      { from: "attest", to: "phase" },
      { from: "phase", to: "submit", label: "Demo" },
      { from: "submit", to: "review" },
      { from: "review", to: "active", label: "Approve" },
    ],
    annotations: [
      { id: "a1", text: "Phase 3: Real EIN validation (SOW-2)", x: 520, y: 380 },
    ],
  },
  "se-event-creation": {
    title: "Social Entrepreneur Event Creation & Approval Lifecycle",
    nodes: [
      { id: "discover", label: "SE Discovers", x: 80, y: 40, shape: "rounded", persona: "donor", href: "/events" },
      { id: "profile", label: "Create Profile", x: 80, y: 120, shape: "rect", persona: "se", href: "/se/onboarding" },
      { id: "np", label: "Browse Nonprofit", x: 80, y: 200, shape: "rect", persona: "se" },
      { id: "avail", label: "NP Available?", x: 60, y: 280, shape: "diamond", persona: "se" },
      { id: "create", label: "Start Event", x: 280, y: 360, shape: "rect", persona: "se", href: "/se/events/create" },
      { id: "submit", label: "Submit", x: 480, y: 360, shape: "rect", persona: "se" },
      { id: "notify", label: "Notify NP Admin", x: 680, y: 360, shape: "rect", persona: "admin" },
      { id: "approved", label: "Approved?", x: 660, y: 280, shape: "diamond", persona: "nonprofit", href: "/nonprofit/approvals" },
      { id: "live", label: "Publish / Live", x: 680, y: 160, shape: "circle", persona: "donor", href: "/events/evt-001" },
    ],
    edges: [
      { from: "discover", to: "profile" },
      { from: "profile", to: "np" },
      { from: "np", to: "avail" },
      { from: "avail", to: "create", label: "Yes" },
      { from: "create", to: "submit" },
      { from: "submit", to: "notify" },
      { from: "notify", to: "approved" },
      { from: "approved", to: "live", label: "Yes" },
    ],
    annotations: [
      { id: "a1", text: "Identity at action gate, not discovery", x: 240, y: 40 },
    ],
  },
  "donor-lifecycle": {
    title: "Donor / Participant Lifecycle",
    nodes: [
      { id: "see", label: "See Event", x: 360, y: 30, shape: "rounded", persona: "donor", href: "/events" },
      { id: "open", label: "Open Page", x: 360, y: 100, shape: "rect", persona: "donor", href: "/events/evt-001" },
      { id: "trust", label: "Trusts Event?", x: 340, y: 180, shape: "diamond", persona: "donor" },
      { id: "engage", label: "Engage", x: 360, y: 280, shape: "rect", persona: "donor" },
      { id: "donate", label: "Donate?", x: 340, y: 360, shape: "diamond", persona: "donor" },
      { id: "demo", label: "Demo Checkout", x: 160, y: 440, shape: "rect", persona: "donor", href: "/donate/evt-001" },
      { id: "impact", label: "Impact Reveal", x: 560, y: 440, shape: "circle", persona: "donor", href: "/impact/evt-001" },
    ],
    edges: [
      { from: "see", to: "open" },
      { from: "open", to: "trust" },
      { from: "trust", to: "engage", label: "Yes" },
      { from: "engage", to: "donate" },
      { from: "donate", to: "demo", label: "Phase 2" },
      { from: "demo", to: "impact" },
    ],
    annotations: [
      { id: "a1", text: "No real Stripe in Phase 2", x: 120, y: 360 },
    ],
  },
  "admin-lifecycle": {
    title: "Admin Review, Moderation & Control Lifecycle",
    swimLanes: [
      { label: "Lane 1: Nonprofit Onboarding", y: 40, height: 100 },
      { label: "Lane 2: Event Approval", y: 150, height: 100 },
      { label: "Lane 3: Content Moderation", y: 260, height: 100 },
      { label: "Lane 4: Payment / Payout", y: 370, height: 100 },
    ],
    nodes: [
      { id: "np-in", label: "Onboarding Queue", x: 40, y: 60, shape: "rect", persona: "admin", href: "/admin/review-queue" },
      { id: "evt-in", label: "Event Queue", x: 40, y: 170, shape: "rect", persona: "admin", href: "/admin/review-queue" },
      { id: "cnt-in", label: "Content Flags", x: 40, y: 280, shape: "rect", persona: "admin", href: "/admin/content" },
      { id: "pay-in", label: "Payment Issues", x: 40, y: 390, shape: "rect", persona: "admin", href: "/admin/payments" },
      { id: "log", label: "Log Action", x: 400, y: 220, shape: "rect", persona: "admin", href: "/admin" },
      { id: "notify", label: "Notify Stakeholders", x: 640, y: 220, shape: "rounded", persona: "admin" },
    ],
    edges: [
      { from: "np-in", to: "log" },
      { from: "evt-in", to: "log" },
      { from: "cnt-in", to: "log" },
      { from: "pay-in", to: "log" },
      { from: "log", to: "notify" },
    ],
  },
  "nonprofit-event-creation": {
    title: "Nonprofit-Led Event Creation Lifecycle",
    nodes: [
      { id: "login", label: "NP Logs In", x: 360, y: 30, shape: "rounded", persona: "nonprofit", href: "/nonprofit/launchpad" },
      { id: "create", label: "Create Event", x: 360, y: 110, shape: "rect", persona: "nonprofit", href: "/nonprofit/events/create" },
      { id: "config", label: "Configure", x: 360, y: 190, shape: "rect", persona: "nonprofit" },
      { id: "settle", label: "Settlement OK?", x: 340, y: 270, shape: "diamond", persona: "nonprofit" },
      { id: "publish", label: "Publish", x: 360, y: 380, shape: "circle", persona: "nonprofit" },
      { id: "monitor", label: "Monitor & Engage", x: 360, y: 470, shape: "rect", persona: "nonprofit", href: "/nonprofit/events" },
    ],
    edges: [
      { from: "login", to: "create" },
      { from: "create", to: "config" },
      { from: "config", to: "settle" },
      { from: "settle", to: "publish", label: "Yes" },
      { from: "publish", to: "monitor" },
    ],
  },
  "ecosystem-overview": {
    title: "Charity Hub Ecosystem Context",
    nodes: [
      { id: "guest", label: "Guest", x: 40, y: 40, shape: "rounded", persona: "donor" },
      { id: "se", label: "Social Entrepreneur", x: 200, y: 40, shape: "rounded", persona: "se" },
      { id: "np", label: "Nonprofit Admin", x: 400, y: 40, shape: "rounded", persona: "nonprofit" },
      { id: "admin", label: "CH Admin", x: 600, y: 40, shape: "rounded", persona: "admin" },
      { id: "trust", label: "Trust Layer", x: 200, y: 180, shape: "rect", persona: "system" },
      { id: "engage", label: "Engagement Layer", x: 400, y: 180, shape: "rect", persona: "system" },
      { id: "giving", label: "Giving Layer", x: 300, y: 280, shape: "rect", persona: "system", href: "/donate/evt-001" },
      { id: "impact", label: "Impact Layer", x: 500, y: 280, shape: "rect", persona: "system", href: "/impact/evt-001" },
      { id: "stripe", label: "Stripe (Phase 3)", x: 300, y: 400, shape: "rect", persona: "system" },
    ],
    edges: [
      { from: "guest", to: "engage" },
      { from: "se", to: "trust" },
      { from: "np", to: "trust" },
      { from: "admin", to: "trust" },
      { from: "trust", to: "engage" },
      { from: "engage", to: "giving" },
      { from: "giving", to: "impact" },
      { from: "giving", to: "stripe" },
    ],
    annotations: [
      { id: "a1", text: "AI Support — Phase 3 if approved", x: 620, y: 380 },
    ],
  },
};
