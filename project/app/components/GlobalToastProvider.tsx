"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type ToastVariant = "success" | "error" | "warning" | "info";

type ToastState = {
  id: number;
  message: string;
  variant: ToastVariant;
};

type NotifyFn = (message: string, variant?: ToastVariant) => void;

const AUTO_HIDE_DELAY_MS = 1500;
const FADE_OUT_DURATION_MS = 700;

const ToastContext = createContext<NotifyFn | null>(null);

export function useGlobalToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useGlobalToast deve ser usado dentro de GlobalToastProvider");
  }

  return context;
}

export default function GlobalToastProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [toast, setToast] = useState<ToastState | null>(null);
  const [isLeaving, setIsLeaving] = useState(false);
  const toastIdRef = useRef(0);
  const hideTimeoutRef = useRef<number | null>(null);
  const removeTimeoutRef = useRef<number | null>(null);

  const clearTimers = useCallback(() => {
    if (hideTimeoutRef.current !== null) {
      window.clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }

    if (removeTimeoutRef.current !== null) {
      window.clearTimeout(removeTimeoutRef.current);
      removeTimeoutRef.current = null;
    }
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  const notify = useCallback<NotifyFn>(
    (message, variant = "info") => {
      clearTimers();
      setIsLeaving(false);

      setToast({
        id: ++toastIdRef.current,
        message,
        variant,
      });

      hideTimeoutRef.current = window.setTimeout(() => {
        setIsLeaving(true);
      }, AUTO_HIDE_DELAY_MS);

      removeTimeoutRef.current = window.setTimeout(() => {
        setToast(null);
        setIsLeaving(false);
      }, AUTO_HIDE_DELAY_MS + FADE_OUT_DURATION_MS);
    },
    [clearTimers]
  );

  const contextValue = useMemo(() => notify, [notify]);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <div className="global-toast-root" aria-live="polite" aria-atomic="true">
        {toast && (
          <div
            key={toast.id}
            className={[
              "global-toast",
              `global-toast-${toast.variant}`,
              isLeaving ? "is-leaving" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            role="status"
          >
            {toast.message}
          </div>
        )}
      </div>
    </ToastContext.Provider>
  );
}
