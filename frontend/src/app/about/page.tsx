"use client";

import { Card, Typography, Space, Timeline } from "antd";
import {
  ClockCircleOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

const { Title, Paragraph } = Typography;

export default function AboutPage() {
  return (
    <div style={{ minHeight: "100vh", padding: "48px 24px", background: "#f5f5f5" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <Card>
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <div>
              <Title level={2}>关于 FunTong</Title>
              <Paragraph>
                FunTong 是一个基于现代 Web 技术栈构建的应用平台，
                致力于提供高效、可靠的解决方案。
              </Paragraph>
            </div>

            <div>
              <Title level={3}>开发路线</Title>
              <Timeline
                items={[
                  {
                    color: "green",
                    dot: <CheckCircleOutlined />,
                    children: (
                      <>
                        <p><strong>v1.0.0 (当前版本)</strong></p>
                        <p>项目初始化，基础架构搭建完成</p>
                      </>
                    ),
                  },
                  {
                    color: "blue",
                    dot: <ClockCircleOutlined />,
                    children: (
                      <>
                        <p><strong>v1.1.0 (计划中)</strong></p>
                        <p>用户系统、权限管理</p>
                      </>
                    ),
                  },
                  {
                    color: "gray",
                    children: (
                      <>
                        <p><strong>v1.2.0 (规划中)</strong></p>
                        <p>更多功能开发中...</p>
                      </>
                    ),
                  },
                ]}
              />
            </div>

            <div>
              <Title level={3}>技术特点</Title>
              <ul>
                <li>采用 Next.js 15 App Router，支持 RSC 和 Streaming</li>
                <li>TypeScript 全栈类型安全</li>
                <li>Ant Design 5 企业级 UI 组件</li>
                <li>支持 SSR、SSG、ISR 多种渲染模式</li>
                <li>优化的构建和部署流程</li>
              </ul>
            </div>
          </Space>
        </Card>
      </div>
    </div>
  );
}
