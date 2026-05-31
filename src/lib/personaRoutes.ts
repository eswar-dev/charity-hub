import type { Persona } from "@/types";

/** Default home route when switching persona in the top dropdown */
export const personaHomeRoutes: Record<Persona, string> = {
  guest: "/",
  se: "/se/dashboard",
  nonprofit: "/nonprofit/launchpad",
  admin: "/admin",
  founder: "/flows",
};

/** Infer persona from current URL so the dropdown stays in sync */
export function personaFromPath(pathname: string): Persona | null {
  if (pathname.startsWith("/admin")) return "admin";
  if (pathname.startsWith("/nonprofit")) return "nonprofit";
  if (pathname.startsWith("/se")) return "se";
  if (
    pathname.startsWith("/feed") ||
    pathname.startsWith("/explore") ||
    pathname.startsWith("/compete") ||
    pathname.startsWith("/creators") ||
    pathname.startsWith("/about") ||
    pathname.startsWith("/events") ||
    pathname.startsWith("/donate") ||
    pathname.startsWith("/impact")
  ) {
    return "guest";
  }
  if (pathname === "/") return "guest";
  if (pathname.startsWith("/flows")) return "founder";
  return null;
}
