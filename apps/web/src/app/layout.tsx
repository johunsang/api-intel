import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GNB } from "@/components/layout/gnb";
import { Footer } from "@/components/layout/footer";
import { ToastProvider } from "@/components/ui/toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "API Intelligence Engine",
  description: "공식 문서 기반 근거와 함께 최적의 API를 추천합니다",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GNB />
        <main className="min-h-[calc(100vh-128px)]">{children}</main>
        <Footer />
        <ToastProvider />
      </body>
    </html>
  );
}
