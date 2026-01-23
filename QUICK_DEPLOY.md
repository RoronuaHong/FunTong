# 快速部署指南

5 分钟内完成 FunTong 的 GitHub 和 Docker 部署。

## 部署流程图

```
代码推送 → GitHub Actions → Docker Hub → 服务器部署
```

## 步骤 1: 配置 GitHub Secrets

1. 打开仓库设置页面：
   ```
   https://github.com/RoronuaHong/FunTong/settings/secrets/actions
   ```

2. 点击 **New repository secret**

3. 添加以下密钥：
   - **Name**: `DOCKER_PASSWORD`
   - **Value**: 你的 Docker Hub 密码或访问令牌

详细说明请查看 [.github/SETUP.md](./.github/SETUP.md)

## 步骤 2: 推送代码到 GitHub

### 方式 1: 使用部署脚本（推荐）

```bash
# 运行部署脚本
./deploy.sh
```

脚本会自动：
- 检查未提交的更改
- 提交并推送代码
- 可选：创建版本标签
- 触发 GitHub Actions 构建

### 方式 2: 手动推送

```bash
# 提交更改
git add .
git commit -m "Add deployment configuration"

# 推送到 GitHub
git push origin main

# (可选) 创建版本标签
git tag v1.0.0
git push origin v1.0.0
```

## 步骤 3: 监控构建

1. 打开 Actions 页面：
   ```
   https://github.com/RoronuaHong/FunTong/actions
   ```

2. 查看 "Build and Push Docker Images" 工作流

3. 等待构建完成（通常需要 5-10 分钟）

构建成功后，Docker 镜像会自动推送到：
- `18606977713/funtong-backend:latest`
- `18606977713/funtong-frontend:latest`

## 步骤 4: 在服务器上部署

### 4.1 首次部署

```bash
# SSH 登录到服务器
ssh user@your-server

# 克隆仓库
git clone https://github.com/RoronuaHong/FunTong.git
cd FunTong

# 拉取镜像
docker-compose pull

# 启动服务
docker-compose up -d

# 查看状态
docker-compose ps
```

### 4.2 更新部署

```bash
# 进入项目目录
cd FunTong

# 拉取最新代码（如果 docker-compose.yml 有更新）
git pull

# 拉取最新镜像
docker-compose pull

# 重启服务
docker-compose up -d

# 查看日志
docker-compose logs -f
```

## 验证部署

访问以下地址验证部署：

- **前端**: http://your-server:3000
- **后端 API**: http://your-server:8000/api
- **健康检查**:
  ```bash
  curl http://your-server:8000/api/
  curl http://your-server:3000
  ```

## 常用命令

### 查看服务状态
```bash
docker-compose ps
```

### 查看日志
```bash
# 所有服务
docker-compose logs -f

# 特定服务
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mysql
```

### 重启服务
```bash
# 重启所有服务
docker-compose restart

# 重启特定服务
docker-compose restart backend
docker-compose restart frontend
```

### 停止服务
```bash
# 停止服务
docker-compose stop

# 停止并删除容器
docker-compose down

# 停止并删除容器和数据卷
docker-compose down -v
```

### 清理旧镜像
```bash
# 清理未使用的镜像
docker image prune -a -f

# 查看镜像占用空间
docker system df
```

## 环境配置

### 生产环境变量

创建 `.env` 文件（不要提交到 Git）：

```bash
# .env
MYSQL_ROOT_PASSWORD=生产环境密码
MYSQL_DATABASE=funtong
MYSQL_USER=funtong
MYSQL_PASSWORD=生产环境密码

DB_HOST=mysql
DB_PORT=3306
DB_NAME=funtong
DB_USER=root
DB_PASSWORD=生产环境密码

NEXT_PUBLIC_API_BASE_URL=http://你的域名:8000/api
```

然后更新 `docker-compose.yml` 使用环境变量。

## 自动化部署工作流

```
1. 开发人员提交代码
   ↓
2. 运行 ./deploy.sh 推送到 GitHub
   ↓
3. GitHub Actions 自动构建镜像
   ↓
4. 镜像推送到 Docker Hub
   ↓
5. 服务器执行: docker-compose pull && docker-compose up -d
   ↓
6. 部署完成
```

## 回滚到之前版本

如果新版本有问题，可以快速回滚：

```bash
# 使用特定版本标签
docker-compose pull 18606977713/funtong-backend:v1.0.0
docker-compose pull 18606977713/funtong-frontend:v1.0.0

# 或者修改 docker-compose.yml 中的镜像标签
# 将 :latest 改为 :v1.0.0

# 重启服务
docker-compose up -d
```

## 监控和告警

### 基础监控
```bash
# 查看容器资源使用
docker stats

# 查看容器健康状态
docker inspect --format='{{.State.Health.Status}}' funtong-backend
docker inspect --format='{{.State.Health.Status}}' funtong-frontend
```

### 日志轮转

Docker Compose 已配置日志轮转，默认限制：
- 最大大小: 10MB
- 最多文件: 3 个

可以在 `docker-compose.yml` 中调整。

## 故障排查

### 问题 1: 容器无法启动
```bash
# 查看详细日志
docker-compose logs backend
docker-compose logs frontend

# 检查容器状态
docker-compose ps

# 重新构建并启动
docker-compose up -d --force-recreate
```

### 问题 2: 数据库连接失败
```bash
# 检查数据库容器
docker-compose logs mysql

# 进入数据库容器
docker exec -it funtong-mysql mysql -uroot -p

# 测试连接
docker exec funtong-backend python manage.py check --database default
```

### 问题 3: 前端无法访问后端
```bash
# 检查环境变量
docker exec funtong-frontend env | grep NEXT_PUBLIC

# 检查网络
docker network inspect funtong_funtong-network

# 测试后端连接
curl http://localhost:8000/api/
```

## 安全建议

1. **使用强密码**: 生产环境使用复杂密码
2. **限制端口**: 仅暴露必要的端口
3. **使用 HTTPS**: 配置 SSL 证书
4. **定期备份**: 定期备份数据库
5. **更新镜像**: 保持依赖更新

## 性能优化

1. **使用反向代理**: 配置 Nginx 作为反向代理
2. **启用缓存**: 配置 Redis 缓存
3. **数据库优化**: 添加索引，优化查询
4. **CDN 加速**: 静态资源使用 CDN

## 相关文档

- [详细部署指南](./DEPLOYMENT.md)
- [GitHub Actions 配置](./.github/SETUP.md)
- [Docker 指南](./DOCKER_GUIDE.md)
- [项目文档](./README.md)

## 获取帮助

遇到问题？

1. 查看 [DEPLOYMENT.md](./DEPLOYMENT.md) 详细文档
2. 查看 GitHub Actions 构建日志
3. 提交 Issue: https://github.com/RoronuaHong/FunTong/issues

祝你部署顺利！🚀
