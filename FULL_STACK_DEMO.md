# FunTong 全栈 Demo 说明

这是一个完整的前后端结合示例，实现了游戏管理系统的增删改查功能。

## 技术栈

### 后端
- **Django 5.0.7** - Python Web 框架
- **Django REST Framework 3.14** - REST API 框架
- **MySQL** - 数据库
- **django-cors-headers** - CORS 支持

### 前端
- **Next.js 16.1.4** - React 框架
- **React 19.2.3** - UI 库
- **TypeScript 5.9.3** - 类型系统
- **Ant Design 6.2.1** - UI 组件库

## 功能特性

### 后端 API
- ✅ RESTful API 设计
- ✅ 游戏的增删改查（CRUD）
- ✅ 分页功能
- ✅ 搜索功能（按名称或作者）
- ✅ 统计信息接口
- ✅ CORS 跨域支持
- ✅ 数据验证
- ✅ 统一的响应格式

### 前端功能
- ✅ 游戏列表展示（带分页）
- ✅ 搜索功能
- ✅ 新增游戏
- ✅ 编辑游戏
- ✅ 删除游戏（带确认）
- ✅ 统计数据展示
- ✅ 响应式设计

## API 接口说明

### 基础 URL
```
http://localhost:8000/api/
```

### 接口列表

#### 1. 获取游戏列表
```
GET /api/games/
参数：
  - page: 页码（默认 1）
  - page_size: 每页数量（默认 10）
  - search: 搜索关键词（可选）
  - author: 作者筛选（可选）

响应：
{
  "code": 0,
  "message": "success",
  "data": {
    "list": [
      {
        "id": 1,
        "name": "游戏名称",
        "author": "作者",
        "pub_time": "2026-01-22 15:30:00",
        "price": "99.99"
      }
    ],
    "total": 100
  }
}
```

#### 2. 获取游戏详情
```
GET /api/games/{id}/
```

#### 3. 创建游戏
```
POST /api/games/
请求体：
{
  "name": "游戏名称",
  "author": "作者",
  "price": 99.99
}
```

#### 4. 更新游戏
```
PUT /api/games/{id}/
请求体：
{
  "name": "新游戏名称",
  "author": "新作者",
  "price": 89.99
}
```

#### 5. 删除游戏
```
DELETE /api/games/{id}/
```

#### 6. 获取统计信息
```
GET /api/stats/
响应：
{
  "code": 0,
  "message": "success",
  "data": {
    "total_games": 100,
    "total_authors": 20
  }
}
```

## 快速开始

### 1. 启动后端

```bash
# 进入后端目录
cd funtong

# 确保数据库已配置（MySQL）
# 编辑 funtong/settings.py 配置数据库连接

# 运行迁移
python manage.py makemigrations
python manage.py migrate

# 启动服务器
python manage.py runserver 8000
```

后端将在 http://localhost:8000 运行

### 2. 启动前端

```bash
# 进入前端目录
cd frontend

# 安装依赖（如果还没安装）
npm install

# 启动开发服务器
npm run dev
```

前端将在 http://localhost:3000 运行

### 3. 访问应用

打开浏览器访问：
- 首页: http://localhost:3000
- 游戏管理: http://localhost:3000/games

## 项目结构

### 后端结构
```
funtong/
├── funtong/
│   ├── settings.py      # 配置文件（已优化）
│   └── urls.py          # 主路由
├── game/
│   ├── models.py        # 数据模型
│   ├── serializers.py   # 序列化器（新增）
│   ├── views.py         # 视图（已重构）
│   └── urls.py          # 路由（已更新）
└── manage.py
```

### 前端结构
```
frontend/src/
├── app/
│   ├── games/page.tsx   # 游戏管理页面（新增）
│   └── page.tsx         # 首页（已更新）
├── services/
│   └── game.ts          # 游戏 API 服务（新增）
└── lib/
    └── request.ts       # HTTP 请求封装
```

## 核心代码亮点

### 后端

#### 1. ViewSet 实现（game/views.py）
使用 Django REST Framework 的 ViewSet，自动实现 CRUD 操作：
- 自定义响应格式
- 分页支持
- 搜索和过滤
- 数据验证

#### 2. Serializer（game/serializers.py）
- 数据验证
- 字段格式化
- 自定义验证规则

#### 3. CORS 配置（settings.py）
- 允许前端跨域请求
- 支持凭证传递

### 前端

#### 1. 游戏管理页面（app/games/page.tsx）
- 完整的 CRUD 操作
- Ant Design Table 组件
- Modal 表单
- 实时统计

#### 2. API 服务封装（services/game.ts）
- TypeScript 类型定义
- 统一的 API 调用接口

#### 3. 请求封装（lib/request.ts）
- 统一错误处理
- 自动 JSON 解析
- 支持查询参数

## 测试步骤

1. **启动后端和前端**

2. **访问游戏管理页面**
   - http://localhost:3000/games

3. **测试功能**
   - 点击"新增游戏"创建数据
   - 在表格中编辑游戏
   - 使用搜索功能
   - 删除游戏
   - 查看统计信息更新

## 后端优化内容

### 1. 配置优化
- ✅ 添加 REST Framework
- ✅ 配置 CORS
- ✅ 中文国际化
- ✅ 时区设置为上海

### 2. API 优化
- ✅ 使用 ViewSet 简化代码
- ✅ 统一响应格式
- ✅ 添加分页
- ✅ 添加搜索和过滤
- ✅ 数据验证

### 3. 代码结构
- ✅ 分离 Serializer
- ✅ RESTful 路由设计
- ✅ 清晰的视图层

## 扩展建议

1. **认证授权**
   - 添加用户登录
   - JWT Token 认证
   - 权限控制

2. **更多功能**
   - 图片上传
   - 游戏分类/标签
   - 评论系统
   - 收藏功能

3. **性能优化**
   - Redis 缓存
   - 数据库索引
   - 前端状态管理

4. **部署**
   - Docker 容器化
   - Nginx 反向代理
   - CI/CD 流程

---

现在你有一个完整可用的前后端示例，可以在此基础上继续开发！
