"use client";

import { cn } from "@/lib/cn";
import { HTMLAttributes } from "react";

interface Tab {
  key: string;
  label: string;
}

interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  tabs: Tab[];
  activeKey: string;
  onTabChange: (key: string) => void;
}

export function Tabs({
  tabs,
  activeKey,
  onTabChange,
  className,
  ...props
}: TabsProps) {
  return (
    <div
      role="tablist"
      className={cn("flex border-b border-border", className)}
      {...props}
    >
      {tabs.map((tab) => {
        const isActive = tab.key === activeKey;
        return (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onTabChange(tab.key)}
            className={cn(
              "relative px-4 py-2.5 text-sm font-medium transition-colors",
              isActive
                ? "text-primary"
                : "text-text-secondary hover:text-foreground"
            )}
          >
            {tab.label}
            {isActive && (
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary" />
            )}
          </button>
        );
      })}
    </div>
  );
}
