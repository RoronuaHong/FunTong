import type { Metadata } from "next";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";
import MainLayout from "@/components/MainLayout";
import BackgroundSlider from "@/components/BackgroundSlider";
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
          <ConfigProvider
            locale={zhCN}
            theme={{
              token: {
                colorPrimary: "#000",
                colorLink: "#000",
                colorSuccess: "#52c41a",
                colorWarning: "#faad14",
                colorError: "#ff4d4f",
                borderRadius: 6,
                colorBgContainer: "#fff",
                colorText: "rgba(0, 0, 0, 0.88)",
                colorTextSecondary: "rgba(0, 0, 0, 0.65)",
                colorBorder: "rgba(0, 0, 0, 0.06)",
              },
            }}
          >
            <MainLayout>{children}</MainLayout>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
