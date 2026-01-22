"use client";

import { Button, Card, Space, Typography, Row, Col, Divider } from "antd";
import {
  RocketOutlined,
  ThunderboltOutlined,
  SafetyOutlined,
} from "@ant-design/icons";

const { Title, Paragraph } = Typography;

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", padding: "48px 24px", background: "#f5f5f5" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <Title level={1}>欢迎使用 FunTong</Title>
          <Paragraph style={{ fontSize: 18, color: "#666" }}>
            基于 Next.js 15 + TypeScript + Ant Design 5 构建的现代化应用
          </Paragraph>
        </div>

        <Row gutter={[24, 24]}>
          <Col xs={24} md={8}>
            <Card hoverable>
              <div style={{ textAlign: "center" }}>
                <RocketOutlined style={{ fontSize: 48, color: "#1890ff" }} />
                <Title level={3}>快速开发</Title>
                <Paragraph>
                  使用 Next.js 15 的最新特性，实现快速高效的开发体验
                </Paragraph>
              </div>
            </Card>
          </Col>

          <Col xs={24} md={8}>
            <Card hoverable>
              <div style={{ textAlign: "center" }}>
                <ThunderboltOutlined style={{ fontSize: 48, color: "#52c41a" }} />
                <Title level={3}>性能优化</Title>
                <Paragraph>
                  充分利用 React 18 和 Next.js 的性能优化能力
                </Paragraph>
              </div>
            </Card>
          </Col>

          <Col xs={24} md={8}>
            <Card hoverable>
              <div style={{ textAlign: "center" }}>
                <SafetyOutlined style={{ fontSize: 48, color: "#fa8c16" }} />
                <Title level={3}>类型安全</Title>
                <Paragraph>
                  TypeScript 提供完整的类型检查和智能提示
                </Paragraph>
              </div>
            </Card>
          </Col>
        </Row>

        <Divider />

        <Card>
          <Title level={3}>技术栈</Title>
          <Space direction="vertical" size="middle" style={{ width: "100%" }}>
            <div>
              <strong>Next.js 15:</strong> React 全栈框架，支持 SSR、SSG、ISR
            </div>
            <div>
              <strong>React 19:</strong> 最新版本的 React
            </div>
            <div>
              <strong>TypeScript:</strong> 提供类型安全和更好的开发体验
            </div>
            <div>
              <strong>Ant Design 5:</strong> 企业级 UI 设计语言和 React 组件库
            </div>
            <div>
              <strong>Tailwind CSS:</strong> 实用优先的 CSS 框架
            </div>
          </Space>

          <Divider />

          <div style={{ textAlign: "center" }}>
            <Space size="large">
              <Button type="primary" size="large" icon={<RocketOutlined />}>
                开始使用
              </Button>
              <Button size="large">查看文档</Button>
            </Space>
          </div>
        </Card>
      </div>
    </div>
  );
}
