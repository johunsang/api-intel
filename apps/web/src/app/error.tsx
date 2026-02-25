"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center gap-6 px-4 text-center">
      <h1 className="font-mono text-6xl font-bold text-foreground">500</h1>
      <div className="space-y-2">
        <p className="text-lg text-text-secondary">
          서비스에 일시적인 문제가 발생했습니다.
        </p>
        <p className="text-sm text-text-muted">
          잠시 후 다시 시도해주세요.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="primary" onClick={reset}>
          <RefreshCw className="mr-2 h-4 w-4" />
          새로고침
        </Button>
        <Link href="/">
          <Button variant="outline">홈으로 이동</Button>
        </Link>
      </div>
    </div>
  );
}
