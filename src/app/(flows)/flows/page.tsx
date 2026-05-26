import Link from "next/link";
import { TopBar } from "@/components/layout/TopBar";
import { flowIndex } from "@/data/flows";
import { GitBranch } from "lucide-react";

export default function FlowsIndexPage() {
  return (
    <div className="min-h-screen bg-[var(--ch-cream)]">
      <TopBar title="Workflow Diagrams" />
      <main className="mx-auto max-w-4xl px-4 py-8">
        <h1 className="font-display text-3xl font-semibold text-[var(--ch-navy)]">
          Lifecycle Flow Diagrams
        </h1>
        <p className="mt-2 text-gray-600">
          Interactive SVG diagrams — hover nodes, click linked screens.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {flowIndex.map((flow) => (
            <Link
              key={flow.slug}
              href={`/flows/${flow.slug}`}
              className="group rounded-2xl border bg-white p-6 shadow-sm transition hover:border-[var(--ch-teal)] hover:shadow-md"
            >
              <GitBranch className="h-6 w-6 text-[var(--ch-teal)]" aria-hidden />
              <h2 className="font-display mt-4 text-lg font-semibold group-hover:text-[var(--ch-teal)]">
                {flow.title}
              </h2>
              <p className="mt-2 text-sm text-gray-600">{flow.description}</p>
            </Link>
          ))}
        </div>
        <Link href="/" className="mt-8 inline-block text-sm text-[var(--ch-teal)]">
          ← Landing
        </Link>
      </main>
    </div>
  );
}
