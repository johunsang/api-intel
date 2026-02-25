import { NextResponse } from "next/server";
import { MOCK_USER } from "@/lib/mock-data";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));

  if (body.provider !== "github") {
    return NextResponse.json(
      { message: "지원하지 않는 로그인 방식입니다." },
      { status: 400 }
    );
  }

  return NextResponse.json({
    token: "mock-jwt-token",
    user: MOCK_USER,
  });
}
