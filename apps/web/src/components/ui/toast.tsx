"use client";

import { cn } from "@/lib/cn";
import { useToastStore } from "@/store/toast-store";
import { AlertCircle, CheckCircle2, Info, X, XCircle } from "lucide-react";
import { useEffect } from "react";
import { createPortal } from "react-dom";

const iconMap = {
  success: CheckCircle2,
  error: XCircle,
  warning: AlertCircle,
  info: Info,
} as const;

const typeStyles = {
  success: "border-success/40 text-success",
  error: "border-danger/40 text-danger",
  warning: "border-warning/40 text-warning",
  info: "border-primary/40 text-primary",
} as const;

function ToastItem({
  id,
  type,
  message,
}: {
  id: string;
  type: "success" | "error" | "warning" | "info";
  message: string;
}) {
  const removeToast = useToastStore((s) => s.removeToast);
  const Icon = iconMap[type];

  useEffect(() => {
    const timer = setTimeout(() => removeToast(id), 3000);
    return () => clearTimeout(timer);
  }, [id, removeToast]);

  return (
    <div
      role="alert"
      className={cn(
        "pointer-events-auto flex w-80 items-start gap-3 rounded-lg border bg-surface p-4 shadow-lg animate-in slide-in-from-right",
        typeStyles[type]
      )}
    >
      <Icon className="mt-0.5 h-4 w-4 shrink-0" />
      <p className="flex-1 text-sm text-foreground">{message}</p>
      <button
        type="button"
        onClick={() => removeToast(id)}
        className="shrink-0 rounded p-0.5 text-text-muted transition-colors hover:text-foreground focus:outline-none"
        aria-label="Dismiss"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

export function ToastProvider() {
  const toasts = useToastStore((s) => s.toasts);

  if (typeof window === "undefined") return null;

  return createPortal(
    <div className="fixed right-4 top-4 z-[100] flex flex-col gap-2">
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          id={toast.id}
          type={toast.type}
          message={toast.message}
        />
      ))}
    </div>,
    document.body
  );
}
