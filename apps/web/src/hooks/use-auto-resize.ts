"use client";

import type { RefObject } from "react";
import { useEffect } from "react";

export function useAutoResize(
  ref: RefObject<HTMLTextAreaElement | null>,
  value: string
) {
  useEffect(() => {
    const textarea = ref.current;
    if (!textarea) return;

    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [ref, value]);
}
