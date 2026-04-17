import type { Metadata } from "next";
import { Space_Mono, VT323 } from "next/font/google";
import "./globals.css";

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  variable: "--font-space-mono",
  subsets: ["latin"],
});

const vt323 = VT323({
  weight: "400",
  variable: "--font-vt323",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "추호승 — Audiovisual Artist",
  description: "사운드와 비주얼을 결합하는 오디오비주얼 아티스트 추호승의 포트폴리오.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${spaceMono.variable} ${vt323.variable} h-full`}>
      <body className="min-h-full bg-[#0a0a0a] text-white overflow-x-hidden font-mono">
        {children}
      </body>
    </html>
  );
}
