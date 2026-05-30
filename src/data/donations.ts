import type { Donation } from "@/types";

export const donations: Donation[] = [
  {
    id: "don-001",
    eventId: "evt-001",
    donorName: "Maria Santos",
    amount: 100,
    date: "2026-05-20",
    avatar: "donations/maria",
  },
  {
    id: "don-002",
    eventId: "evt-001",
    donorName: "James Chen",
    amount: 50,
    date: "2026-05-19",
    avatar: "donations/james",
  },
  {
    id: "don-003",
    eventId: "evt-001",
    donorName: "Anonymous",
    amount: 25,
    date: "2026-05-18",
    avatar: "donations/anon1",
  },
  {
    id: "don-004",
    eventId: "evt-001",
    donorName: "Elena Park",
    amount: 250,
    date: "2026-05-17",
    avatar: "donations/elena",
  },
  {
    id: "don-005",
    eventId: "evt-001",
    donorName: "David Kim",
    amount: 75,
    date: "2026-05-16",
    avatar: "donations/david",
  },
  {
    id: "don-006",
    eventId: "evt-001",
    donorName: "Rachel Moore",
    amount: 30,
    date: "2026-05-15",
    avatar: "donations/rachel",
  },
  {
    id: "don-007",
    eventId: "evt-002",
    donorName: "Sam Ortiz",
    amount: 120,
    date: "2026-05-14",
    avatar: "donations/sam",
  },
  {
    id: "don-008",
    eventId: "evt-002",
    donorName: "Tyler Brooks",
    amount: 45,
    date: "2026-05-13",
    avatar: "donations/tyler",
  },
  {
    id: "don-009",
    eventId: "evt-003",
    donorName: "Priya Nair",
    amount: 200,
    date: "2026-05-12",
    avatar: "donations/priya",
  },
  {
    id: "don-010",
    eventId: "evt-003",
    donorName: "James Chen",
    amount: 75,
    date: "2026-05-11",
    avatar: "donations/james",
  },
];

export function getDonationsForEvent(eventId: string): Donation[] {
  return donations.filter((d) => d.eventId === eventId);
}
