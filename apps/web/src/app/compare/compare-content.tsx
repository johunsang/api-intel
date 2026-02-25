"use client";

import { useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Copy, Check, Plus, ArrowRight } from "lucide-react";
import { useAuthStore } from "@/store/auth-store";
import { useClipboard } from "@/hooks/use-clipboard";
import { MOCK_RESULTS } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { CompareTable } from "@/components/compare/compare-table";

const COMPARISON_DATA: Record<string, Record<string, string>> = {
  "twilio-sms": {
    provider: "Twilio Inc.",
    price: "$15 크레딧",
    sdk: "twilio v4.x",
    region: "100+ 국가 지원",
    auth: "API Key",
    rateLimit: "제한 없음",
    docs: "https://docs.twilio.com",
    pricing: "https://twilio.com/pricing",
  },
  "nhn-cloud-sms": {
    provider: "NHN Cloud",
    price: "건당 9.9원",
    sdk: "@nhn-cloud/sms v2.x",
    region: "한국 전용",
    auth: "App Key",
    rateLimit: "초당 50건",
    docs: "https://docs.nhncloud.com/ko/Notification/SMS",
    pricing: "https://nhncloud.com/pricing",
  },
  "aws-sns-sms": {
    provider: "Amazon Web Services",
    price: "$1.00/100건",
    sdk: "@aws-sdk/client-sns v3.x",
    region: "서울 리전",
    auth: "IAM",
    rateLimit: "초당 10건",
    docs: "https://docs.aws.amazon.com/sns",
    pricing: "https://aws.amazon.com/sns/pricing",
  },
};

const ROW_LABELS: { key: string; label: string }[] = [
  { key: "provider", label: "제공 업체" },
  { key: "price", label: "가격" },
  { key: "sdk", label: "SDK (Node.js)" },
  { key: "region", label: "리전 (한국)" },
  { key: "auth", label: "인증 방식" },
  { key: "rateLimit", label: "호출 제한" },
  { key: "docs", label: "공식 문서" },
  { key: "pricing", label: "가격 페이지" },
];

function buildMarkdownTable(
  apis: typeof MOCK_RESULTS,
  rows: typeof ROW_LABELS
): string {
  const header = `| 항목 | ${apis.map((a) => a.name).join(" | ")} |`;
  const divider = `| --- | ${apis.map(() => "---").join(" | ")} |`;
  const body = rows
    .map((row) => {
      const cells = apis
        .map((api) => COMPARISON_DATA[api.id]?.[row.key] ?? "-")
        .join(" | ");
      return `| ${row.label} | ${cells} |`;
    })
    .join("\n");

  return [header, divider, body].join("\n");
}

export function CompareContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated } = useAuthStore();
  const { copied, copy } = useClipboard();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, router]);

  const ids = useMemo(() => {
    const raw = searchParams.get("ids") ?? "";
    return raw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }, [searchParams]);

  const matchedApis = useMemo(
    () => MOCK_RESULTS.filter((r) => ids.includes(r.id)),
    [ids]
  );

  const comparisonRows = useMemo(
    () =>
      ROW_LABELS.map((row) => ({
        label: row.label,
        values: Object.fromEntries(
          matchedApis.map((api) => [
            api.id,
            COMPARISON_DATA[api.id]?.[row.key] ?? "-",
          ])
        ),
      })),
    [matchedApis]
  );

  if (!isAuthenticated) return null;

  if (matchedApis.length < 2) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4">
        <p className="text-lg text-text-secondary">
          비교할 API를 2개 이상 선택해주세요.
        </p>
        <Link href="/query">
          <Button variant="primary">검색으로 돌아가기</Button>
        </Link>
      </div>
    );
  }

  const handleCopy = () => {
    const markdown = buildMarkdownTable(matchedApis, ROW_LABELS);
    copy(markdown);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <Link
        href="/query"
        className="mb-4 inline-flex items-center gap-1 text-sm text-text-secondary transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        검색 결과로
      </Link>

      <h1 className="mb-6 text-2xl font-bold text-foreground">
        API 비교 — {matchedApis.length}개 API 비교 중
      </h1>

      <CompareTable apis={matchedApis} rows={comparisonRows} />

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Button variant="outline" onClick={handleCopy}>
          {copied ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              복사됨
            </>
          ) : (
            <>
              <Copy className="mr-2 h-4 w-4" />
              결과 복사
            </>
          )}
        </Button>
        <Link href="/query">
          <Button variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            새 비교
          </Button>
        </Link>
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowRight className="mr-2 h-4 w-4" />
          검색 결과로
        </Button>
      </div>
    </div>
  );
}
