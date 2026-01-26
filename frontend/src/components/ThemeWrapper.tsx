"use client";

import React from "react";
import { ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";
import { ThemeProvider, useTheme } from "@/contexts/ThemeContext";
import { getThemeConfig } from "@/config/theme";

interface ThemeWrapperContentProps {
  children: React.ReactNode;
}

// 内部组件，使用主题上下文
const ThemeWrapperContent: React.FC<ThemeWrapperContentProps> = ({ children }) => {
  const { themeMode, actualTheme } = useTheme();
  const themeConfig = getThemeConfig(themeMode, actualTheme);

  return (
    <ConfigProvider locale={zhCN} theme={themeConfig}>
      {children}
    </ConfigProvider>
  );
};

// 外部组件，提供主题上下文
interface ThemeWrapperProps {
  children: React.ReactNode;
}

export const ThemeWrapper: React.FC<ThemeWrapperProps> = ({ children }) => {
  return (
    <ThemeProvider>
      <ThemeWrapperContent>{children}</ThemeWrapperContent>
    </ThemeProvider>
  );
};
