import { NextResponse } from "next/server";
import { MOCK_USER } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json(MOCK_USER);
}

export async function PATCH(request: Request) {
  const body = await request.json().catch(() => ({}));

  if (!body.name || typeof body.name !== "string") {
    return NextResponse.json(
      { message: "이름을 입력해주세요." },
      { status: 400 }
    );
  }

  return NextResponse.json({
    ...MOCK_USER,
    name: body.name,
  });
}
