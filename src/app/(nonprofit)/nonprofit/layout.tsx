"use client";

import { PortalLayout } from "@/components/layout/PortalLayout";
import { NonprofitSidebar } from "@/components/layout/NonprofitSidebar";

export default function NonprofitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PortalLayout
      title="Nonprofit Launchpad"
      roleBadge="501(c)(3) Nonprofit Admin"
      roleColor="var(--ch-teal)"
      sidebar={<NonprofitSidebar />}
    >
      {children}
    </PortalLayout>
  );
}
