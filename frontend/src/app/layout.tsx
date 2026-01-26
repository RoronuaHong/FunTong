import type { Metadata } from "next";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import MainLayout from "@/components/MainLayout";
import BackgroundSlider from "@/components/BackgroundSlider";
import { ThemeWrapper } from "@/components/ThemeWrapper";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fun统管理中心",
  description: "Fun统游戏管理中心",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>
        <BackgroundSlider />
        <AntdRegistry>
          <ThemeWrapper>
            <MainLayout>{children}</MainLayout>
          </ThemeWrapper>
        </AntdRegistry>
      </body>
    </html>
  );
}
