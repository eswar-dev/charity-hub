export type FeedPostType =
  | "event_update"
  | "story"
  | "milestone"
  | "challenge"
  | "impact_reveal"
  | "shoutout";

export type FeedPost = {
  id: string;
  type: FeedPostType;
  seId: string;
  nonprofitId: string;
  eventId?: string;
  content: string;
  mediaUrl: string;
  mediaType: "image" | "video_thumb";
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
  tags: string[];
  isLive?: boolean;
  isFeatured?: boolean;
};

export const feedPosts: FeedPost[] = [
  {
    id: "post-001",
    type: "event_update",
    seId: "se-001",
    nonprofitId: "np-001",
    eventId: "evt-001",
    content:
      "Round 4 just ended and the crowd is ELECTRIC 🥊 We've raised $8,240 so far for ALS research. Every punch thrown tonight brings a cure closer. Jump in — the link is in the event!",
    mediaUrl: "https://picsum.photos/seed/knockout-ring/800/500",
    mediaType: "image",
    likes: 342,
    comments: 47,
    shares: 89,
    timestamp: "2026-05-29T20:14:00Z",
    tags: ["KnockoutALS", "FightForGood", "ALS"],
    isLive: true,
    isFeatured: true,
  },
  {
    id: "post-002",
    type: "milestone",
    seId: "se-002",
    nonprofitId: "np-002",
    eventId: "evt-003",
    content:
      "🎒 MILESTONE HIT: 100 backpacks filled! We're halfway to our goal with 3 weeks left. These kids are going to walk into school ready to learn. Thank you for being part of this.",
    mediaUrl: "https://picsum.photos/seed/backpacks/800/500",
    mediaType: "image",
    likes: 218,
    comments: 31,
    shares: 55,
    timestamp: "2026-05-29T15:30:00Z",
    tags: ["BackToSchool", "EducationForAll"],
    isFeatured: false,
  },
  {
    id: "post-003",
    type: "challenge",
    seId: "se-003",
    nonprofitId: "np-001",
    eventId: "evt-002",
    content:
      "I challenge @JamieLee and @TaylorRoss to plant a tree in their city this weekend and tag #GreenCityChallenge. For every challenge completed, GreenPath Foundation gets a $25 donation unlocked. Who's in?",
    mediaUrl: "https://picsum.photos/seed/treeplant/800/500",
    mediaType: "image",
    likes: 189,
    comments: 63,
    shares: 128,
    timestamp: "2026-05-28T12:00:00Z",
    tags: ["GreenCityChallenge", "Environment", "CompetitionForGood"],
  },
  {
    id: "post-004",
    type: "story",
    seId: "se-001",
    nonprofitId: "np-001",
    eventId: "evt-001",
    content:
      "My uncle was diagnosed with ALS three years ago. He taught me how to box when I was 9. He can't throw a punch anymore — but tonight, every punch I take is for him. This is why I created the Knockout ALS event. This is what Charity Hub makes possible.",
    mediaUrl: "https://picsum.photos/seed/story-boxer/800/500",
    mediaType: "image",
    likes: 891,
    comments: 112,
    shares: 340,
    timestamp: "2026-05-27T09:00:00Z",
    tags: ["KnockoutALS", "Story", "WhyIFight"],
    isFeatured: true,
  },
  {
    id: "post-005",
    type: "impact_reveal",
    seId: "se-002",
    nonprofitId: "np-002",
    eventId: "evt-003",
    content:
      "IMPACT REVEAL 🌟 Last month's Drive for Literacy raised $12,400. Here's exactly where it went: 847 books purchased. 6 school libraries restocked. 3 after-school reading programs funded for 1 full year. This is what your participation creates.",
    mediaUrl: "https://picsum.photos/seed/library/800/500",
    mediaType: "image",
    likes: 1204,
    comments: 88,
    shares: 456,
    timestamp: "2026-05-26T10:00:00Z",
    tags: ["ImpactReveal", "Education", "Literacy"],
    isFeatured: true,
  },
  {
    id: "post-006",
    type: "shoutout",
    seId: "se-003",
    nonprofitId: "np-001",
    eventId: "evt-002",
    content:
      "Shoutout to the 32 people who showed up in the rain to clean up Riverside Park last Saturday ☔🌿 You made that park beautiful again. The city noticed. The kids playing there noticed. I noticed. See you at the next one.",
    mediaUrl: "https://picsum.photos/seed/park-cleanup/800/500",
    mediaType: "image",
    likes: 445,
    comments: 29,
    shares: 67,
    timestamp: "2026-05-25T16:00:00Z",
    tags: ["GreenCity", "CommunityFirst", "Environment"],
  },
];

export function getPostsBySeId(seId: string): FeedPost[] {
  return feedPosts.filter((p) => p.seId === seId);
}
