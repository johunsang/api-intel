"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Check, X, HelpCircle, Copy } from "lucide-react";
import { MOCK_RESULTS } from "@/lib/mock-data";
import { resultToMarkdown } from "@/lib/format";
import { useClipboard } from "@/hooks/use-clipboard";
import { useToastStore } from "@/store/toast-store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MatchScoreBadge } from "@/components/query/match-score-badge";
import { CitationBlock } from "@/components/query/citation-block";
import { ApiLinkButtons } from "@/components/query/api-link-buttons";

const STATUS_CONFIG = {
  met: {
    icon: Check,
    label: "충족",
    variant: "success" as const,
    iconClass: "text-success",
  },
  unmet: {
    icon: X,
    label: "미충족",
    variant: "danger" as const,
    iconClass: "text-danger",
  },
  unknown: {
    icon: HelpCircle,
    label: "확인 불가",
    variant: "secondary" as const,
    iconClass: "text-text-muted",
  },
} as const;

export default function QueryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);
  const router = useRouter();
  const { copied, copy } = useClipboard();
  const { addToast } = useToastStore();

  const result = MOCK_RESULTS.find((r) => r.id === id);

  function handleCopy() {
    if (!result) return;
    const markdown = resultToMarkdown([result]);
    copy(markdown);
    addToast("success", "결과가 클립보드에 복사되었습니다.");
  }

  // Not found state
  if (!result) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-[40vh] gap-4 text-center">
          <p className="text-lg text-text-secondary">
            해당 결과를 찾을 수 없습니다.
          </p>
          <Link
            href="/query"
            className="text-primary hover:text-primary-hover transition-colors underline underline-offset-4"
          >
            검색 페이지로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Back link */}
      <Link
        href="/query"
        className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        결과 목록으로
      </Link>

      {/* Header Card */}
      <Card>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <h1 className="font-mono text-2xl font-bold text-foreground">
              {result.name}
            </h1>
            <div className="flex flex-wrap items-center gap-2 text-sm text-text-secondary">
              <span>{result.provider}</span>
              <span className="text-border">|</span>
              <span>{result.category}</span>
            </div>
          </div>
          <MatchScoreBadge score={result.matchScore} />
        </div>
        <p className="mt-4 text-sm text-text-secondary leading-relaxed">
          {result.description}
        </p>
      </Card>

      {/* Condition Matching Table */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground">조건 매칭</h2>
        <Card className="p-0 overflow-hidden">
          <div className="divide-y divide-border">
            {result.conditions.map((condition, idx) => {
              const config = STATUS_CONFIG[condition.status];
              const StatusIcon = config.icon;
              return (
                <div
                  key={idx}
                  className="flex flex-col gap-2 px-6 py-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-3">
                    <StatusIcon className={`h-4 w-4 shrink-0 ${config.iconClass}`} />
                    <span className="text-sm font-medium text-foreground">
                      {condition.label}
                    </span>
                    <Badge variant={config.variant}>{config.label}</Badge>
                  </div>
                  <p className="text-sm text-text-secondary sm:text-right">
                    {condition.detail}
                  </p>
                </div>
              );
            })}
          </div>
        </Card>
      </section>

      {/* Citations Section */}
      {result.citations.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">
            출처 ({result.citations.length})
          </h2>
          <div className="space-y-3">
            {result.citations.map((citation, idx) => (
              <CitationBlock key={idx} citation={citation} />
            ))}
          </div>
        </section>
      )}

      {/* Links Section */}
      {result.links.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">링크</h2>
          <ApiLinkButtons links={result.links} />
        </section>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-border">
        <Button
          variant="primary"
          onClick={() => router.push(`/compare?ids=${result.id}`)}
        >
          비교하기
        </Button>
        <Button variant="outline" onClick={handleCopy}>
          <Copy className="mr-1.5 h-4 w-4" />
          {copied ? "복사됨" : "결과 복사"}
        </Button>
        <Button variant="ghost" onClick={() => router.back()}>
          뒤로가기
        </Button>
      </div>
    </div>
  );
}
