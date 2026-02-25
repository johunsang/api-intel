import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center gap-6 px-4 text-center">
      <h1 className="font-mono text-6xl font-bold text-foreground">404</h1>
      <p className="text-lg text-text-secondary">
        요청하신 페이지를 찾을 수 없습니다.
      </p>
      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-white transition-colors hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
        >
          홈으로 이동
        </Link>
        <Link
          href="/query"
          className="inline-flex h-10 items-center justify-center rounded-md border border-border px-4 text-sm font-medium text-foreground transition-colors hover:bg-surface-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
        >
          쿼리 검색하기
        </Link>
      </div>
    </div>
  );
}
