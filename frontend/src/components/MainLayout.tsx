"use client";

import React, { useState } from "react";
import { Layout, Menu, Avatar, Dropdown, Button, theme } from "antd";
import {
  HomeOutlined,
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import type { MenuProps } from "antd";

const { Header, Sider, Content } = Layout;

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // 菜单项配置
  const menuItems: MenuProps["items"] = [
    {
      key: "/",
      icon: <HomeOutlined />,
      label: "首页",
      onClick: () => router.push("/"),
    },
    {
      key: "/games",
      icon: <AppstoreOutlined />,
      label: "游戏管理",
      onClick: () => router.push("/games"),
    },
    {
      key: "/about",
      icon: <InfoCircleOutlined />,
      label: "关于",
      onClick: () => router.push("/about"),
    },
    {
      key: "/settings",
      icon: <SettingOutlined />,
      label: "设置",
      onClick: () => router.push("/settings"),
    },
  ];

  // 用户下拉菜单
  const userMenuItems: MenuProps["items"] = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "个人资料",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "退出登录",
      danger: true,
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        {/* Logo 区域 */}
        <div
          style={{
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: collapsed ? "16px 0" : "16px",
            transition: "all 0.2s",
          }}
        >
          <Image
            src="/logo.png"
            alt="FunTong Logo"
            width={collapsed ? 32 : 40}
            height={collapsed ? 32 : 40}
            style={{ objectFit: "contain" }}
          />
          {!collapsed && (
            <span
              style={{
                color: "#fff",
                fontSize: 20,
                fontWeight: 600,
                marginLeft: 12,
              }}
            >
              FunTong
            </span>
          )}
        </div>

        {/* 导航菜单 */}
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[pathname]}
          items={menuItems}
          style={{ borderRight: 0 }}
        />
      </Sider>

      <Layout style={{ marginLeft: collapsed ? 80 : 200, transition: "all 0.2s" }}>
        {/* 顶部导航栏 */}
        <Header
          style={{
            padding: "0 24px",
            background: colorBgContainer,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 1px 4px rgba(0,21,41,.08)",
            position: "sticky",
            top: 0,
            zIndex: 1,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />

          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <Avatar
                style={{
                  backgroundColor: "#1890ff",
                  cursor: "pointer",
                }}
                icon={<UserOutlined />}
              />
            </Dropdown>
          </div>
        </Header>

        {/* 主内容区域 */}
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
