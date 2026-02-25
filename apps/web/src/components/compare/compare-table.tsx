"use client";

import { cn } from "@/lib/cn";
import type { ApiResult } from "@/lib/mock-data";
import { Check, X, HelpCircle } from "lucide-react";
import { CitationTooltip } from "./citation-tooltip";

interface CompareRow {
  label: string;
  values: Record<string, string>;
  citations?: Record<string, string>;
}

interface CompareTableProps {
  apis: ApiResult[];
  rows: CompareRow[];
}

function StatusIcon({ value }: { value: string }) {
  const lower = value.toLowerCase();

  if (
    lower.includes("지원") ||
    lower.includes("met") ||
    lower === "true" ||
    lower === "yes"
  ) {
    return <Check className="inline-block h-4 w-4 text-success" />;
  }

  if (
    lower.includes("미지원") ||
    lower.includes("unmet") ||
    lower === "false" ||
    lower === "no"
  ) {
    return <X className="inline-block h-4 w-4 text-danger" />;
  }

  if (lower.includes("unknown") || lower === "?") {
    return <HelpCircle className="inline-block h-4 w-4 text-warning" />;
  }

  return null;
}

export function CompareTable({ apis, rows }: CompareTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full min-w-[600px] text-sm">
        <thead>
          <tr className="border-b border-border bg-surface">
            <th className="px-4 py-3 text-left font-medium text-text-secondary">
              항목
            </th>
            {apis.map((api) => (
              <th
                key={api.id}
                className="px-4 py-3 text-left font-mono font-medium text-foreground"
              >
                {api.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border bg-surface">
          {rows.map((row) => (
            <tr key={row.label} className="transition-colors hover:bg-surface-hover">
              <td className="px-4 py-3 font-medium text-text-secondary whitespace-nowrap">
                {row.label}
              </td>
              {apis.map((api) => {
                const value = row.values[api.id] ?? "-";
                const citation = row.citations?.[api.id];

                return (
                  <td key={api.id} className="px-4 py-3 text-foreground">
                    <span className="flex items-center gap-1.5">
                      <StatusIcon value={value} />
                      <span>{value}</span>
                      {citation && (
                        <CitationTooltip citation={citation}>
                          <button
                            type="button"
                            className={cn(
                              "ml-1 inline-flex items-center rounded px-1 py-0.5",
                              "text-xs text-primary hover:bg-primary/10 transition-colors"
                            )}
                          >
                            [인용]
                          </button>
                        </CitationTooltip>
                      )}
                    </span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
