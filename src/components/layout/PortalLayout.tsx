"use client";

import { useState, type ReactNode } from "react";
import { TopBar } from "./TopBar";

interface PortalLayoutProps {
  title: string;
  breadcrumbs?: string[];
  roleBadge: string;
  roleColor: string;
  sidebar: ReactNode;
  children: ReactNode;
}

export function PortalLayout({
  title,
  breadcrumbs,
  roleBadge,
  roleColor,
  sidebar,
  children,
}: PortalLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--ch-cream)]">
      <TopBar
        title={title}
        breadcrumbs={breadcrumbs}
        showMenu
        onMenuClick={() => setMobileOpen(!mobileOpen)}
      />
      <div className="flex">
        <aside
          className={`fixed inset-y-0 left-0 z-30 w-60 transform border-r border-gray-100 bg-white pt-16 transition duration-200 lg:static lg:translate-x-0 ${
            mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <div className="border-b px-4 py-4">
            <span
              className="inline-block rounded-full px-3 py-1 text-xs font-semibold text-white"
              style={{ backgroundColor: roleColor }}
            >
              {roleBadge}
            </span>
          </div>
          {sidebar}
        </aside>
        {mobileOpen && (
          <button
            type="button"
            className="fixed inset-0 z-20 bg-black/30 lg:hidden"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          />
        )}
        <main className="min-h-[calc(100vh-4rem)] flex-1 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
