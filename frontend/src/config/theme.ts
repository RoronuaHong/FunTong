import { ThemeConfig } from "antd";

export type ThemeMode = "light" | "dark" | "auto";

// 浅色主题配置
export const lightTheme: ThemeConfig = {
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
};

// 深色主题配置
export const darkTheme: ThemeConfig = {
  token: {
    colorPrimary: "#fff",
    colorLink: "#fff",
    colorSuccess: "#52c41a",
    colorWarning: "#faad14",
    colorError: "#ff4d4f",
    borderRadius: 6,
    colorBgContainer: "#141414",
    colorText: "rgba(255, 255, 255, 0.85)",
    colorTextSecondary: "rgba(255, 255, 255, 0.65)",
    colorBorder: "rgba(255, 255, 255, 0.12)",
  },
  algorithm: undefined, // 使用自定义 token 而不是算法
};

// 获取实际应用的主题配置
export const getThemeConfig = (mode: ThemeMode, systemTheme: "light" | "dark"): ThemeConfig => {
  if (mode === "auto") {
    return systemTheme === "dark" ? darkTheme : lightTheme;
  }
  return mode === "dark" ? darkTheme : lightTheme;
};
