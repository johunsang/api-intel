"use client";

import { cn } from "@/lib/cn";
import { formatDate } from "@/lib/format";
import type { QueryHistory } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash2 } from "lucide-react";

interface HistoryCardProps {
  history: QueryHistory;
  onDelete: (id: string) => void;
  onClick: (id: string) => void;
}

export function HistoryCard({ history, onDelete, onClick }: HistoryCardProps) {
  return (
    <Card
      hoverable
      clickable
      onClick={() => onClick(history.id)}
      className="group relative"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-xs text-text-secondary">
            {formatDate(history.createdAt)}
          </p>
          <p className="mt-1 truncate font-mono text-sm text-foreground">
            {history.query}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <Badge variant="primary">{history.resultCount}개 결과</Badge>
            {history.resultApis.map((api) => (
              <span
                key={api}
                className="text-xs text-text-secondary"
              >
                {api}
              </span>
            ))}
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "shrink-0 text-text-secondary opacity-0 transition-opacity",
            "group-hover:opacity-100 hover:text-danger"
          )}
          onClick={(e) => {
            e.stopPropagation();
            onDelete(history.id);
          }}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}
