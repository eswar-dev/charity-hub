import { events } from "@/data/events";
import { EventApprovalCard } from "@/components/nonprofit/EventApprovalCard";

export default function ApprovalsPage() {
  const pending = events.filter(
    (e) => e.nonprofitId === "np-001" && e.status === "Pending Approval"
  );

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold text-[var(--ch-navy)]">
        SE Event Approval Queue
      </h1>
      <p className="text-sm text-gray-500">Nonprofit &gt; Approvals</p>
      <div className="mt-6 space-y-4">
        {pending.length > 0 ? (
          pending.map((e) => <EventApprovalCard key={e.id} event={e} />)
        ) : (
          <p className="text-gray-500">No pending approvals.</p>
        )}
        <EventApprovalCard event={events[0]} />
      </div>
    </div>
  );
}
