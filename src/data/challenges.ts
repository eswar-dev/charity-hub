export type Challenge = {
  id: string;
  challengeTag: string;
  description: string;
  donationUnlocked: number;
  acceptedCount: number;
  friendsTagged: number;
  leaderboardRank: number;
  eventId: string;
  creatorName: string;
  seId: string;
};

export const activeChallenges: Challenge[] = [
  {
    id: "ch-001",
    challengeTag: "#GreenCityChallenge",
    description: "Plant a tree in your city this weekend and tag 3 friends to join.",
    donationUnlocked: 25,
    acceptedCount: 12,
    friendsTagged: 8,
    leaderboardRank: 3,
    eventId: "evt-002",
    creatorName: "Morgan Patel",
    seId: "se-003",
  },
  {
    id: "ch-002",
    challengeTag: "#KnockoutALS",
    description: "Share why you fight — post a 15s story and tag your crew.",
    donationUnlocked: 50,
    acceptedCount: 28,
    friendsTagged: 14,
    leaderboardRank: 1,
    eventId: "evt-001",
    creatorName: "Alex Rivera",
    seId: "se-001",
  },
];
