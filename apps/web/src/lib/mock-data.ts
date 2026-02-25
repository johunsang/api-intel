export interface ApiResult {
  id: string;
  name: string;
  provider: string;
  category: string;
  matchScore: number;
  conditions: ConditionMatch[];
  citations: Citation[];
  links: ApiLink[];
  description: string;
}

export interface ConditionMatch {
  label: string;
  value: string;
  status: "met" | "unmet" | "unknown";
  detail: string;
}

export interface Citation {
  text: string;
  source: string;
  url: string;
}

export interface ApiLink {
  label: string;
  url: string;
  type: "docs" | "pricing" | "sdk" | "status" | "github";
}

export interface QueryHistory {
  id: string;
  query: string;
  createdAt: string;
  resultCount: number;
  resultApis: string[];
}

export interface UserProfile {
  name: string;
  email: string;
  avatarUrl: string;
  joinedAt: string;
  loginMethod: "github";
  plan: "FREE" | "PRO";
  monthlyQuota: number;
  usedQueries: number;
  totalQueries: number;
  totalComparisons: number;
  topCategory: string;
  resetDate: string;
}

export const EXAMPLE_QUERIES = [
  "Node.js SDK 이메일 API",
  "무료 플랜 벡터 DB 비교",
  "LLM API 가격 비교",
  "한국 리전 결제 API",
];

export const MOCK_EXTRACTED_CONDITIONS = [
  { key: "region", label: "리전", value: "한국" },
  { key: "sdk", label: "SDK", value: "Node.js" },
  { key: "pricing", label: "가격", value: "무료 플랜" },
  { key: "category", label: "카테고리", value: "SMS" },
];

export const MOCK_RESULTS: ApiResult[] = [
  {
    id: "twilio-sms",
    name: "Twilio SMS API",
    provider: "Twilio Inc.",
    category: "메시징/SMS",
    matchScore: 92,
    conditions: [
      { label: "리전: 한국", value: "한국", status: "met", detail: "100+ 국가 지원" },
      { label: "SDK: Node.js", value: "Node.js", status: "met", detail: "twilio (npm) v4.x" },
      { label: "무료 플랜", value: "무료", status: "met", detail: "$15.50 무료 크레딧" },
    ],
    citations: [
      {
        text: "Twilio provides programmable phone numbers in 100+ countries including South Korea. Developers can send and receive SMS using REST APIs and helper libraries.",
        source: "docs.twilio.com/sms/coverage",
        url: "https://docs.twilio.com/sms/coverage",
      },
      {
        text: "Get started with a free trial that includes a $15.50 credit. No credit card required.",
        source: "twilio.com/try-twilio",
        url: "https://twilio.com/try-twilio",
      },
    ],
    links: [
      { label: "공식 문서", url: "https://docs.twilio.com", type: "docs" },
      { label: "가격 페이지", url: "https://twilio.com/pricing", type: "pricing" },
      { label: "SDK (npm)", url: "https://npmjs.com/package/twilio", type: "sdk" },
      { label: "상태 페이지", url: "https://status.twilio.com", type: "status" },
    ],
    description: "전 세계 100개 이상의 국가에서 SMS를 보내고 받을 수 있는 프로그래밍 가능한 메시징 API",
  },
  {
    id: "nhn-cloud-sms",
    name: "NHN Cloud SMS API",
    provider: "NHN Cloud",
    category: "메시징/SMS",
    matchScore: 85,
    conditions: [
      { label: "리전: 한국", value: "한국", status: "met", detail: "한국 전용 서비스" },
      { label: "SDK: Node.js", value: "Node.js", status: "met", detail: "@nhn-cloud/sms v2.x" },
      { label: "무료 플랜", value: "무료", status: "unmet", detail: "건당 9.9원 (종량제)" },
    ],
    citations: [
      {
        text: "NHN Cloud Notification 서비스는 국내 SMS/MMS/알림톡 발송을 지원합니다. 대한민국 발송에 최적화된 인프라를 제공합니다.",
        source: "docs.nhncloud.com/ko/Notification/SMS",
        url: "https://docs.nhncloud.com/ko/Notification/SMS",
      },
    ],
    links: [
      { label: "공식 문서", url: "https://docs.nhncloud.com/ko/Notification/SMS", type: "docs" },
      { label: "가격 페이지", url: "https://nhncloud.com/pricing", type: "pricing" },
      { label: "SDK (npm)", url: "https://npmjs.com/package/@nhn-cloud/sms", type: "sdk" },
    ],
    description: "한국에 최적화된 SMS/MMS/알림톡 발송 서비스",
  },
  {
    id: "aws-sns-sms",
    name: "AWS SNS (SMS)",
    provider: "Amazon Web Services",
    category: "메시징/SMS",
    matchScore: 78,
    conditions: [
      { label: "리전: 한국", value: "한국", status: "met", detail: "서울 리전 (ap-northeast-2)" },
      { label: "SDK: Node.js", value: "Node.js", status: "met", detail: "@aws-sdk/client-sns v3.x" },
      { label: "무료 플랜", value: "무료", status: "met", detail: "월 100건 무료 (프리티어)" },
    ],
    citations: [
      {
        text: "Amazon SNS supports sending SMS messages to phone numbers in over 200 countries. AWS Seoul Region provides low-latency access for Korean users.",
        source: "docs.aws.amazon.com/sns/latest/dg/sns-mobile-phone-number-as-subscriber.html",
        url: "https://docs.aws.amazon.com/sns/latest/dg/sns-mobile-phone-number-as-subscriber.html",
      },
    ],
    links: [
      { label: "공식 문서", url: "https://docs.aws.amazon.com/sns", type: "docs" },
      { label: "가격 페이지", url: "https://aws.amazon.com/sns/pricing", type: "pricing" },
      { label: "SDK (npm)", url: "https://npmjs.com/package/@aws-sdk/client-sns", type: "sdk" },
      { label: "상태 페이지", url: "https://health.aws.amazon.com", type: "status" },
      { label: "GitHub", url: "https://github.com/aws/aws-sdk-js-v3", type: "github" },
    ],
    description: "AWS의 관리형 메시징 서비스로 SMS, 푸시 알림, 이메일을 지원",
  },
];

