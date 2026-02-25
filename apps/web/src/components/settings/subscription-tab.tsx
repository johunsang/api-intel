"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function SubscriptionTab() {
  return (
    <div className="space-y-6">
      <Card className="space-y-4">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold text-foreground">현재 플랜</h3>
          <Badge variant="secondary">Free</Badge>
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-text-secondary">월간 쿼리</span>
            <span className="text-foreground">20회</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-text-secondary">비교 제한</span>
            <span className="text-foreground">최대 3개 API</span>
          </div>
        </div>
      </Card>

      <Button variant="primary" disabled className="w-full">
        Pro 업그레이드 (준비 중)
      </Button>
    </div>
  );
}
