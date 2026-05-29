export type CreatorProfile = {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  bio: string;
  causeCategories: string[];
  eventsCreated: number;
  totalRaised: number;
  totalParticipants: number;
  impactScore: number;
  followers: number;
  linkedNonprofitIds: string[];
  badges: string[];
  joinedDate: string;
  isVerified: boolean;
};

export const creators: CreatorProfile[] = [
  {
    id: "se-001",
    name: "Alex Rivera",
    handle: "@alexforgood",
    avatar: "https://picsum.photos/seed/alex/200/200",
    bio: "Fighting for ALS research one event at a time. Boxer, community builder, and believer that any event can become a reason to give.",
    causeCategories: ["Health", "Community"],
    eventsCreated: 4,
    totalRaised: 31200,
    totalParticipants: 284,
    impactScore: 9420,
    followers: 1847,
    linkedNonprofitIds: ["np-001"],
    badges: ["Top Creator", "Community Builder", "Impact Leader"],
    joinedDate: "2025-09-01",
    isVerified: true,
  },
  {
    id: "se-002",
    name: "Jordan Kim",
    handle: "@jordanchanges",
    avatar: "https://picsum.photos/seed/jordan/200/200",
    bio: "Educator and storyteller. I believe every child deserves a book and a chance. Creating events that fund classrooms.",
    causeCategories: ["Education", "Youth"],
    eventsCreated: 7,
    totalRaised: 52800,
    totalParticipants: 631,
    impactScore: 18340,
    followers: 3211,
    linkedNonprofitIds: ["np-002"],
    badges: ["Top Creator", "Storyteller", "100+ Participants"],
    joinedDate: "2025-06-15",
    isVerified: true,
  },
  {
    id: "se-003",
    name: "Morgan Patel",
    handle: "@morgangreen",
    avatar: "https://picsum.photos/seed/morgan/200/200",
    bio: "Environmental activist and community organizer. I turn cleanups into movements.",
    causeCategories: ["Environment", "Community"],
    eventsCreated: 3,
    totalRaised: 14500,
    totalParticipants: 189,
    impactScore: 6200,
    followers: 924,
    linkedNonprofitIds: ["np-001"],
    badges: ["Community Builder", "Green Champion"],
    joinedDate: "2025-11-20",
    isVerified: false,
  },
];

export function getCreatorById(id: string): CreatorProfile | undefined {
  return creators.find((c) => c.id === id);
}
