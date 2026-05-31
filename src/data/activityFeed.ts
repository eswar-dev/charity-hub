export type ActivityItem = {
  id: string;
  text: string;
  time: string;
  href: string;
  avatarKey?: string;
};

export const seActivityFeed: ActivityItem[] = [
  {
    id: "a1",
    text: "@TomW joined Knockout ALS",
    time: "2m ago",
    href: "/events/evt-001",
    avatarKey: "donations/james",
  },
  {
    id: "a2",
    text: "@SarahK shared your event",
    time: "5m ago",
    href: "/events/evt-001",
    avatarKey: "donations/elena",
  },
  {
    id: "a3",
    text: '@MikeD commented: "Incredible!"',
    time: "8m ago",
    href: "/feed",
    avatarKey: "donations/maria",
  },
  {
    id: "a4",
    text: "@JenL accepted your challenge",
    time: "12m ago",
    href: "/compete",
    avatarKey: "donations/tyler",
  },
  {
    id: "a5",
    text: "@CarlosM gave $25",
    time: "1h ago",
    href: "/impact/evt-001",
    avatarKey: "donations/rachel",
  },
];

export const nonprofitActivityFeed: ActivityItem[] = [
  {
    id: "np-a1",
    text: "12 new participants joined Green City Cleanup",
    time: "1h ago",
    href: "/events/evt-002",
  },
  {
    id: "np-a2",
    text: "Jordan Kim posted a story for your cause",
    time: "2h ago",
    href: "/creators/se-002",
  },
  {
    id: "np-a3",
    text: "3 new comments on Knockout ALS",
    time: "4h ago",
    href: "/events/evt-001",
  },
  {
    id: "np-a4",
    text: "Community momentum unlocked $250 in gifts",
    time: "6h ago",
    href: "/nonprofit/launchpad",
  },
];
