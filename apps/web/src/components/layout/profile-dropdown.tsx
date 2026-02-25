"use client";

import { cn } from "@/lib/cn";
import { useAuthStore } from "@/store/auth-store";
import { User } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export function ProfileDropdown() {
  const { user, logout } = useAuthStore();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [open]);

  if (!user) return null;

  return (
    <div ref={containerRef} className="relative">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          "flex items-center justify-center h-8 w-8 rounded-full bg-surface-hover text-text-secondary transition-colors hover:text-foreground hover:bg-border",
          open && "text-foreground bg-border"
        )}
        aria-label="프로필 메뉴"
        aria-expanded={open}
      >
        <User className="h-4 w-4" />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-full mt-2 w-56 rounded-lg border border-border bg-surface shadow-lg py-2 z-50">
          {/* User Info */}
          <div className="px-4 py-2 border-b border-border">
            <p className="text-sm font-medium text-foreground truncate">
              {user.name}
            </p>
            <p className="text-xs text-text-muted truncate">{user.email}</p>
          </div>

          {/* Links */}
          <div className="py-1">
            <Link
              href="/settings"
              onClick={() => setOpen(false)}
              className="block px-4 py-2 text-sm text-text-secondary hover:bg-surface-hover hover:text-foreground transition-colors"
            >
              설정
            </Link>
          </div>

          {/* Logout */}
          <div className="border-t border-border py-1">
            <button
              type="button"
              onClick={() => {
                logout();
                setOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-sm text-text-secondary hover:bg-surface-hover hover:text-foreground transition-colors"
            >
              로그아웃
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
