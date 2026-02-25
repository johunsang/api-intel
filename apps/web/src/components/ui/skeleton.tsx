"use client";

import { cn } from "@/lib/cn";
import { HTMLAttributes } from "react";

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "rounded-md bg-surface-hover animate-pulse",
        className
      )}
      {...props}
    />
  );
}
