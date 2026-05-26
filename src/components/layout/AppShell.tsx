"use client";

import { useState, type ReactNode } from "react";
import { TopBar } from "./TopBar";

interface NavItem {
  href: string;
  label: string;
  badge?: number;
}

interface AppShellProps {
  title: string;
  breadcrumbs?: string[];
  roleBadge: string;
  roleColor: string;
  navItems: NavItem[];
  sidebar: ReactNode;
  children: ReactNode;
}

export function AppShell({
  title,
  breadcrumbs,
  roleBadge,
  roleColor,
  navItems,
  sidebar,
  children,
}: AppShellProps) {
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
          className={`fixed inset-y-0 left-0 z-30 w-60 transform border-r border-gray-100 bg-white pt-16 transition lg:static lg:translate-x-0 ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div
            className="border-b px-4 py-4"
            style={{ borderColor: roleColor }}
          >
            <span
              className="rounded-full px-3 py-1 text-xs font-semibold text-white"
              style={{ backgroundColor: roleColor }}
            >
              {roleBadge}
            </span>
          </div>
          <nav className="p-3" aria-label="Main navigation">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="mb-1 flex items-center justify-between rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-teal-50 hover:text-[var(--ch-teal)]"
              >
                {item.label}
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
                    {item.badge}
                  </span>
                )}
              </a>
            ))}
          </nav>
          {sidebar}
        </aside>
        {mobileOpen && (
          <div
            className="fixed inset-0 z-20 bg-black/30 lg:hidden"
            onClick={() => setMobileOpen(false)}
            aria-hidden
          />
        )}
        <main className="min-h-[calc(100vh-4rem)] flex-1 p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
