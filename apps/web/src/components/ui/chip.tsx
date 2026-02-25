"use client";

import { cn } from "@/lib/cn";
import { X } from "lucide-react";
import { HTMLAttributes } from "react";

interface ChipProps extends HTMLAttributes<HTMLSpanElement> {
  onRemove?: () => void;
}

export function Chip({
  className,
  children,
  onClick,
  onRemove,
  ...props
}: ChipProps) {
  return (
    <span
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-surface-hover px-3 py-1 text-xs font-medium text-foreground transition-colors",
        onClick && "cursor-pointer hover:bg-border",
        className
      )}
      {...props}
    >
      {children}
      {onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="ml-0.5 rounded-full p-0.5 text-text-muted transition-colors hover:bg-surface hover:text-foreground focus:outline-none"
          aria-label="Remove"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </span>
  );
}
