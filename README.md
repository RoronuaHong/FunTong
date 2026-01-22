# FunTong - 全栈游戏管理系统

一个完整的前后端分离项目示例，展示了 Django + Next.js 的最佳实践。

## 项目概述

这是一个游戏管理系统的 Demo，包含完整的增删改查功能、搜索、分页、统计等特性。

### 技术栈

**后端**
- Django 5.0.7
- Django REST Framework 3.14
- MySQL
- django-cors-headers

**前端**
- Next.js 16.1.4
- React 19.2.3
- TypeScript 5.9.3
- Ant Design 6.2.1
- Tailwind CSS 4.1.18

## 快速开始

### 方式一：使用启动脚本（推荐）

```bash
# 一键启动前后端
./start.sh

# 停止所有服务
./stop.sh
```

### 方式二：手动启动

#### 1. 启动后端

```bash
cd funtong

# 首次运行需要迁移数据库
python manage.py makemigrations
python manage.py migrate

# （可选）创建测试数据
python create_test_data.py

# 启动服务器
python manage.py runserver 8000
```

#### 2. 启动前端

```bash
cd frontend

# 安装依赖（首次）
npm install

# 启动开发服务器
npm run dev
```

### 访问应用

- **前端首页**: http://localhost:3000
- **游戏管理页面**: http://localhost:3000/games
- **后端 API**: http://localhost:8000/api/
- **Django Admin**: http://localhost:8000/admin/

## 项目结构

```
FunTong/
├── funtong/                    # Django 后端
│   ├── funtong/               # 项目配置
│   │   ├── settings.py        # 设置（已优化）
│   │   └── urls.py            # 主路由
│   ├── game/                  # 游戏应用
│   │   ├── models.py          # 数据模型
│   │   ├── serializers.py     # REST 序列化器
│   │   ├── views.py           # API 视图
│   │   └── urls.py            # 应用路由
│   └── create_test_data.py    # 测试数据脚本
│
├── frontend/                   # Next.js 前端
│   ├── src/
│   │   ├── app/
│   │   │   ├── games/         # 游戏管理页面
│   │   │   ├── page.tsx       # 首页
│   │   │   └── layout.tsx     # 根布局
│   │   ├── components/        # 可复用组件
│   │   ├── services/          # API 服务
│   │   │   └── game.ts        # 游戏 API
│   │   ├── lib/               # 工具函数
│   │   │   └── request.ts     # HTTP 请求封装
│   │   └── types/             # TypeScript 类型
│   └── package.json
│
├── start.sh                    # 一键启动脚本
├── stop.sh                     # 停止脚本
├── README.md                   # 本文件
└── FULL_STACK_DEMO.md         # 详细技术文档
```

## 功能特性

### 后端功能

- ✅ RESTful API 设计
- ✅ CRUD 完整实现
- ✅ 分页支持
- ✅ 搜索功能（游戏名称、作者）
- ✅ 数据验证
- ✅ CORS 跨域支持
- ✅ 统一响应格式
- ✅ API 文档化

### 前端功能

- ✅ 游戏列表展示
- ✅ 分页和搜索
- ✅ 新增游戏（Modal 表单）
- ✅ 编辑游戏
- ✅ 删除游戏（带确认）
- ✅ 统计信息展示
- ✅ 响应式设计
- ✅ 完整的 TypeScript 类型

## API 接口

### 游戏管理

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | /api/games/ | 获取游戏列表 |
| POST | /api/games/ | 创建游戏 |
| GET | /api/games/{id}/ | 获取游戏详情 |
| PUT | /api/games/{id}/ | 更新游戏 |
| DELETE | /api/games/{id}/ | 删除游戏 |
| GET | /api/stats/ | 获取统计信息 |

详细 API 文档请查看 [FULL_STACK_DEMO.md](./FULL_STACK_DEMO.md)

## 开发指南

### 后端开发

```bash
cd funtong

# 创建新应用
python manage.py startapp myapp

# 创建迁移
python manage.py makemigrations

# 应用迁移
python manage.py migrate

# 创建超级用户
python manage.py createsuperuser
```

### 前端开发

```bash
cd frontend

# 代码检查
npm run lint

# 类型检查
npm run type-check

# 构建生产版本
npm run build
```

## 配置说明

### 后端配置

编辑 `funtong/funtong/settings.py`:

```python
# 数据库配置
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.mysql",
        "NAME": "funtong",
        "USER": "root",
        "PASSWORD": "your_password",
        "HOST": "127.0.0.1",
        "PORT": "3306",
    }
}

# CORS 配置
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
]
```

### 前端配置

编辑 `frontend/.env.local`:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
```

## 测试数据

运行以下命令创建测试数据：

```bash
cd funtong
python create_test_data.py
```

将创建 15 个示例游戏和 5 个标签。

## 常见问题

### 1. 后端启动失败

检查：
- MySQL 是否运行
- 数据库配置是否正确
- 依赖是否安装：`pip install djangorestframework django-cors-headers`

### 2. 前端连接后端失败

检查：
- 后端是否在 8000 端口运行
- CORS 配置是否正确
- `.env.local` 中的 API 地址是否正确

### 3. 跨域错误

确保后端 `settings.py` 中：
- `corsheaders` 在 `INSTALLED_APPS` 中
- `CorsMiddleware` 在 `MIDDLEWARE` 中
- `CORS_ALLOWED_ORIGINS` 包含前端地址

## 下一步开发

1. **认证系统**
   - 用户注册/登录
   - JWT Token 认证
   - 权限管理

2. **更多功能**
   - 图片上传
   - 游戏评分
   - 评论系统
   - 收藏功能

3. **性能优化**
   - Redis 缓存
   - 数据库索引优化
   - CDN 加速

4. **部署**
   - Docker 容器化
   - Nginx 配置
   - CI/CD 流程

## 文档

- [详细技术文档](./FULL_STACK_DEMO.md)
- [前端 README](./frontend/README.md)
- [快速启动指南](./frontend/QUICK_START.md)

## License

MIT

## 联系方式

如有问题，请提 Issue。

---

**祝你开发愉快！🚀**
