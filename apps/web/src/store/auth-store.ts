"use client";

import { create } from "zustand";
import { MOCK_USER, type UserProfile } from "@/lib/mock-data";

interface AuthState {
  isAuthenticated: boolean;
  user: UserProfile | null;
  login: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  login: () => set({ isAuthenticated: true, user: MOCK_USER }),
  logout: () => set({ isAuthenticated: false, user: null }),
}));
