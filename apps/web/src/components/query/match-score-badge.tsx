"use client";

import { cn } from "@/lib/cn";

interface MatchScoreBadgeProps {
  score: number;
}

export function MatchScoreBadge({ score }: MatchScoreBadgeProps) {
  const variant =
    score >= 90
      ? "bg-success/15 text-success border-success/30"
      : score >= 70
        ? "bg-warning/15 text-warning border-warning/30"
        : "bg-surface-hover text-text-secondary border-border";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        variant
      )}
    >
      매칭 {score}%
    </span>
  );
}
