"use client";

import { PortalLayout } from "@/components/layout/PortalLayout";
import { SESidebar } from "@/components/layout/SESidebar";

export default function SELayout({ children }: { children: React.ReactNode }) {
  return (
    <PortalLayout
      title="Social Entrepreneur"
      roleBadge="Social Entrepreneur"
      roleColor="#7C3AED"
      sidebar={<SESidebar />}
    >
      {children}
    </PortalLayout>
  );
}
