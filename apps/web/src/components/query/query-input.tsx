"use client";

import { cn } from "@/lib/cn";
import { Search } from "lucide-react";
import { useCallback, useRef } from "react";

interface QueryInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
  maxLength?: number;
}

export function QueryInput({
  value,
  onChange,
  onSubmit,
  disabled = false,
  maxLength = 500,
}: QueryInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        if (!disabled && value.trim().length > 0) {
          onSubmit();
        }
      }
    },
    [disabled, value, onSubmit]
  );

  const atLimit = value.length >= maxLength;

  return (
    <div className="w-full">
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          maxLength={maxLength}
          rows={1}
          placeholder="예: 한국 리전 지원, Node.js SDK, 무료 SMS API"
          className={cn(
            "flex min-h-[80px] w-full resize-none rounded-md border border-border bg-surface px-3 py-3 pr-12 text-sm text-foreground placeholder:text-text-muted transition-colors",
            "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background",
            "disabled:cursor-not-allowed disabled:opacity-50"
          )}
        />

        {/* Submit Button */}
        <button
          type="button"
          onClick={onSubmit}
          disabled={disabled || value.trim().length === 0}
          className={cn(
            "absolute right-2 bottom-2 inline-flex items-center justify-center h-8 w-8 rounded-md bg-primary text-white transition-colors",
            "hover:bg-primary-hover",
            "disabled:opacity-50 disabled:pointer-events-none"
          )}
          aria-label="검색"
        >
          <Search className="h-4 w-4" />
        </button>
      </div>

      {/* Character Counter */}
      <div className="mt-1 text-right">
        <span
          className={cn(
            "text-xs",
            atLimit ? "text-danger" : "text-text-muted"
          )}
        >
          {value.length}/{maxLength}
        </span>
      </div>
    </div>
  );
}
