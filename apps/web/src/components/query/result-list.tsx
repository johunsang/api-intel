"use client";

import { cn } from "@/lib/cn";
import type { ApiResult } from "@/lib/mock-data";
import { GitCompare, Copy, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResultCard } from "./result-card";

interface ResultListProps {
  results: ApiResult[];
  selectedIds: string[];
  onToggleCompare: (id: string) => void;
  onCompare: () => void;
  onCopy: () => void;
  onNewQuery: () => void;
}

export function ResultList({
  results,
  selectedIds,
  onToggleCompare,
  onCompare,
  onCopy,
  onNewQuery,
}: ResultListProps) {
  const handleNavigate = (id: string) => {
    window.open(`/query/${id}`, "_self");
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <h2 className="text-sm font-medium text-text-secondary">
        {results.length}개의 API를 찾았습니다
      </h2>

      {/* Result Cards */}
      <div className="space-y-3">
        {results.map((result) => (
          <ResultCard
            key={result.id}
            result={result}
            selected={selectedIds.includes(result.id)}
            onToggleCompare={onToggleCompare}
            onNavigate={handleNavigate}
          />
        ))}
      </div>

      {/* Bottom Action Bar */}
      <div
        className={cn(
          "flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-surface p-4"
        )}
      >
        <span className="text-xs text-text-muted">
          {selectedIds.length}개 선택됨
        </span>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onCompare}
            disabled={selectedIds.length < 2}
          >
            <GitCompare className="mr-1.5 h-3.5 w-3.5" />
            비교
          </Button>
          <Button variant="outline" size="sm" onClick={onCopy}>
            <Copy className="mr-1.5 h-3.5 w-3.5" />
            복사
          </Button>
          <Button variant="ghost" size="sm" onClick={onNewQuery}>
            <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
            새 쿼리
          </Button>
        </div>
      </div>
    </div>
  );
}
