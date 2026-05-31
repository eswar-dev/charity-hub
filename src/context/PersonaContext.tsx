"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import { personaFromPath } from "@/lib/personaRoutes";
import type { Persona } from "@/types";

interface PersonaContextValue {
  persona: Persona;
  setPersona: (p: Persona) => void;
}

const PersonaContext = createContext<PersonaContextValue | null>(null);

function PersonaPathSync({
  onSync,
}: {
  onSync: (p: Persona) => void;
}) {
  const pathname = usePathname();

  useEffect(() => {
    const inferred = personaFromPath(pathname);
    if (inferred) onSync(inferred);
  }, [pathname, onSync]);

  return null;
}

export function PersonaProvider({ children }: { children: ReactNode }) {
  const [persona, setPersonaState] = useState<Persona>("guest");
  const setPersona = useCallback((p: Persona) => setPersonaState(p), []);

  return (
    <PersonaContext.Provider value={{ persona, setPersona }}>
      <PersonaPathSync onSync={setPersona} />
      {children}
    </PersonaContext.Provider>
  );
}

export function usePersona(): PersonaContextValue {
  const ctx = useContext(PersonaContext);
  if (!ctx) throw new Error("usePersona must be used within PersonaProvider");
  return ctx;
}
