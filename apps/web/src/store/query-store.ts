"use client";

import { create } from "zustand";
import type { ApiResult } from "@/lib/mock-data";

export type StreamingPhase =
  | "idle"
  | "analyzing"
  | "searching"
  | "streaming"
  | "complete"
  | "error";

interface QueryState {
  query: string;
  conditions: { key: string; label: string; value: string }[];
  results: ApiResult[];
  phase: StreamingPhase;
  selectedForCompare: string[];
  setQuery: (q: string) => void;
  setConditions: (c: { key: string; label: string; value: string }[]) => void;
  addCondition: (c: { key: string; label: string; value: string }) => void;
  removeCondition: (key: string) => void;
  updateCondition: (key: string, value: string) => void;
  setResults: (r: ApiResult[]) => void;
  setPhase: (p: StreamingPhase) => void;
  toggleCompare: (id: string) => void;
  clearCompare: () => void;
  reset: () => void;
}

const initialState = {
  query: "",
  conditions: [] as { key: string; label: string; value: string }[],
  results: [] as ApiResult[],
  phase: "idle" as StreamingPhase,
  selectedForCompare: [] as string[],
};

export const useQueryStore = create<QueryState>((set) => ({
  ...initialState,

  setQuery: (q) => set({ query: q }),

  setConditions: (c) => set({ conditions: c }),

  addCondition: (c) =>
    set((state) => ({ conditions: [...state.conditions, c] })),

  removeCondition: (key) =>
    set((state) => ({
      conditions: state.conditions.filter((c) => c.key !== key),
    })),

  updateCondition: (key, value) =>
    set((state) => ({
      conditions: state.conditions.map((c) =>
        c.key === key ? { ...c, value } : c
      ),
    })),

  setResults: (r) => set({ results: r }),

  setPhase: (p) => set({ phase: p }),

  toggleCompare: (id) =>
    set((state) => {
      const exists = state.selectedForCompare.includes(id);
      if (exists) {
        return {
          selectedForCompare: state.selectedForCompare.filter((i) => i !== id),
        };
      }
      if (state.selectedForCompare.length >= 5) {
        return state;
      }
      return {
        selectedForCompare: [...state.selectedForCompare, id],
      };
    }),

  clearCompare: () => set({ selectedForCompare: [] }),

  reset: () => set({ ...initialState }),
}));
