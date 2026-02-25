"use client";

export function Footer() {
  return (
    <footer className="border-t border-border py-6">
      <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-text-muted">
        <span>&copy; 2026 API Intelligence Engine</span>
        <span className="hidden sm:inline" aria-hidden="true">|</span>
        <a
          href="#"
          className="hover:text-text-secondary transition-colors"
        >
          이용약관
        </a>
        <span className="hidden sm:inline" aria-hidden="true">|</span>
        <a
          href="#"
          className="hover:text-text-secondary transition-colors"
        >
          개인정보처리방침
        </a>
      </div>
    </footer>
  );
}