export const MOCK_HISTORY: QueryHistory[] = [
  {
    id: "q-001",
    query: "한국 리전 지원, Node.js SDK, 무료 플랜 SMS API",
    createdAt: "2026-02-23T14:30:00Z",
    resultCount: 3,
    resultApis: ["Twilio SMS", "NHN Cloud SMS", "AWS SNS"],
  },
  {
    id: "q-002",
    query: "무료 플랜 벡터 DB 비교",
    createdAt: "2026-02-22T09:15:00Z",
    resultCount: 3,
    resultApis: ["Pinecone", "Qdrant", "Weaviate"],
  },
  {
    id: "q-003",
    query: "LLM API 가격 비교 GPT-4 vs Claude",
    createdAt: "2026-02-21T16:45:00Z",
    resultCount: 4,
    resultApis: ["OpenAI GPT-4", "Anthropic Claude", "Google Gemini", "Mistral"],
  },
  {
    id: "q-004",
    query: "OAuth 2.0 인증 라이브러리 Node.js",
    createdAt: "2026-02-20T11:20:00Z",
    resultCount: 3,
    resultApis: ["Auth0", "Firebase Auth", "Supabase Auth"],
  },
  {
    id: "q-005",
    query: "한국 PG사 결제 API 비교",
    createdAt: "2026-02-19T08:00:00Z",
    resultCount: 3,
    resultApis: ["토스페이먼츠", "아임포트", "카카오페이"],
  },
];

export const MOCK_USER: UserProfile = {
  name: "조훈상",
  email: "hunstory@gmail.com",
  avatarUrl: "",
  joinedAt: "2026-02-01",
  loginMethod: "github",
  plan: "FREE",
  monthlyQuota: 20,
  usedQueries: 17,
  totalQueries: 42,
  totalComparisons: 8,
  topCategory: "LLM API",
  resetDate: "2026-03-01",
};

export interface ComparisonRow {
  label: string;
  values: Record<string, string>;
  citations?: Record<string, string>;
}

export const MOCK_COMPARISON_ROWS: ComparisonRow[] = [
  {
    label: "제공 업체",
    values: { "twilio-sms": "Twilio Inc.", "nhn-cloud-sms": "NHN Cloud", "aws-sns-sms": "Amazon Web Services" },
  },
  {
    label: "가격",
    values: { "twilio-sms": "$15.50 무료 크레딧", "nhn-cloud-sms": "건당 9.9원 (종량제)", "aws-sns-sms": "월 100건 무료 (프리티어)" },
    citations: { "twilio-sms": "Get started with a free trial that includes a $15.50 credit.", "nhn-cloud-sms": "NHN Cloud SMS는 건당 9.9원의 종량제 요금이 적용됩니다.", "aws-sns-sms": "AWS SNS provides 100 free SMS per month under the free tier." },
  },
  {
    label: "SDK (Node.js)",
    values: { "twilio-sms": "twilio v4.x", "nhn-cloud-sms": "@nhn-cloud/sms v2.x", "aws-sns-sms": "@aws-sdk/client-sns v3.x" },
    citations: { "twilio-sms": "Install via npm: npm install twilio", "nhn-cloud-sms": "npm install @nhn-cloud/sms", "aws-sns-sms": "npm install @aws-sdk/client-sns" },
  },
  {
    label: "리전 (한국)",
    values: { "twilio-sms": "지원 (100+ 국가)", "nhn-cloud-sms": "지원 (한국 전용)", "aws-sns-sms": "지원 (서울 리전)" },
    citations: { "twilio-sms": "Twilio provides programmable phone numbers in 100+ countries including South Korea.", "nhn-cloud-sms": "NHN Cloud Notification 서비스는 국내 SMS/MMS/알림톡 발송을 지원합니다.", "aws-sns-sms": "Amazon SNS supports sending SMS messages to phone numbers in over 200 countries." },
  },
  {
    label: "인증 방식",
    values: { "twilio-sms": "API Key + Auth Token", "nhn-cloud-sms": "App Key", "aws-sns-sms": "IAM (Access Key)" },
  },
  {
    label: "호출 제한",
    values: { "twilio-sms": "제한 없음 (동시 100건)", "nhn-cloud-sms": "초당 50건", "aws-sns-sms": "초당 10건 (소프트 리밋)" },
  },
];
