import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lilac Lab",
  description: "个人主页、项目、博客与 Galgame Library。"
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
