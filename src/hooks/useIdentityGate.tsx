"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { IdentityGate, type IdentityGateAction } from "@/components/shared/IdentityGate";
import { usePersona } from "@/context/PersonaContext";
import { setPostAuthReturn } from "@/lib/guestEngagement";

type GateState = {
  open: boolean;
  action: IdentityGateAction;
  eventTitle?: string;
  returnPath: string;
};

export function useIdentityGate(defaultReturn = "/feed") {
  const router = useRouter();
  const { setPersona } = usePersona();
  const [gate, setGate] = useState<GateState | null>(null);

  const openGate = useCallback(
    (opts: {
      action: IdentityGateAction;
      eventTitle?: string;
      returnPath?: string;
    }) => {
      const returnPath =
        opts.returnPath ??
        (typeof window !== "undefined" ? window.location.pathname : defaultReturn);
      setGate({
        open: true,
        action: opts.action,
        eventTitle: opts.eventTitle,
        returnPath,
      });
    },
    [defaultReturn]
  );

  const closeGate = useCallback(() => setGate(null), []);

  const handleCreateAccount = useCallback(() => {
    if (!gate) return;
    setPostAuthReturn(gate.returnPath);
    const action = gate.action;
    closeGate();
    router.push(`/se/onboarding?from=gate&action=${action}`);
  }, [gate, closeGate, router]);

  const handleSignIn = useCallback(() => {
    if (!gate) return;
    setPersona("se");
    closeGate();
    router.push(gate.returnPath);
  }, [gate, closeGate, router, setPersona]);

  const GateModal = gate?.open ? (
    <IdentityGate
      open
      action={gate.action}
      eventTitle={gate.eventTitle}
      onContinue={handleCreateAccount}
      onDismiss={closeGate}
      onSignIn={handleSignIn}
    />
  ) : null;

  return { openGate, closeGate, GateModal };
}
