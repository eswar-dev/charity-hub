import type { SocialEntrepreneur } from "@/types";

export const socialEntrepreneurs: SocialEntrepreneur[] = [
  {
    id: "se-001",
    name: "Alex Rivera",
    email: "alex.rivera@example.com",
    bio: "Community organizer passionate about health and environment causes.",
    avatar: "creators/se-001/avatar",
    causeInterests: ["Health", "Environment"],
    nonprofitId: "np-001",
  },
  {
    id: "se-002",
    name: "Jordan Lee",
    email: "jordan.lee@example.com",
    bio: "Education advocate connecting donors to classroom needs.",
    avatar: "creators/se-002/avatar",
    causeInterests: ["Education", "Arts"],
    nonprofitId: "np-002",
  },
  {
    id: "se-003",
    name: "Morgan Ellis",
    email: "morgan.ellis@example.com",
    bio: "Environmental activist building community challenges for urban green spaces.",
    avatar: "creators/se-003/avatar",
    causeInterests: ["Environment", "Community"],
    nonprofitId: "np-001",
  },
];

export function getSEById(id: string): SocialEntrepreneur | undefined {
  return socialEntrepreneurs.find((s) => s.id === id);
}

export const personaLabels = {
  guest: { label: "Guest / Anonymous", emoji: "👤", color: "var(--ch-gray-600)" },
  se: { label: "Social Entrepreneur (Alex)", emoji: "🟣", color: "#7C3AED" },
  nonprofit: {
    label: "Nonprofit Admin (GreenPath)",
    emoji: "🟢",
    color: "var(--ch-teal)",
  },
  admin: { label: "Charity Hub Admin", emoji: "🔵", color: "var(--ch-navy)" },
  founder: { label: "Founders / Operators", emoji: "⚡", color: "var(--ch-amber)" },
} as const;
