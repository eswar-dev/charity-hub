"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Bell } from "lucide-react";
import { PersonaSwitcher } from "./PersonaSwitcher";

const notifications = [
  'Jordan Kim just reached a milestone on "Back to School Drive"',
  'Your event "Knockout ALS" is now Live',
  "GreenPath Foundation approved your event request",
];

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
  const [notifOpen, setNotifOpen] = useState(false);

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
            href="/feed"
            className="font-display text-sm font-semibold text-[var(--ch-teal)]"
          >
            Charity Hub
          </Link>
          <h1 className="text-sm font-semibold text-[var(--ch-navy)] lg:text-base">
            {title}
          </h1>
          {breadcrumbs.length > 0 && (
            <nav className="text-xs text-gray-500" aria-label="Breadcrumb">
              {breadcrumbs.join(" > ")}
            </nav>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="relative">
          <button
            type="button"
            onClick={() => setNotifOpen(!notifOpen)}
            className="rounded-full p-2 hover:bg-gray-100"
            aria-label="Notifications"
            aria-expanded={notifOpen}
          >
            <Bell className="h-5 w-5 text-gray-600" />
          </button>
          {notifOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setNotifOpen(false)}
                aria-hidden
              />
              <ul className="absolute right-0 z-50 mt-2 w-80 rounded-xl border bg-white py-2 shadow-xl">
                {notifications.map((n) => (
                  <li
                    key={n}
                    className="border-b border-gray-50 px-4 py-3 text-sm text-gray-700 last:border-0"
                  >
                    🔔 {n}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
        <PersonaSwitcher />
      </div>
    </header>
  );
}
