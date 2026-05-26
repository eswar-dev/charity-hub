import type { AuditLogEntry, ReviewQueueItem } from "@/types";

export const reviewQueue: ReviewQueueItem[] = [
  {
    id: "rq-001",
    type: "Nonprofit Onboarding",
    submitter: "City Shelter Network",
    date: "2026-05-20",
    status: "Pending",
  },
  {
    id: "rq-002",
    type: "Event Approval",
    submitter: "Alex Rivera (SE)",
    event: "Knockout ALS Boxing Night",
    date: "2026-05-19",
    status: "In Review",
  },
  {
    id: "rq-003",
    type: "Content Moderation",
    submitter: "User report",
    content: "Comment on evt-001",
    date: "2026-05-18",
    status: "Pending",
  },
  {
    id: "rq-004",
    type: "Payment Issue",
    submitter: "GreenPath Foundation",
    issue: "Payout delayed — Stripe webhook",
    date: "2026-05-17",
    status: "Escalated",
  },
  {
    id: "rq-005",
    type: "Nonprofit Onboarding",
    submitter: "Sunrise Youth Arts",
    date: "2026-05-15",
    status: "More Info Needed",
  },
  {
    id: "rq-006",
    type: "Event Approval",
    submitter: "Jordan Lee (SE)",
    event: "Back to School Backpack Drive",
    date: "2026-05-14",
    status: "Pending",
  },
  {
    id: "rq-007",
    type: "Content Moderation",
    submitter: "Auto-flag",
    content: "Post on evt-002",
    date: "2026-05-13",
    status: "In Review",
  },
];

export const auditLog: AuditLogEntry[] = [
  {
    id: "al-001",
    timestamp: "2026-05-26 09:14",
    actor: "Admin (Jamie)",
    action: "Approved nonprofit onboarding — Bright Futures",
  },
  {
    id: "al-002",
    timestamp: "2026-05-26 08:42",
    actor: "Admin (Jamie)",
    action: "Requested more info — Sunrise Youth Arts",
  },
  {
    id: "al-003",
    timestamp: "2026-05-25 16:30",
    actor: "Admin (Taylor)",
    action: "Escalated payment issue — rq-004",
  },
  {
    id: "al-004",
    timestamp: "2026-05-25 11:05",
    actor: "Admin (Taylor)",
    action: "Approved event — Green City Cleanup",
  },
  {
    id: "al-005",
    timestamp: "2026-05-24 14:22",
    actor: "Admin (Jamie)",
    action: "Hidden flagged comment on evt-001",
  },
  {
    id: "al-006",
    timestamp: "2026-05-24 10:00",
    actor: "System",
    action: "New review queue item — City Shelter Network",
  },
  {
    id: "al-007",
    timestamp: "2026-05-23 09:45",
    actor: "Admin (Taylor)",
    action: "Rejected event draft — incomplete mission alignment",
  },
  {
    id: "al-008",
    timestamp: "2026-05-22 17:18",
    actor: "Admin (Jamie)",
    action: "Verified EIN match — GreenPath Foundation",
  },
  {
    id: "al-009",
    timestamp: "2026-05-22 12:00",
    actor: "Admin (Taylor)",
    action: "Content kept visible — false positive report",
  },
  {
    id: "al-010",
    timestamp: "2026-05-21 08:30",
    actor: "System",
    action: "Settlement status updated — Bright Futures Complete",
  },
];
