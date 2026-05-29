export type CompetitionEntry = {
  id: string;
  seId: string;
  eventId: string;
  challengeName: string;
  category: string;
  impactScore: number;
  rank: number;
  participants: number;
  raised: number;
  trend: "up" | "down" | "new";
};

export const leaderboard: CompetitionEntry[] = [
  {
    id: "ce-001",
    seId: "se-002",
    eventId: "evt-003",
    challengeName: "Back to School Backpack Drive",
    category: "Education",
    impactScore: 18340,
    rank: 1,
    participants: 631,
    raised: 52800,
    trend: "up",
  },
  {
    id: "ce-002",
    seId: "se-001",
    eventId: "evt-001",
    challengeName: "Knockout ALS Boxing Night",
    category: "Health",
    impactScore: 9420,
    rank: 2,
    participants: 284,
    raised: 31200,
    trend: "up",
  },
  {
    id: "ce-003",
    seId: "se-003",
    eventId: "evt-002",
    challengeName: "Green City Cleanup",
    category: "Environment",
    impactScore: 6200,
    rank: 3,
    participants: 189,
    raised: 14500,
    trend: "new",
  },
  {
    id: "ce-004",
    seId: "se-001",
    eventId: "evt-001",
    challengeName: "Arts for All Schools",
    category: "Arts",
    impactScore: 4100,
    rank: 4,
    participants: 97,
    raised: 8900,
    trend: "down",
  },
  {
    id: "ce-005",
    seId: "se-002",
    eventId: "evt-003",
    challengeName: "Meals for Seniors Month",
    category: "Human Services",
    impactScore: 3860,
    rank: 5,
    participants: 143,
    raised: 7200,
    trend: "up",
  },
];

export const platformAlgorithmComparison = {
  platforms: [
    {
      name: "Instagram",
      logo: "ig",
      color: "#E1306C",
      stack: ["Creator", "Content", "Attention", "Ads"],
      goal: "Maximize engagement",
      optimizesFor: [
        "Likes",
        "Comments",
        "Shares",
        "Saves",
        "Watch time",
        "Frequency",
      ],
      outcome: "Attention",
      valueCreated: "Reach & Engagement",
      algorithm:
        "Keep you on platform longer. More engagement = more ads shown.",
    },
    {
      name: "TikTok",
      logo: "tt",
      color: "#010101",
      stack: ["Creator", "Content", "Views", "Ads"],
      goal: "Maximize watch time",
      optimizesFor: [
        "Watch time",
        "Completion rate",
        "Replays",
        "Interactions",
      ],
      outcome: "Views",
      valueCreated: "Reach & Engagement",
      algorithm: "Keep you watching longer. More views = more ads shown.",
    },
    {
      name: "YouTube",
      logo: "yt",
      color: "#FF0000",
      stack: ["Creator", "Content", "Subscribers", "Ads"],
      goal: "Maximize session time",
      optimizesFor: [
        "Watch time",
        "Click-through rate",
        "Retention",
        "Recommendations",
      ],
      outcome: "Subscribers",
      valueCreated: "Reach & Engagement",
      algorithm:
        "Keep sessions longer. More subscribers = more ad inventory.",
    },
    {
      name: "Charity Hub",
      logo: "ch",
      color: "#0D7377",
      stack: [
        "Social Entrepreneur",
        "Event / Experience",
        "Participation",
        "Impact",
        "Donations",
      ],
      goal: "Maximize impact",
      optimizesFor: [
        "Participation quality",
        "Quality contributions",
        "Impact created",
        "Authenticity",
        "Community uplift",
      ],
      outcome: "Impact",
      valueCreated: "Real-World Change",
      algorithm:
        "Amplify what creates the most good. More impact = more positive outcomes.",
    },
  ],
};
