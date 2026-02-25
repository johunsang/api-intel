"use client";

import { cn } from "@/lib/cn";
import { useAuthStore } from "@/store/auth-store";
import { X } from "lucide-react";
import Link from "next/link";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { isAuthenticated, login } = useAuthStore();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 sm:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Slide-in Panel */}
      <div
        className={cn(
          "fixed top-0 right-0 z-50 h-full w-64 bg-surface border-l border-border shadow-lg transform transition-transform duration-200 ease-in-out sm:hidden",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 h-16 border-b border-border">
          <span className="text-sm font-medium text-foreground">메뉴</span>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-text-secondary hover:text-foreground transition-colors"
            aria-label="메뉴 닫기"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex flex-col py-4">
          <Link
            href="/query"
            onClick={onClose}
            className="px-4 py-3 text-sm font-medium text-text-secondary hover:bg-surface-hover hover:text-foreground transition-colors"
          >
            쿼리
          </Link>

          {isAuthenticated && (
            <>
              <Link
                href="/history"
                onClick={onClose}
                className="px-4 py-3 text-sm font-medium text-text-secondary hover:bg-surface-hover hover:text-foreground transition-colors"
              >
                이력
              </Link>
              <Link
                href="/settings"
                onClick={onClose}
                className="px-4 py-3 text-sm font-medium text-text-secondary hover:bg-surface-hover hover:text-foreground transition-colors"
              >
                설정
              </Link>
            </>
          )}

          {!isAuthenticated && (
            <div className="px-4 pt-4">
              <button
                type="button"
                onClick={() => {
                  login();
                  onClose();
                }}
                className="w-full h-10 px-4 text-sm font-medium rounded-md bg-primary text-white hover:bg-primary-hover transition-colors"
              >
                로그인
              </button>
            </div>
          )}
        </nav>
      </div>
    </>
  );
}
