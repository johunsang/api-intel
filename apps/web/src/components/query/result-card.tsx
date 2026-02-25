"use client";

import { cn } from "@/lib/cn";
import type { ApiResult } from "@/lib/mock-data";
import { Check, X, HelpCircle } from "lucide-react";
import { MatchScoreBadge } from "./match-score-badge";
import { CitationBlock } from "./citation-block";
import { ApiLinkButtons } from "./api-link-buttons";

interface ResultCardProps {
  result: ApiResult;
  selected: boolean;
  onToggleCompare: (id: string) => void;
  onNavigate: (id: string) => void;
}

const statusConfig = {
  met: {
    icon: Check,
    className: "text-success bg-success/15 border-success/30",
  },
  unmet: {
    icon: X,
    className: "text-danger bg-danger/15 border-danger/30",
  },
  unknown: {
    icon: HelpCircle,
    className: "text-text-muted bg-surface-hover border-border",
  },
} as const;

export function ResultCard({
  result,
  selected,
  onToggleCompare,
  onNavigate,
}: ResultCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border bg-surface p-5 transition-colors",
        selected ? "border-primary" : "border-border"
      )}
    >
      <div className="flex gap-4">
        {/* Compare Checkbox */}
        <div className="flex-shrink-0 pt-1">
          <input
            type="checkbox"
            checked={selected}
            onChange={() => onToggleCompare(result.id)}
            className="h-4 w-4 rounded border-border bg-surface text-primary focus:ring-primary focus:ring-offset-background"
            aria-label={`${result.name} 비교 선택`}
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 space-y-3">
          {/* Header: Name, Provider, Score */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => onNavigate(result.id)}
              className="font-mono text-sm font-semibold text-foreground hover:text-primary transition-colors truncate"
            >
              {result.name}
            </button>
            <span className="text-xs text-text-muted">{result.provider}</span>
            <MatchScoreBadge score={result.matchScore} />
          </div>

          {/* Condition Badges */}
          <div className="flex flex-wrap gap-1.5">
            {result.conditions.map((condition) => {
              const config = statusConfig[condition.status];
              const Icon = config.icon;
              return (
                <span
                  key={condition.label}
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs",
                    config.className
                  )}
                  title={condition.detail}
                >
                  <Icon className="h-3 w-3" />
                  {condition.label}
                </span>
              );
            })}
          </div>

          {/* First Citation */}
          {result.citations.length > 0 && (
            <CitationBlock citation={result.citations[0]} />
          )}

          {/* API Link Buttons */}
          {result.links.length > 0 && (
            <ApiLinkButtons links={result.links} />
          )}
        </div>
      </div>
    </div>
  );
}
