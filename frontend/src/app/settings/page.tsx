"use client";

import { Card, Form, Input, Button, Switch, Select, Space, message } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import { useTheme } from "@/contexts/ThemeContext";
import { useEffect } from "react";

export default function SettingsPage() {
  const [form] = Form.useForm();
  const { themeMode, setThemeMode } = useTheme();

  // 初始化表单时同步当前主题
  useEffect(() => {
    form.setFieldsValue({
      theme: themeMode,
    });
  }, [themeMode, form]);

  const onFinish = (values: any) => {
    console.log("Settings:", values);
    
    // 保存主题设置
    if (values.theme) {
      setThemeMode(values.theme);
    }
    
    message.success("设置已保存");
  };

  return (
    <div>
      <Card title="系统设置">
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
              username: "user@example.com",
              language: "zh-CN",
              theme: "light",
              notifications: true,
            }}
          >
            <Form.Item
              label="用户名"
              name="username"
              rules={[{ required: true, message: "请输入用户名" }]}
            >
              <Input placeholder="请输入用户名" />
            </Form.Item>

            <Form.Item
              label="邮箱"
              name="email"
              rules={[
                { required: true, message: "请输入邮箱" },
                { type: "email", message: "请输入有效的邮箱地址" },
              ]}
            >
              <Input placeholder="请输入邮箱" />
            </Form.Item>

            <Form.Item label="语言" name="language">
              <Select>
                <Select.Option value="zh-CN">简体中文</Select.Option>
                <Select.Option value="en-US">English</Select.Option>
                <Select.Option value="ja-JP">日本語</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item label="主题" name="theme">
              <Select>
                <Select.Option value="light">浅色</Select.Option>
                <Select.Option value="dark">深色</Select.Option>
                <Select.Option value="auto">跟随系统</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="启用通知"
              name="notifications"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>

            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                  保存设置
                </Button>
                <Button onClick={() => form.resetFields()}>
                  重置
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
    </div>
  );
}
