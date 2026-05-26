import Link from "next/link";
import { AuditLog } from "@/components/admin/AuditLog";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { reviewQueue } from "@/data/adminQueue";

const metrics = [
  { label: "Items in Review Queue", value: "7", href: "/admin/review-queue" },
  { label: "Active Nonprofits", value: "23", href: "/admin/nonprofits" },
  { label: "Pending Events", value: "4", href: "/admin/events" },
  { label: "Flagged Content", value: "2", href: "/admin/content" },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-semibold text-[var(--ch-navy)]">
          Admin Dashboard
        </h1>
        <p className="mt-1 text-sm text-gray-500">Admin &gt; Dashboard</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m) => (
          <Link
            key={m.label}
            href={m.href}
            className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <p className="text-sm text-gray-500">{m.label}</p>
            <p className="font-display mt-2 text-3xl font-bold text-[var(--ch-navy)]">
              {m.value}
            </p>
          </Link>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <section className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold text-[var(--ch-navy)]">Review Queue Preview</h2>
            <Link href="/admin/review-queue" className="text-sm text-[var(--ch-teal)]">
              View all →
            </Link>
          </div>
          <ul className="space-y-3">
            {reviewQueue.slice(0, 5).map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2 text-sm"
              >
                <span>{item.submitter}</span>
                <StatusBadge status={item.status} />
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="mb-4 font-semibold text-[var(--ch-navy)]">Recent Audit Log</h2>
          <AuditLog limit={10} />
        </section>
      </div>

      <section className="flex flex-wrap gap-3">
        {metrics.map((m) => (
          <Link
            key={m.href}
            href={m.href}
            className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-gray-50"
          >
            {m.label}
          </Link>
        ))}
      </section>
    </div>
  );
}
