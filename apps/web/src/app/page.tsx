"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FileText, GitCompare, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { QueryInput } from "@/components/query/query-input";
import { ExampleChips } from "@/components/query/example-chips";

const VALUE_CARDS = [
  {
    icon: FileText,
    title: "공식 문서 근거",
    desc: "환각 없는 신뢰할 수 있는 추천. 모든 정보에 출처를 제공합니다.",
  },
  {
    icon: GitCompare,
    title: "조건별 비교",
    desc: "가격, SDK, 리전 등 원하는 조건으로 API를 한눈에 비교합니다.",
  },
  {
    icon: ExternalLink,
    title: "구조화된 링크",
    desc: "공식 문서, 가격, SDK, 상태 페이지 링크를 자동으로 정리합니다.",
  },
] as const;

export default function HomePage() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function handleSubmit() {
    const trimmed = query.trim();
    if (!trimmed) return;
    router.push(`/query?q=${encodeURIComponent(trimmed)}`);
  }

  function handleChipSelect(selected: string) {
    router.push(`/query?q=${encodeURIComponent(selected)}`);
  }

  return (
    <div className="max-w-5xl mx-auto px-4">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center py-16 md:py-24">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground">
          API 선택, 더 이상 감으로 하지 마세요.
        </h1>
        <p className="mt-4 text-lg text-text-secondary max-w-2xl">
          공식 문서 기반 근거와 함께 최적의 API를 추천합니다.
        </p>

        <div className="mt-10 w-full max-w-2xl mx-auto">
          <QueryInput
            value={query}
            onChange={setQuery}
            onSubmit={handleSubmit}
          />
        </div>

        <div className="mt-4">
          <ExampleChips onSelect={handleChipSelect} />
        </div>
      </section>

      {/* Value Cards Section */}
      <section className="pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {VALUE_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <Card key={card.title} hoverable className="flex flex-col gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {card.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {card.desc}
                </p>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
}
