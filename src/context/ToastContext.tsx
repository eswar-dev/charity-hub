"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { CheckCircle, AlertTriangle, XCircle, X } from "lucide-react";

type ToastVariant = "success" | "warning" | "error";

interface Toast {
  id: number;
  message: string;
  variant: ToastVariant;
}

interface ToastContextValue {
  showToast: (message: string, variant?: ToastVariant) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

let toastId = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback(
    (message: string, variant: ToastVariant = "success") => {
      const id = ++toastId;
      setToasts((prev) => [...prev, { id, message, variant }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3000);
    },
    []
  );

  const dismiss = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const icons = {
    success: CheckCircle,
    warning: AlertTriangle,
    error: XCircle,
  };

  const borders = {
    success: "border-l-green-500",
    warning: "border-l-amber-500",
    error: "border-l-red-500",
  };

  const iconColors = {
    success: "text-green-600",
    warning: "text-amber-600",
    error: "text-red-600",
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2"
        aria-live="polite"
      >
        {toasts.map((t) => {
          const Icon = icons[t.variant];
          return (
            <div
              key={t.id}
              className={`toast-enter flex items-center gap-3 rounded-lg border-l-4 bg-white px-4 py-3 shadow-lg ${borders[t.variant]}`}
              role="status"
            >
              <Icon className={`h-5 w-5 shrink-0 ${iconColors[t.variant]}`} />
              <p className="text-sm text-gray-800">{t.message}</p>
              <button
                type="button"
                onClick={() => dismiss(t.id)}
                className="ml-2 text-gray-400 hover:text-gray-600"
                aria-label="Dismiss notification"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
