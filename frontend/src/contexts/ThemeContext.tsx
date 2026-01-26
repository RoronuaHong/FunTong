"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { ThemeMode } from "@/config/theme";

interface ThemeContextType {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  actualTheme: "light" | "dark"; // 实际应用的主题（考虑了 auto 模式）
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [themeMode, setThemeModeState] = useState<ThemeMode>("light");
  const [systemTheme, setSystemTheme] = useState<"light" | "dark">("light");

  // 监听系统主题变化
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    
    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setSystemTheme(e.matches ? "dark" : "light");
    };

    // 初始化系统主题
    handleChange(mediaQuery);

    // 监听变化
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  // 从 localStorage 加载主题设置
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as ThemeMode | null;
    if (savedTheme && ["light", "dark", "auto"].includes(savedTheme)) {
      setThemeModeState(savedTheme);
    }
  }, []);

  // 设置主题并保存到 localStorage
  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode);
    localStorage.setItem("theme", mode);
  };

  // 计算实际应用的主题
  const actualTheme: "light" | "dark" =
    themeMode === "auto" ? systemTheme : themeMode;

  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode, actualTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
