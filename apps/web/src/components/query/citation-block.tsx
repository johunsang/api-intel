"use client";

import type { Citation } from "@/lib/mock-data";

interface CitationBlockProps {
  citation: Citation;
}

export function CitationBlock({ citation }: CitationBlockProps) {
  return (
    <blockquote className="border-l-2 border-primary bg-surface rounded-r-md px-4 py-3">
      <p className="text-xs font-mono text-text-secondary leading-relaxed">
        {citation.text}
      </p>
      <cite className="mt-2 block text-xs text-text-muted not-italic">
        <a
          href={citation.url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary transition-colors underline underline-offset-2"
        >
          {citation.source}
        </a>
      </cite>
    </blockquote>
  );
}
