import Link from "next/link";
import { PhaseBanner } from "@/components/shared/PhaseBanner";

export default function AdminContentPage() {
  const flags = [
    { id: "f1", content: "Comment on evt-001 — potential spam", reporter: "User report" },
    { id: "f2", content: "Post on evt-002 — language concern", reporter: "Auto-flag" },
  ];

  return (
    <div>
      <Link href="/admin" className="text-sm text-[var(--ch-teal)]">← Back</Link>
      <h1 className="font-display mt-4 text-3xl font-semibold text-[var(--ch-navy)]">
        Content Moderation
      </h1>
      <div className="mt-4 space-y-4">
        {flags.map((f) => (
          <div key={f.id} className="rounded-2xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">{f.reporter}</p>
            <p className="mt-1 font-medium">{f.content}</p>
            <div className="mt-4 flex gap-2">
              <button type="button" className="rounded-lg bg-green-50 px-4 py-2 text-sm text-green-800">
                Keep Visible
              </button>
              <button type="button" className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-800">
                Hide / Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 border border-dashed border-gray-300 rounded-2xl p-6 opacity-60">
        <PhaseBanner phase="3" message="AI Support Layer — Phase 3 / SOW-2 if approved. Internal only." />
      </div>
    </div>
  );
}
