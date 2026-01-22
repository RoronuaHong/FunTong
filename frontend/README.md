# FunTong Frontend

基于 Next.js 15 + TypeScript + Ant Design 5 构建的现代化前端应用。

## 技术栈

- **Next.js 15** - React 全栈框架
- **React 19** - 用户界面库
- **TypeScript** - 类型安全的 JavaScript
- **Ant Design 5** - 企业级 UI 组件库
- **Tailwind CSS** - 实用优先的 CSS 框架

## 项目结构

```
src/
├── app/                # Next.js App Router 页面
│   ├── api/           # API 路由
│   ├── about/         # 关于页面
│   ├── settings/      # 设置页面
│   ├── layout.tsx     # 根布局
│   ├── page.tsx       # 首页
│   └── globals.css    # 全局样式
├── components/        # 可复用组件
├── hooks/            # 自定义 Hooks
├── lib/              # 工具函数库
└── types/            # TypeScript 类型定义
```

## 开始使用

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看应用。

### 构建生产版本

```bash
npm run build
npm start
```

### 其他命令

```bash
# 代码检查
npm run lint

# 类型检查
npm run type-check

# 清理构建缓存
npm run clean
```

## 环境变量

复制 `.env.example` 为 `.env.local` 并配置相应的环境变量：

```bash
cp .env.example .env.local
```

主要环境变量：

- `NEXT_PUBLIC_API_BASE_URL` - 后端 API 地址
- `NEXT_PUBLIC_APP_NAME` - 应用名称
- `NEXT_PUBLIC_APP_VERSION` - 应用版本

## 功能特性

- ✅ Next.js 15 App Router
- ✅ React Server Components (RSC)
- ✅ TypeScript 严格模式
- ✅ Ant Design 5 组件库
- ✅ 中文国际化支持
- ✅ 响应式布局
- ✅ API 路由示例
- ✅ 统一请求封装
- ✅ 自定义 Hooks
- ✅ 类型定义

## 开发规范

1. 使用 TypeScript 进行类型检查
2. 遵循 ESLint 代码规范
3. 组件使用函数式组件 + Hooks
4. 页面使用 App Router 约定式路由
5. API 请求使用统一的 `api` 工具函数

## 部署

支持部署到 Vercel、Netlify 等平台。推荐使用 Vercel：

```bash
npm run build
```

## License

MIT
