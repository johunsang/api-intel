"use client";

import { cn } from "@/lib/cn";
import type { ApiLink } from "@/lib/mock-data";
import {
  BookOpen,
  DollarSign,
  Package,
  Activity,
  Github,
} from "lucide-react";

const iconMap = {
  docs: BookOpen,
  pricing: DollarSign,
  sdk: Package,
  status: Activity,
  github: Github,
} as const;

interface ApiLinkButtonsProps {
  links: ApiLink[];
}

export function ApiLinkButtons({ links }: ApiLinkButtonsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {links.map((link) => {
        const Icon = iconMap[link.type];
        return (
          <a
            key={`${link.type}-${link.url}`}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-xs font-medium text-text-secondary transition-colors",
              "hover:bg-surface-hover hover:text-foreground"
            )}
          >
            <Icon className="h-3.5 w-3.5" />
            {link.label}
          </a>
        );
      })}
    </div>
  );
}
