import type { Nonprofit } from "@/types";

export const nonprofits: Nonprofit[] = [
  {
    id: "np-001",
    name: "GreenPath Foundation",
    ein: "82-1234567",
    mission: "Connecting communities to environmental action.",
    causeCategory: "Environment",
    status: "Active",
    settlementStatus: "Pending",
    eventsCount: 3,
    totalRaised: 24500,
    adminName: "Sarah Chen",
    logo: "nonprofits/np-001/logo",
  },
  {
    id: "np-002",
    name: "Bright Futures Education Fund",
    ein: "45-7654321",
    mission: "Ensuring every child has access to quality education.",
    causeCategory: "Education",
    status: "Active",
    settlementStatus: "Complete",
    eventsCount: 7,
    totalRaised: 89000,
    adminName: "Marcus Williams",
    logo: "nonprofits/np-002/logo",
  },
  {
    id: "np-003",
    name: "City Shelter Network",
    ein: "67-9012345",
    mission: "Building safe, dignified shelter for those in need.",
    causeCategory: "Human Services",
    status: "Pending Review",
    settlementStatus: "Not Started",
    eventsCount: 0,
    totalRaised: 0,
    adminName: "Priya Patel",
    logo: "nonprofits/np-003/logo",
  },
];

export function getNonprofitById(id: string): Nonprofit | undefined {
  return nonprofits.find((n) => n.id === id);
}
