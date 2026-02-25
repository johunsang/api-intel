import type { ApiResult } from "@/lib/mock-data";

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const formatter = new Intl.DateTimeFormat("ko-KR", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const parts = formatter.formatToParts(date);
  const get = (type: string) =>
    parts.find((p) => p.type === type)?.value ?? "";

  return `${get("year")}-${get("month")}-${get("day")} ${get("hour")}:${get("minute")}`;
}

export function formatRelativeDate(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diffMs = now - then;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) return "방금 전";
  if (diffMin < 60) return `${diffMin}분 전`;
  if (diffHour < 24) return `${diffHour}시간 전`;
  if (diffDay < 30) return `${diffDay}일 전`;

  return formatDate(dateStr);
}

export function resultToMarkdown(results: ApiResult[]): string {
  return results
    .map((r) => {
      const conditions = r.conditions
        .map((c) => `  - ${c.label}: ${c.status === "met" ? "O" : "X"} (${c.detail})`)
        .join("\n");

      const links = r.links
        .map((l) => `  - [${l.label}](${l.url})`)
        .join("\n");

      return [
        `## ${r.name}`,
        `**제공 업체:** ${r.provider}`,
        `**카테고리:** ${r.category}`,
        `**매칭 점수:** ${r.matchScore}%`,
        `**설명:** ${r.description}`,
        "",
        "### 조건 매칭",
        conditions,
        "",
        "### 링크",
        links,
      ].join("\n");
    })
    .join("\n\n---\n\n");
}
