"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type OverlayKey = "notifications" | "persona";

type HeaderOverlayContextValue = {
  isAnyOverlayOpen: boolean;
  setOverlayOpen: (key: OverlayKey, open: boolean) => void;
};

const HeaderOverlayContext = createContext<HeaderOverlayContextValue | null>(
  null
);

export function HeaderOverlayProvider({ children }: { children: ReactNode }) {
  const [openKeys, setOpenKeys] = useState<Record<OverlayKey, boolean>>({
    notifications: false,
    persona: false,
  });

  const setOverlayOpen = useCallback((key: OverlayKey, open: boolean) => {
    setOpenKeys((prev) => ({ ...prev, [key]: open }));
  }, []);

  const isAnyOverlayOpen = openKeys.notifications || openKeys.persona;

  const value = useMemo(
    () => ({ isAnyOverlayOpen, setOverlayOpen }),
    [isAnyOverlayOpen, setOverlayOpen]
  );

  return (
    <HeaderOverlayContext.Provider value={value}>
      {children}
    </HeaderOverlayContext.Provider>
  );
}

export function useHeaderOverlay(): HeaderOverlayContextValue {
  const ctx = useContext(HeaderOverlayContext);
  if (!ctx) {
    throw new Error("useHeaderOverlay must be used within HeaderOverlayProvider");
  }
  return ctx;
}
