# FunTong Docker 部署指南

本文档介绍如何使用 Docker 和 Docker Compose 部署 FunTong 项目。

## 目录
- [前置要求](#前置要求)
- [项目结构](#项目结构)
- [快速开始](#快速开始)
- [详细说明](#详细说明)
- [常用命令](#常用命令)
- [故障排查](#故障排查)
- [生产环境建议](#生产环境建议)

## 前置要求

安装以下软件：
- Docker (>= 20.10)
- Docker Compose (>= 2.0)

检查安装：
```bash
docker --version
docker-compose --version
```

## 项目结构

```
FunTong/
├── docker-compose.yml           # Docker Compose 配置文件
├── .dockerignore               # Docker 忽略文件
├── funtong/                    # 后端目录
│   ├── Dockerfile              # 后端 Dockerfile
│   └── .dockerignore          # 后端忽略文件
└── frontend/                   # 前端目录
    ├── Dockerfile              # 前端 Dockerfile
    └── .dockerignore          # 前端忽略文件
```

## 快速开始

### 1. 构建并启动所有服务

```bash
# 在项目根目录执行
docker-compose up -d
```

这将会：
- 构建后端（Django）和前端（Next.js）镜像
- 启动两个容器
- 自动执行数据库迁移
- 后台运行所有服务

### 2. 查看服务状态

```bash
docker-compose ps
```

### 3. 查看日志

```bash
# 查看所有服务日志
docker-compose logs -f

# 只查看后端日志
docker-compose logs -f backend

# 只查看前端日志
docker-compose logs -f frontend
```

### 4. 访问应用

- 前端首页: http://localhost:3000
- 游戏管理: http://localhost:3000/games
- 后端 API: http://localhost:8000/api/
- Django Admin: http://localhost:8000/admin/

### 5. 停止服务

```bash
# 停止服务但保留容器
docker-compose stop

# 停止并删除容器
docker-compose down

# 停止并删除容器、网络、卷
docker-compose down -v
```

## 详细说明

### 后端 Dockerfile (Django)

```dockerfile
FROM python:3.12-slim
WORKDIR /app

# 安装系统依赖
RUN apt-get update && apt-get install -y \
    gcc default-libmysqlclient-dev pkg-config \
    libxml2-dev libxslt1-dev zlib1g-dev \
    libffi-dev libssl-dev

# 安装 Python 依赖
COPY ../requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 复制项目文件
COPY . .

# 收集静态文件
RUN python manage.py collectstatic --noinput || true

EXPOSE 8000
CMD ["sh", "-c", "python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]
```

**特点：**
- 基于 Python 3.12-slim 镜像
- 安装了 Scrapy 和 Django 所需的系统依赖
- 自动执行数据库迁移
- 包含健康检查

### 前端 Dockerfile (Next.js)

采用多阶段构建优化镜像大小：

```dockerfile
# 阶段 1: 安装依赖
FROM node:20-alpine AS deps
...

# 阶段 2: 构建应用
FROM node:20-alpine AS builder
...

# 阶段 3: 生产运行
FROM node:20-alpine AS runner
...
```

**特点：**
- 三阶段构建，最终镜像更小
- 使用 standalone 输出模式
- 以非 root 用户运行
- 包含健康检查

### Docker Compose 配置

```yaml
services:
  backend:
    build: ./funtong
    ports: ["8000:8000"]
    volumes:
      - ./funtong/db.sqlite3:/app/db.sqlite3

  frontend:
    build: ./frontend
    ports: ["3000:3000"]
    depends_on:
      backend:
        condition: service_healthy
```

**特点：**
- 自动网络配置
- 服务依赖管理
- 健康检查机制
- 数据持久化

## 常用命令

### 构建相关

```bash
# 重新构建所有镜像
docker-compose build

# 不使用缓存重新构建
docker-compose build --no-cache

# 只构建特定服务
docker-compose build backend
docker-compose build frontend
```

### 运行相关

```bash
# 启动服务（前台运行）
docker-compose up

# 启动服务（后台运行）
docker-compose up -d

# 重启服务
docker-compose restart

# 重启特定服务
docker-compose restart backend
```

### 查看相关

```bash
# 查看运行中的容器
docker-compose ps

# 查看日志（实时）
docker-compose logs -f

# 查看最近 100 行日志
docker-compose logs --tail=100

# 查看服务状态
docker-compose top
```

### 进入容器

```bash
# 进入后端容器
docker-compose exec backend bash

# 进入前端容器
docker-compose exec frontend sh

# 在后端容器中执行 Django 命令
docker-compose exec backend python manage.py shell
docker-compose exec backend python manage.py createsuperuser
```

### 清理相关

```bash
# 停止并删除容器
docker-compose down

# 删除容器和网络
docker-compose down

# 删除容器、网络和卷
docker-compose down -v

# 清理未使用的镜像
docker image prune -a
```

## 故障排查

### 1. 容器启动失败

查看日志：
```bash
docker-compose logs backend
docker-compose logs frontend
```

常见问题：
- 端口被占用：修改 `docker-compose.yml` 中的端口映射
- 依赖安装失败：检查网络连接，尝试 `docker-compose build --no-cache`

### 2. 前端无法连接后端

检查：
1. 后端是否正常运行：`curl http://localhost:8000/api/`
2. 前端环境变量是否正确
3. CORS 配置是否正确

修复：
```bash
# 重启服务
docker-compose restart

# 查看网络
docker network ls
docker network inspect funtong_funtong-network
```

### 3. 数据库问题

```bash
# 进入后端容器
docker-compose exec backend bash

# 重新迁移
python manage.py migrate

# 创建测试数据
python create_test_data.py
```

### 4. 前端构建失败

```bash
# 清理并重新构建
docker-compose down
docker-compose build --no-cache frontend
docker-compose up -d
```

### 5. 端口冲突

如果端口被占用，修改 `docker-compose.yml`：

```yaml
services:
  backend:
    ports:
      - "8001:8000"  # 改为其他端口
  frontend:
    ports:
      - "3001:3000"  # 改为其他端口
```

## 生产环境建议

### 1. 使用环境变量

创建 `.env` 文件：

```env
# Django
DJANGO_SECRET_KEY=your-secret-key-here
DJANGO_DEBUG=False
DJANGO_ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com

# Database
DB_ENGINE=django.db.backends.mysql
DB_NAME=funtong
DB_USER=funtong_user
DB_PASSWORD=your-password
DB_HOST=db
DB_PORT=3306

# Next.js
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

### 2. 使用外部数据库

在 `docker-compose.yml` 中添加 MySQL：

```yaml
services:
  db:
    image: mysql:8.0
    environment:
      MYSQL_DATABASE: funtong
      MYSQL_USER: funtong_user
      MYSQL_PASSWORD: ${DB_PASSWORD}
      MYSQL_ROOT_PASSWORD: ${DB_ROOT_PASSWORD}
    volumes:
      - mysql_data:/var/lib/mysql

  backend:
    depends_on:
      - db
    environment:
      - DB_HOST=db

volumes:
  mysql_data:
```

### 3. 添加 Nginx 反向代理

```yaml
services:
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - backend
      - frontend
```

### 4. 启用 HTTPS

使用 Let's Encrypt 获取免费 SSL 证书：

```yaml
services:
  certbot:
    image: certbot/certbot
    volumes:
      - ./certbot/conf:/etc/letsencrypt
      - ./certbot/www:/var/www/certbot
```

### 5. 健康检查和自动重启

已在 `docker-compose.yml` 中配置：

```yaml
services:
  backend:
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8000"]
      interval: 30s
      timeout: 10s
      retries: 3
```

### 6. 日志管理

配置日志驱动：

```yaml
services:
  backend:
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
```

### 7. 资源限制

```yaml
services:
  backend:
    deploy:
      resources:
        limits:
          cpus: '1'
          memory: 1G
        reservations:
          cpus: '0.5'
          memory: 512M
```

## 性能优化

### 1. 构建缓存

```bash
# 使用 BuildKit
DOCKER_BUILDKIT=1 docker-compose build
```

### 2. 多阶段构建

前端 Dockerfile 已使用多阶段构建，可减少镜像大小 50% 以上。

### 3. 镜像优化

- 使用 alpine 基础镜像
- 清理不必要的文件
- 合并 RUN 命令

### 4. 网络优化

```yaml
networks:
  funtong-network:
    driver: bridge
    ipam:
      config:
        - subnet: 172.25.0.0/16
```

## 监控和维护

### 1. 查看资源使用

```bash
# 查看容器资源使用
docker stats

# 查看镜像大小
docker images

# 查看磁盘使用
docker system df
```

### 2. 备份数据

```bash
# 备份数据库
docker-compose exec backend python manage.py dumpdata > backup.json

# 备份卷
docker run --rm -v funtong_mysql_data:/data -v $(pwd):/backup \
  alpine tar czf /backup/mysql_backup.tar.gz /data
```

### 3. 更新服务

```bash
# 拉取最新代码
git pull

# 重新构建并启动
docker-compose up -d --build
```

## 总结

使用 Docker Compose 部署 FunTong 的优势：

1. **一致性**: 开发、测试、生产环境完全一致
2. **隔离性**: 服务之间相互隔离，互不影响
3. **可移植性**: 一条命令即可在任何地方部署
4. **可扩展性**: 易于添加新服务（如 Redis、Celery）
5. **易维护性**: 统一的管理和监控方式

如有问题，请查看日志或提交 Issue。
