"use client";

import { cn } from "@/lib/cn";
import { TextareaHTMLAttributes, forwardRef } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  maxLength?: number;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, maxLength, ...props }, ref) => {
    const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
      const target = e.currentTarget;
      target.style.height = "auto";
      target.style.height = `${target.scrollHeight}px`;
    };

    return (
      <div className="relative">
        <textarea
          ref={ref}
          maxLength={maxLength}
          onInput={handleInput}
          className={cn(
            "flex min-h-[80px] w-full resize-none rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground placeholder:text-text-muted transition-colors",
            "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          {...props}
        />
        {maxLength !== undefined && (
          <span className="absolute bottom-2 right-3 text-xs text-text-muted">
            {(props.value as string)?.length ?? 0}/{maxLength}
          </span>
        )}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";
