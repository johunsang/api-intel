"use client";

import { cn } from "@/lib/cn";
import { HTMLAttributes } from "react";

interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  showLabel?: boolean;
}

function getBarColor(value: number): string {
  if (value >= 100) return "bg-danger";
  if (value >= 80) return "bg-warning";
  return "bg-primary";
}

export function ProgressBar({
  value,
  showLabel = true,
  className,
  ...props
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div className={cn("flex items-center gap-3", className)} {...props}>
      <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-surface-hover">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-300 ease-out",
            getBarColor(clamped)
          )}
          style={{ width: `${clamped}%` }}
          role="progressbar"
          aria-valuenow={clamped}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
      {showLabel && (
        <span className="min-w-[3ch] text-right text-xs font-medium text-text-secondary">
          {Math.round(clamped)}%
        </span>
      )}
    </div>
  );
}
