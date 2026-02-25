"use client";

import { cn } from "@/lib/cn";
import { Skeleton } from "@/components/ui/skeleton";
import type { StreamingPhase } from "@/store/query-store";

interface StreamingIndicatorProps {
  phase: StreamingPhase;
}

export function StreamingIndicator({ phase }: StreamingIndicatorProps) {
  if (phase === "idle" || phase === "complete") {
    return null;
  }

  if (phase === "error") {
    return null;
  }

  return (
    <div className="space-y-4">
      {/* Analyzing Phase */}
      {phase === "analyzing" && (
        <div className="flex items-center gap-3 rounded-lg border border-border bg-surface p-4">
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-primary" />
          </span>
          <p className="text-sm text-text-secondary animate-pulse">
            조건을 분석하고 있습니다...
          </p>
        </div>
      )}

      {/* Searching Phase */}
      {phase === "searching" && (
        <div className="space-y-3">
          <div className="flex items-center gap-3 rounded-lg border border-border bg-surface p-4">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-primary" />
            </span>
            <p className="text-sm text-text-secondary">
              공식 문서에서 검색 중...
            </p>
          </div>

          {/* Skeleton Cards */}
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-lg border border-border bg-surface p-5 space-y-3"
            >
              <div className="flex items-center gap-3">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-5 w-20 rounded-full" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-5 w-24 rounded-full" />
                <Skeleton className="h-5 w-20 rounded-full" />
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>
              <Skeleton className="h-16 w-full rounded-md" />
              <div className="flex gap-2">
                <Skeleton className="h-7 w-20 rounded-md" />
                <Skeleton className="h-7 w-20 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Streaming Phase */}
      {phase === "streaming" && (
        <div className="flex items-center gap-3 rounded-lg border border-border bg-surface p-4">
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-success" />
          </span>
          <p className="text-sm text-text-secondary">
            결과를 수신하고 있습니다
            <span
              className={cn(
                "inline-block w-[2px] h-4 ml-0.5 bg-foreground align-middle",
                "animate-pulse"
              )}
            />
          </p>
        </div>
      )}
    </div>
  );
}
