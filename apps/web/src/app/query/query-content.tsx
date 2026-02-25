"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQueryStore } from "@/store/query-store";
import { useClipboard } from "@/hooks/use-clipboard";
import { useToastStore } from "@/store/toast-store";
import {
  MOCK_EXTRACTED_CONDITIONS,
  MOCK_RESULTS,
} from "@/lib/mock-data";
import { resultToMarkdown } from "@/lib/format";
import { QueryInput } from "@/components/query/query-input";
import { ExampleChips } from "@/components/query/example-chips";
import { ConditionTags } from "@/components/query/condition-tags";
import { StreamingIndicator } from "@/components/query/streaming-indicator";
import { ResultList } from "@/components/query/result-list";

export function QueryContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { copy } = useClipboard();
  const { addToast } = useToastStore();

  const {
    query,
    conditions,
    results,
    phase,
    selectedForCompare,
    setQuery,
    setConditions,
    setResults,
    setPhase,
    addCondition,
    removeCondition,
    updateCondition,
    toggleCompare,
    reset,
  } = useQueryStore();

  const [inputValue, setInputValue] = useState(query);
  const hasAutoExecuted = useRef(false);

  const simulateSearch = useCallback(
    async (queryText: string) => {
      setPhase("analyzing");
      setQuery(queryText);

      await new Promise((r) => setTimeout(r, 1500));
      setConditions(MOCK_EXTRACTED_CONDITIONS);

      setPhase("searching");
      await new Promise((r) => setTimeout(r, 2000));

      setPhase("streaming");
      for (let i = 0; i < MOCK_RESULTS.length; i++) {
        await new Promise((r) => setTimeout(r, 1000));
        setResults(MOCK_RESULTS.slice(0, i + 1));
      }

      setPhase("complete");
    },
    [setPhase, setQuery, setConditions, setResults]
  );

  useEffect(() => {
    const q = searchParams.get("q");
    if (q && phase === "idle" && !hasAutoExecuted.current) {
      hasAutoExecuted.current = true;
      setInputValue(q);
      simulateSearch(q);
    }
  }, [searchParams, phase, simulateSearch]);

  function handleSubmit() {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    if (phase !== "idle" && phase !== "complete" && phase !== "error") return;
    simulateSearch(trimmed);
  }

  function handleChipSelect(selected: string) {
    setInputValue(selected);
    simulateSearch(selected);
  }

  function handleCompare() {
    if (selectedForCompare.length < 2) return;
    router.push(`/compare?ids=${selectedForCompare.join(",")}`);
  }

  function handleCopy() {
    const markdown = resultToMarkdown(results);
    copy(markdown);
    addToast("success", "결과가 클립보드에 복사되었습니다.");
  }

  function handleNewQuery() {
    reset();
    setInputValue("");
    hasAutoExecuted.current = false;
  }

  const isIdle = phase === "idle" && results.length === 0;
  const isProcessing =
    phase === "analyzing" || phase === "searching" || phase === "streaming";

  if (isIdle) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
          <h2 className="text-2xl font-bold text-foreground text-center">
            API에 대해 무엇이든 물어보세요
          </h2>

          <div className="w-full max-w-2xl">
            <QueryInput
              value={inputValue}
              onChange={setInputValue}
              onSubmit={handleSubmit}
            />
          </div>

          <ExampleChips onSelect={handleChipSelect} />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <QueryInput
        value={inputValue}
        onChange={setInputValue}
        onSubmit={handleSubmit}
        disabled={isProcessing}
      />

      {conditions.length > 0 && (
        <ConditionTags
          conditions={conditions}
          onRemove={removeCondition}
          onAdd={addCondition}
          onUpdate={updateCondition}
        />
      )}

      {isProcessing && <StreamingIndicator phase={phase} />}

      {results.length > 0 && (phase === "complete" || phase === "streaming") && (
        <ResultList
          results={results}
          selectedIds={selectedForCompare}
          onToggleCompare={toggleCompare}
          onCompare={handleCompare}
          onCopy={handleCopy}
          onNewQuery={handleNewQuery}
        />
      )}
    </div>
  );
}
