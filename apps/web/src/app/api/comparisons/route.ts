import { NextResponse } from "next/server";
import { MOCK_RESULTS } from "@/lib/mock-data";

function getConditionDetail(
  apiId: string,
  conditionLabel: string
): string | undefined {
  const api = MOCK_RESULTS.find((r) => r.id === apiId);
  if (!api) return undefined;
  const cond = api.conditions.find((c) => c.label.startsWith(conditionLabel));
  return cond?.detail;
}

function getCitation(apiId: string, keyword: string): string | undefined {
  const api = MOCK_RESULTS.find((r) => r.id === apiId);
  if (!api) return undefined;
  const citation = api.citations.find((c) =>
    c.text.toLowerCase().includes(keyword.toLowerCase())
  );
  return citation?.source;
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const ids: string[] = body.ids ?? [];

  if (!ids.length) {
    return NextResponse.json(
      { message: "비교할 API를 선택해주세요." },
      { status: 400 }
    );
  }

  const apis = MOCK_RESULTS.filter((r) => ids.includes(r.id));

  if (!apis.length) {
    return NextResponse.json(
      { message: "일치하는 API를 찾을 수 없습니다." },
      { status: 404 }
    );
  }

  const buildValues = (fn: (apiId: string) => string) => {
    const values: Record<string, string> = {};
    for (const api of apis) {
      values[api.id] = fn(api.id);
    }
    return values;
  };

  const buildCitations = (keyword: string) => {
    const citations: Record<string, string> = {};
    for (const api of apis) {
      const c = getCitation(api.id, keyword);
      if (c) citations[api.id] = c;
    }
    return citations;
  };

  const rows = [
    {
      label: "제공 업체",
      values: buildValues((id) => {
        const api = apis.find((a) => a.id === id);
        return api?.provider ?? "-";
      }),
    },
    {
      label: "가격",
      values: buildValues((id) => {
        return getConditionDetail(id, "무료") ?? "-";
      }),
      citations: buildCitations("credit"),
    },
    {
      label: "SDK (Node.js)",
      values: buildValues((id) => {
        return getConditionDetail(id, "SDK") ?? "-";
      }),
    },
    {
      label: "리전 (한국)",
      values: buildValues((id) => {
        return getConditionDetail(id, "리전") ?? "-";
      }),
    },
    {
      label: "인증 방식",
      values: buildValues((id) => {
        const map: Record<string, string> = {
          "twilio-sms": "API Key + Auth Token",
          "nhn-cloud-sms": "App Key + Secret Key",
          "aws-sns-sms": "IAM Access Key",
        };
        return map[id] ?? "-";
      }),
    },
    {
      label: "호출 제한",
      values: buildValues((id) => {
        const map: Record<string, string> = {
          "twilio-sms": "기본 제한 없음 (동시 100건)",
          "nhn-cloud-sms": "초당 20건",
          "aws-sns-sms": "소프트 리밋 월 200건",
        };
        return map[id] ?? "-";
      }),
    },
  ];

  return NextResponse.json({ apis, rows });
}
