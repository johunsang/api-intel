"use client";

import { cn } from "@/lib/cn";
import { ReactNode, useState } from "react";

interface CitationTooltipProps {
  citation: string;
  children: ReactNode;
}

export function CitationTooltip({ citation, children }: CitationTooltipProps) {
  const [visible, setVisible] = useState(false);

  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onClick={() => setVisible((prev) => !prev)}
    >
      {children}
      {visible && (
        <span
          className={cn(
            "absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2",
            "max-w-sm rounded-lg border border-border bg-surface p-3",
            "text-sm font-mono text-foreground shadow-lg"
          )}
        >
          {citation}
          <span
            className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-border"
            aria-hidden="true"
          />
        </span>
      )}
    </span>
  );
}
