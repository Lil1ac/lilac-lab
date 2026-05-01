import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lilac Lab",
  description: "涓汉涓婚〉銆侀」鐩€佸崥瀹笌 Galgame Library銆?"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
