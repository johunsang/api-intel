import { NextResponse } from "next/server";
import { MOCK_RESULTS, MOCK_EXTRACTED_CONDITIONS } from "@/lib/mock-data";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const result = MOCK_RESULTS.find((r) => r.id === id);

  if (!result) {
    return NextResponse.json(
      { message: "결과를 찾을 수 없습니다." },
      { status: 404 }
    );
  }

  return NextResponse.json({
    result,
    conditions: MOCK_EXTRACTED_CONDITIONS,
  });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await params;
  return NextResponse.json({ success: true });
}
