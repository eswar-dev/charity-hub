"use client";

import { PortalLayout } from "@/components/layout/PortalLayout";
import { AdminSidebar } from "@/components/layout/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PortalLayout
      title="Admin Portal"
      roleBadge="Charity Hub Platform Admin"
      roleColor="var(--ch-navy)"
      sidebar={<AdminSidebar />}
    >
      {children}
    </PortalLayout>
  );
}
