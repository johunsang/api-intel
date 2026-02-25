"use client";

import { Chip } from "@/components/ui/chip";
import { EXAMPLE_QUERIES } from "@/lib/mock-data";

interface ExampleChipsProps {
  onSelect: (query: string) => void;
}

export function ExampleChips({ onSelect }: ExampleChipsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {EXAMPLE_QUERIES.map((query) => (
        <Chip key={query} onClick={() => onSelect(query)}>
          {query}
        </Chip>
      ))}
    </div>
  );
}
