"use client";

import { cn } from "@/lib/cn";
import { useAuthStore } from "@/store/auth-store";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ProfileDropdown } from "./profile-dropdown";
import { MobileMenu } from "./mobile-menu";

export function GNB() {
  const pathname = usePathname();
  const { isAuthenticated, user } = useAuthStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isLanding = pathname === "/";

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-colors",
          isLanding
            ? "bg-transparent"
            : "bg-slate-900 border-b border-border"
        )}
      >
        <nav className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-lg font-bold text-foreground tracking-tight"
          >
            API Intelligence Engine
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden sm:flex items-center gap-6">
            <Link
              href="/query"
              className={cn(
                "text-sm font-medium transition-colors hover:text-foreground",
                pathname === "/query"
                  ? "text-foreground"
                  : "text-text-secondary"
              )}
            >
              쿼리
            </Link>
            {isAuthenticated && (
              <Link
                href="/history"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-foreground",
                  pathname === "/history"
                    ? "text-foreground"
                    : "text-text-secondary"
                )}
              >
                이력
              </Link>
            )}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Query Quota Badge (desktop) */}
            {isAuthenticated && user && (
              <span className="hidden sm:inline-flex items-center rounded-full bg-surface-hover px-2.5 py-0.5 text-xs font-medium text-text-secondary">
                {user.usedQueries}/{user.monthlyQuota}
              </span>
            )}

            {/* Profile Dropdown (desktop, authenticated) */}
            {isAuthenticated && (
              <div className="hidden sm:block">
                <ProfileDropdown />
              </div>
            )}

            {/* Login Button (desktop, not authenticated) */}
            {!isAuthenticated && (
              <Link
                href="/login"
                className="hidden sm:inline-flex items-center justify-center h-8 px-3 text-xs font-medium rounded-md bg-primary text-white hover:bg-primary-hover transition-colors"
              >
                로그인
              </Link>
            )}

            {/* Mobile Hamburger */}
            <button
              type="button"
              className="sm:hidden p-2 text-text-secondary hover:text-foreground transition-colors"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="메뉴 열기"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-16" />

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
