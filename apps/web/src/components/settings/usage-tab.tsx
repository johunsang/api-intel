"use client";

import Link from "next/link";
import { useAuthStore } from "@/store/auth-store";
import { formatDate } from "@/lib/format";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Button } from "@/components/ui/button";

export function UsageTab() {
  const { user } = useAuthStore();

  if (!user) return null;

  const usagePercent = Math.round(
    (user.usedQueries / user.monthlyQuota) * 100
  );

  return (
    <div className="space-y-6">
      <Card className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">월간 사용량</h3>
        <div>
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-text-secondary">
              {user.usedQueries} / {user.monthlyQuota}회
            </span>
            <span className="text-text-secondary">{usagePercent}%</span>
          </div>
          <ProgressBar value={usagePercent} />
        </div>
        <p className="text-xs text-text-secondary">
          초기화 예정일: {formatDate(user.resetDate)}
        </p>
      </Card>

      <Card className="space-y-3">
        <h3 className="text-lg font-semibold text-foreground">통계</h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-text-secondary">총 쿼리 수</span>
            <span className="font-mono text-foreground">
              {user.totalQueries}회
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-text-secondary">총 비교 횟수</span>
            <span className="font-mono text-foreground">
              {user.totalComparisons}회
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-text-secondary">자주 검색하는 카테고리</span>
            <span className="font-mono text-foreground">
              {user.topCategory}
            </span>
          </div>
        </div>
      </Card>

      <Link href="/history">
        <Button variant="outline" className="w-full">
          이력 보기
        </Button>
      </Link>
    </div>
  );
}
