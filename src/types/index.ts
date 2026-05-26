export type Persona =
  | "guest"
  | "se"
  | "nonprofit"
  | "admin"
  | "founder";

export type NonprofitStatus =
  | "Active"
  | "Pending Review"
  | "Rejected"
  | "Draft";

export type SettlementStatus =
  | "Pending"
  | "Complete"
  | "Not Started";

export type EventType = "SE-Led" | "Nonprofit-Led";

export type EventStatus =
  | "Draft"
  | "Submitted"
  | "Pending Approval"
  | "Published"
  | "Live"
  | "Completed"
  | "Rejected"
  | "Changes Requested";

export type LifecycleStatus =
  | "Draft"
  | "Submitted"
  | "Pending Review"
  | "More Info Needed"
  | "Approved"
  | "Active"
  | "Live"
  | "Changes Requested"
  | "Rejected"
  | "Cancelled"
  | "Settlement Pending"
  | "Completed"
  | "Published"
  | "Pending Approval"
  | "In Review"
  | "Escalated";

export type ReviewQueueType =
  | "Nonprofit Onboarding"
  | "Event Approval"
  | "Content Moderation"
  | "Payment Issue";

export type ReviewQueueStatus =
  | "Pending"
  | "In Review"
  | "Escalated"
  | "More Info Needed";

export interface Nonprofit {
  id: string;
  name: string;
  ein: string;
  mission: string;
  causeCategory: string;
  status: NonprofitStatus;
  settlementStatus: SettlementStatus;
  eventsCount: number;
  totalRaised: number;
  adminName: string;
  logo: string;
}

export interface SocialEntrepreneur {
  id: string;
  name: string;
  email: string;
  bio: string;
  avatar: string;
  causeInterests: string[];
  nonprofitId: string;
}

export interface Event {
  id: string;
  title: string;
  type: EventType;
  nonprofitId: string;
  seId: string | null;
  status: EventStatus;
  goal: number;
  raised: number;
  participants: number;
  startDate: string;
  causeCategory: string;
  banner: string;
  story: string;
  donationCTA: string;
}

export interface ReviewQueueItem {
  id: string;
  type: ReviewQueueType;
  submitter: string;
  date: string;
  status: ReviewQueueStatus;
  event?: string;
  content?: string;
  issue?: string;
}

export interface Donation {
  id: string;
  eventId: string;
  donorName: string;
  amount: number;
  date: string;
  avatar: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
}

export interface FlowNode {
  id: string;
  label: string;
  x: number;
  y: number;
  shape: "rect" | "rounded" | "diamond" | "circle";
  persona: "nonprofit" | "se" | "admin" | "donor" | "system";
  href?: string;
}

export interface FlowEdge {
  from: string;
  to: string;
  label?: string;
}

export interface FlowAnnotation {
  id: string;
  text: string;
  x: number;
  y: number;
}

export interface FlowDefinition {
  title: string;
  nodes: FlowNode[];
  edges: FlowEdge[];
  annotations?: FlowAnnotation[];
  swimLanes?: { label: string; y: number; height: number }[];
}
