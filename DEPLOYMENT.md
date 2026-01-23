# 部署指南

本文档介绍如何将 FunTong 项目部署到 GitHub 和 Docker。

## 目录

- [GitHub Actions 自动部署](#github-actions-自动部署)
- [Docker 部署](#docker-部署)
- [手动构建和推送](#手动构建和推送)
- [环境变量配置](#环境变量配置)

## GitHub Actions 自动部署

项目已配置 GitHub Actions 工作流，可以自动构建和推送 Docker 镜像到 Docker Hub。

### 前置条件

1. **配置 Docker Hub 密码**

   在 GitHub 仓库中添加 Secret：

   ```
   Settings → Secrets and variables → Actions → New repository secret
   ```

   添加以下 Secret：
   - Name: `DOCKER_PASSWORD`
   - Value: 你的 Docker Hub 密码或访问令牌

2. **验证 Docker Hub 用户名**

   确认 `.github/workflows/docker-build-push.yml` 中的 `DOCKER_USERNAME` 正确：
   ```yaml
   env:
     DOCKER_USERNAME: 18606977713
   ```

### 触发自动构建

工作流会在以下情况自动触发：

- **推送到主分支**: 推送到 `main` 或 `master` 分支
- **创建版本标签**: 创建 `v*` 格式的标签（如 `v1.0.0`）
- **Pull Request**: 创建或更新 PR（仅构建，不推送）
- **手动触发**: 在 Actions 页面手动运行工作流

### 版本标签策略

- `latest`: 主分支的最新构建
- `main` / `master`: 对应分支的最新构建
- `v1.0.0`: 语义化版本标签
- `1.0`: 主版本和次版本号

示例：创建版本标签并推送
```bash
git tag v1.0.0
git push origin v1.0.0
```

## Docker 部署

### 快速开始

1. **克隆仓库**
   ```bash
   git clone https://github.com/RoronuaHong/FunTong.git
   cd FunTong
   ```

2. **拉取最新镜像**
   ```bash
   docker-compose pull
   ```

3. **启动服务**
   ```bash
   docker-compose up -d
   ```

4. **查看服务状态**
   ```bash
   docker-compose ps
   ```

5. **查看日志**
   ```bash
   # 查看所有服务日志
   docker-compose logs -f

   # 查看特定服务日志
   docker-compose logs -f backend
   docker-compose logs -f frontend
   ```

### 访问应用

- **前端**: http://localhost:3000
- **后端 API**: http://localhost:8000
- **数据库**: localhost:3307

### 停止服务

```bash
# 停止服务但保留数据
docker-compose stop

# 停止并删除容器
docker-compose down

# 停止、删除容器并清理数据卷
docker-compose down -v
```

## 手动构建和推送

如果需要手动构建和推送镜像：

### 后端

```bash
# 构建后端镜像
docker build -t 18606977713/funtong-backend:latest -f funtong/Dockerfile .

# 推送到 Docker Hub
docker push 18606977713/funtong-backend:latest
```

### 前端

```bash
# 构建前端镜像
cd frontend
docker build -t 18606977713/funtong-frontend:latest .

# 推送到 Docker Hub
docker push 18606977713/funtong-frontend:latest
```

## 环境变量配置

### 生产环境配置

在生产环境中，建议创建 `.env` 文件来管理环境变量：

```bash
# .env
MYSQL_ROOT_PASSWORD=your_secure_password
MYSQL_DATABASE=funtong
MYSQL_USER=funtong
MYSQL_PASSWORD=your_secure_password

DB_HOST=mysql
DB_PORT=3306
DB_NAME=funtong
DB_USER=root
DB_PASSWORD=your_secure_password

NEXT_PUBLIC_API_BASE_URL=http://your-domain:8000/api
```

然后更新 `docker-compose.yml` 使用 `.env` 文件：

```yaml
services:
  mysql:
    environment:
      - MYSQL_ROOT_PASSWORD=${MYSQL_ROOT_PASSWORD}
      - MYSQL_DATABASE=${MYSQL_DATABASE}
      - MYSQL_USER=${MYSQL_USER}
      - MYSQL_PASSWORD=${MYSQL_PASSWORD}
```

### 安全建议

1. **不要提交敏感信息**: 将 `.env` 添加到 `.gitignore`
2. **使用强密码**: 生产环境使用复杂密码
3. **限制端口暴露**: 仅暴露必要的端口
4. **定期更新镜像**: 保持依赖和基础镜像更新

## 监控和维护

### 健康检查

所有服务都配置了健康检查：

```bash
# 检查容器健康状态
docker inspect --format='{{.State.Health.Status}}' funtong-backend
docker inspect --format='{{.State.Health.Status}}' funtong-frontend
docker inspect --format='{{.State.Health.Status}}' funtong-mysql
```

### 数据备份

备份 MySQL 数据：

```bash
# 备份数据库
docker exec funtong-mysql mysqldump -uroot -pa1234560 funtong > backup.sql

# 恢复数据库
docker exec -i funtong-mysql mysql -uroot -pa1234560 funtong < backup.sql
```

### 更新服务

```bash
# 拉取最新镜像
docker-compose pull

# 重启服务
docker-compose up -d

# 清理旧镜像
docker image prune -f
```

## 故障排查

### 容器无法启动

```bash
# 查看容器日志
docker-compose logs [service_name]

# 查看容器详细信息
docker inspect [container_name]
```

### 数据库连接问题

1. 确认 MySQL 容器已健康运行
2. 检查数据库凭证是否正确
3. 验证网络连接

```bash
# 测试数据库连接
docker exec funtong-backend python manage.py check --database default
```

### 前端无法访问后端

1. 检查 `NEXT_PUBLIC_API_BASE_URL` 环境变量
2. 确认后端服务健康
3. 检查网络配置

## 持续集成/持续部署 (CI/CD)

项目使用 GitHub Actions 实现 CI/CD：

1. **代码推送**: 开发者推送代码到 GitHub
2. **自动构建**: GitHub Actions 自动构建 Docker 镜像
3. **自动推送**: 镜像自动推送到 Docker Hub
4. **手动部署**: 在服务器上拉取最新镜像并重启服务

## 相关文档

- [项目总结](PROJECT_SUMMARY.md)
- [Docker 详细指南](DOCKER_GUIDE.md)
- [使用说明](HOW_TO_USE.md)
- [全栈演示](FULL_STACK_DEMO.md)

## 支持

如有问题，请提交 Issue 到 GitHub 仓库。
