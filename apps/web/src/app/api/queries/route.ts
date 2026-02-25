import { NextResponse } from "next/server";
import {
  MOCK_EXTRACTED_CONDITIONS,
  MOCK_RESULTS,
  MOCK_HISTORY,
} from "@/lib/mock-data";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));

  if (!body.query) {
    return NextResponse.json(
      { message: "검색어를 입력해주세요." },
      { status: 400 }
    );
  }

  return NextResponse.json({
    id: "q-new",
    conditions: MOCK_EXTRACTED_CONDITIONS,
    results: MOCK_RESULTS,
  });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? "";
  const sort = searchParams.get("sort") ?? "desc";
  const page = Math.max(1, Number(searchParams.get("page") ?? "1"));
  const pageSize = 10;

  let filtered = [...MOCK_HISTORY];

  if (q) {
    const lower = q.toLowerCase();
    filtered = filtered.filter((h) => h.query.toLowerCase().includes(lower));
  }

  filtered.sort((a, b) => {
    const diff =
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    return sort === "asc" ? diff : -diff;
  });

  const total = filtered.length;
  const start = (page - 1) * pageSize;
  const data = filtered.slice(start, start + pageSize);

  return NextResponse.json({
    data,
    total,
    page,
    pageSize,
  });
}
