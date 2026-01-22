# 快速启动指南

## 1. 启动开发服务器

```bash
cd frontend
npm run dev
```

服务器将在 http://localhost:3000 启动

## 2. 查看页面

- 首页: http://localhost:3000
- 关于: http://localhost:3000/about  
- 设置: http://localhost:3000/settings
- API 测试: http://localhost:3000/api/hello

## 3. 开始开发

### 创建新页面
在 `src/app/` 下创建新文件夹和 `page.tsx`：

```tsx
// src/app/newpage/page.tsx
"use client";

import { Card } from "antd";

export default function NewPage() {
  return (
    <div style={{ padding: 24 }}>
      <Card title="新页面">
        页面内容
      </Card>
    </div>
  );
}
```

### 创建新组件
在 `src/components/` 下创建新组件：

```tsx
// src/components/MyComponent.tsx
"use client";

import { Button } from "antd";

export default function MyComponent() {
  return <Button type="primary">我的组件</Button>;
}
```

### API 请求示例

```tsx
import { api } from "@/lib/request";

// GET 请求
const data = await api.get("/users");

// POST 请求
const result = await api.post("/users", { name: "张三" });
```

## 4. 常用命令

```bash
# 开发
npm run dev

# 构建
npm run build

# 生产环境运行
npm start

# 代码检查
npm run lint

# 类型检查
npm run type-check
```

## 5. 目录说明

- `src/app/` - 页面路由
- `src/components/` - 可复用组件
- `src/hooks/` - 自定义 Hooks
- `src/lib/` - 工具函数
- `src/types/` - 类型定义

开始愉快地开发吧！🚀
