export type AppNotification = {
  id: string;
  text: string;
  href: string;
  time: string;
};

export const appNotifications: AppNotification[] = [
  {
    id: "n-1",
    text: 'Jordan Kim reached a milestone on "Back to School Drive"',
    href: "/feed",
    time: "2m ago",
  },
  {
    id: "n-2",
    text: 'Your event "Knockout ALS" is now Live',
    href: "/events/evt-001",
    time: "15m ago",
  },
  {
    id: "n-3",
    text: "GreenPath Foundation approved your event request",
    href: "/nonprofit/approvals",
    time: "1h ago",
  },
  {
    id: "n-4",
    text: "Alex Rivera posted a new story — tap to watch",
    href: "/creators/se-001",
    time: "3h ago",
  },
  {
    id: "n-5",
    text: "#GreenCityChallenge — 12 people accepted today",
    href: "/compete",
    time: "5h ago",
  },
];
