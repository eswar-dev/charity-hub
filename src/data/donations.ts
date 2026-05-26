import type { Donation } from "@/types";

export const donations: Donation[] = [
  {
    id: "don-001",
    eventId: "evt-001",
    donorName: "Maria Santos",
    amount: 100,
    date: "2026-05-20",
    avatar: "https://picsum.photos/seed/maria/40/40",
  },
  {
    id: "don-002",
    eventId: "evt-001",
    donorName: "James Chen",
    amount: 50,
    date: "2026-05-19",
    avatar: "https://picsum.photos/seed/james/40/40",
  },
  {
    id: "don-003",
    eventId: "evt-001",
    donorName: "Anonymous",
    amount: 25,
    date: "2026-05-18",
    avatar: "https://picsum.photos/seed/anon1/40/40",
  },
  {
    id: "don-004",
    eventId: "evt-001",
    donorName: "Elena Park",
    amount: 250,
    date: "2026-05-17",
    avatar: "https://picsum.photos/seed/elena/40/40",
  },
  {
    id: "don-005",
    eventId: "evt-001",
    donorName: "David Kim",
    amount: 75,
    date: "2026-05-16",
    avatar: "https://picsum.photos/seed/david/40/40",
  },
  {
    id: "don-006",
    eventId: "evt-001",
    donorName: "Rachel Moore",
    amount: 30,
    date: "2026-05-15",
    avatar: "https://picsum.photos/seed/rachel/40/40",
  },
];

export function getDonationsForEvent(eventId: string): Donation[] {
  return donations.filter((d) => d.eventId === eventId);
}
