# GitHub Actions 配置指南

本文档说明如何配置 GitHub Actions 以自动构建和推送 Docker 镜像。

## 前置条件

1. GitHub 仓库已创建
2. Docker Hub 账号已创建
3. 有推送权限到 GitHub 仓库

## 配置步骤

### 1. 配置 Docker Hub 密码

在 GitHub 仓库中添加 Docker Hub 密码作为 Secret：

1. 进入你的 GitHub 仓库
2. 点击 **Settings** 标签
3. 在左侧菜单中选择 **Secrets and variables** → **Actions**
4. 点击 **New repository secret** 按钮
5. 添加以下 Secret：

   | Name | Value | 说明 |
   |------|-------|------|
   | `DOCKER_PASSWORD` | 你的 Docker Hub 密码或访问令牌 | 用于登录 Docker Hub |

**安全建议**: 建议使用 Docker Hub 的访问令牌（Access Token）而不是密码：

1. 登录 [Docker Hub](https://hub.docker.com/)
2. 点击右上角头像 → **Account Settings**
3. 选择 **Security** 标签
4. 点击 **New Access Token**
5. 输入描述（如 "GitHub Actions"）
6. 选择权限：**Read, Write, Delete**
7. 点击 **Generate**
8. 复制生成的令牌并保存到 GitHub Secrets

### 2. 验证工作流配置

检查 `.github/workflows/docker-build-push.yml` 文件中的配置：

```yaml
env:
  DOCKER_USERNAME: 18606977713  # 确认这是你的 Docker Hub 用户名
  BACKEND_IMAGE: 18606977713/funtong-backend
  FRONTEND_IMAGE: 18606977713/funtong-frontend
```

如果 Docker Hub 用户名不同，请修改为你的用户名。

### 3. 测试工作流

#### 方法 1: 推送代码触发

```bash
# 提交并推送代码
git add .
git commit -m "Setup GitHub Actions"
git push origin main
```

#### 方法 2: 手动触发

1. 进入 GitHub 仓库
2. 点击 **Actions** 标签
3. 在左侧选择 **Build and Push Docker Images** 工作流
4. 点击 **Run workflow** 按钮
5. 选择分支并点击 **Run workflow**

### 4. 查看构建状态

1. 进入 **Actions** 标签
2. 点击最新的工作流运行
3. 查看构建日志和状态

## 工作流触发条件

工作流会在以下情况自动触发：

1. **推送到主分支**
   ```bash
   git push origin main
   ```

2. **创建版本标签**
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```

3. **创建 Pull Request**
   - 仅构建镜像，不推送

4. **手动触发**
   - 在 GitHub Actions 页面手动运行

## 构建产物

成功构建后，Docker 镜像将推送到 Docker Hub：

- **后端镜像**: `docker.io/18606977713/funtong-backend:latest`
- **前端镜像**: `docker.io/18606977713/funtong-frontend:latest`

如果推送版本标签，还会生成版本化的镜像：

- `docker.io/18606977713/funtong-backend:v1.0.0`
- `docker.io/18606977713/funtong-frontend:v1.0.0`

## 常见问题

### 1. 构建失败：Authentication failed

**原因**: Docker Hub 密码配置错误

**解决方法**:
1. 检查 GitHub Secrets 中的 `DOCKER_PASSWORD` 是否正确
2. 如果使用访问令牌，确保令牌有写入权限
3. 重新生成访问令牌并更新 Secret

### 2. 构建失败：No space left on device

**原因**: GitHub Actions runner 磁盘空间不足

**解决方法**:
- 这是 GitHub 的限制，通常会自动恢复
- 可以在工作流中添加清理步骤

### 3. 构建失败：Dockerfile not found

**原因**: Dockerfile 路径配置错误

**解决方法**:
- 检查 `docker-build-push.yml` 中的 `file` 参数
- 确保 Dockerfile 存在于指定路径

### 4. 镜像推送慢

**原因**: 镜像较大或网络慢

**解决方法**:
- 工作流已配置缓存，第二次构建会快很多
- 优化 Dockerfile，减少层数和大小

## 本地测试

在推送到 GitHub 之前，可以本地测试构建：

```bash
# 测试后端构建
docker build -t 18606977713/funtong-backend:test -f funtong/Dockerfile .

# 测试前端构建
docker build -t 18606977713/funtong-frontend:test frontend/

# 测试运行
docker-compose -f docker-compose.yml up -d
```

## 徽章配置

在 README.md 中已添加构建状态徽章：

```markdown
![Build Status](https://github.com/RoronuaHong/FunTong/actions/workflows/docker-build-push.yml/badge.svg)
```

徽章会显示最新的构建状态（通过/失败）。

## 下一步

- [部署到服务器](../DEPLOYMENT.md)
- [Docker 使用指南](../DOCKER_GUIDE.md)
- [项目文档](../README.md)

## 支持

如有问题，请在 GitHub 仓库提交 Issue。
