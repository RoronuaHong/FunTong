"use client";

import { Layout, Menu, Space, Button } from "antd";
import {
  HomeOutlined,
  UserOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import Link from "next/link";

const { Header: AntHeader } = Layout;

export default function Header() {
  return (
    <AntHeader style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      background: "#001529",
      padding: "0 24px"
    }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ color: "#fff", fontSize: 20, fontWeight: "bold", marginRight: 48 }}>
          FunTong
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["home"]}
          items={[
            {
              key: "home",
              icon: <HomeOutlined />,
              label: <Link href="/">首页</Link>,
            },
            {
              key: "about",
              icon: <UserOutlined />,
              label: <Link href="/about">关于</Link>,
            },
            {
              key: "settings",
              icon: <SettingOutlined />,
              label: <Link href="/settings">设置</Link>,
            },
          ]}
          style={{ flex: 1, minWidth: 0 }}
        />
      </div>
      <Space>
        <Button type="primary">登录</Button>
      </Space>
    </AntHeader>
  );
}
