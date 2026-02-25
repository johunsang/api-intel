"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { Tabs } from "@/components/ui/tabs";
import { ProfileTab } from "@/components/settings/profile-tab";
import { SubscriptionTab } from "@/components/settings/subscription-tab";
import { UsageTab } from "@/components/settings/usage-tab";

const SETTINGS_TABS = [
  { key: "profile", label: "프로필" },
  { key: "subscription", label: "구독" },
  { key: "usage", label: "사용량" },
];

export default function SettingsPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-foreground">설정</h1>

      <Tabs
        tabs={SETTINGS_TABS}
        activeKey={activeTab}
        onTabChange={setActiveTab}
        className="mb-6"
      />

      {activeTab === "profile" && <ProfileTab />}
      {activeTab === "subscription" && <SubscriptionTab />}
      {activeTab === "usage" && <UsageTab />}
    </div>
  );
}
