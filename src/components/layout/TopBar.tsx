"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { PersonaSwitcher } from "./PersonaSwitcher";

interface TopBarProps {
  title: string;
  breadcrumbs?: string[];
  onMenuClick?: () => void;
  showMenu?: boolean;
}

export function TopBar({
  title,
  breadcrumbs = [],
  onMenuClick,
  showMenu = false,
}: TopBarProps) {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-gray-100 bg-white/95 px-4 backdrop-blur lg:px-6">
      <div className="flex items-center gap-3">
        {showMenu && (
          <button
            type="button"
            onClick={onMenuClick}
            className="rounded-lg p-2 hover:bg-gray-100 lg:hidden"
            aria-label="Open navigation menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        )}
        <div>
          <Link
            href="/"
            className="font-display text-sm font-semibold text-[var(--ch-teal)]"
          >
            Charity Hub
          </Link>
          <h1 className="text-sm font-semibold text-[var(--ch-navy)] lg:text-base">
            {title}
          </h1>
          {breadcrumbs.length > 0 && (
            <nav
              className="text-xs text-gray-500"
              aria-label="Breadcrumb"
            >
              {breadcrumbs.join(" > ")}
            </nav>
          )}
        </div>
      </div>
      <PersonaSwitcher />
    </header>
  );
}
