"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Github } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth-store";

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated, login } = useAuthStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/query");
    }
  }, [isAuthenticated, router]);

  async function handleLogin() {
    setLoading(true);
    try {
      // Simulate a brief login delay
      await new Promise((r) => setTimeout(r, 1000));
      login();
      router.push("/query");
    } finally {
      setLoading(false);
    }
  }

  // Don't render the form if already authenticated (redirect is in progress)
  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="max-w-md mx-auto px-4 mt-24">
      <Card className="flex flex-col items-center gap-6 text-center">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">
            API Intelligence Engine
          </h1>
          <p className="text-text-secondary">
            GitHub 계정으로 시작하세요
          </p>
        </div>

        <Button
          variant="primary"
          size="lg"
          loading={loading}
          onClick={handleLogin}
          className="w-full"
        >
          <Github className="mr-2 h-5 w-5" />
          GitHub으로 로그인
        </Button>

        <p className="text-text-muted text-sm">
          GitHub 최초 로그인 시 자동으로 계정이 생성됩니다.
        </p>
      </Card>
    </div>
  );
}
