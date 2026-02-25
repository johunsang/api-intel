import { NextResponse } from "next/server";
import { MOCK_USER } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json({
    usedQueries: MOCK_USER.usedQueries,
    monthlyQuota: MOCK_USER.monthlyQuota,
    totalQueries: MOCK_USER.totalQueries,
    totalComparisons: MOCK_USER.totalComparisons,
    topCategory: MOCK_USER.topCategory,
    resetDate: MOCK_USER.resetDate,
  });
}
