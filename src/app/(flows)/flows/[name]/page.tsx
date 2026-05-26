import Link from "next/link";
import { notFound } from "next/navigation";
import { TopBar } from "@/components/layout/TopBar";
import { FlowDiagram } from "@/components/shared/FlowDiagram";
import { NonprofitOnboardingFlowDiagram } from "@/components/shared/NonprofitOnboardingFlowDiagram";
import { flowIndex, flows } from "@/data/flows";

export function generateStaticParams() {
  return flowIndex.map((f) => ({ name: f.slug }));
}

export default function FlowDetailPage({
  params,
}: {
  params: { name: string };
}) {
  const flow = flows[params.name];
  if (!flow) notFound();

  const isNonprofitOnboarding = params.name === "nonprofit-onboarding";

  return (
    <div className="min-h-screen bg-[var(--ch-cream)]">
      <TopBar title={flow.title} breadcrumbs={["Flows", flow.title]} />
      <main
        className={`mx-auto px-4 py-6 ${isNonprofitOnboarding ? "max-w-[1200px]" : "max-w-5xl"}`}
      >
        <Link href="/flows" className="text-sm text-[var(--ch-teal)]">
          ← All flows
        </Link>
        <div className="mt-4">
          {isNonprofitOnboarding ? (
            <NonprofitOnboardingFlowDiagram />
          ) : (
            <FlowDiagram flow={flow} />
          )}
        </div>
      </main>
    </div>
  );
}
