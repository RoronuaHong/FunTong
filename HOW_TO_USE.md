# 如何使用这个项目

## 🚀 快速开始（推荐方式）

### 第一步：准备数据库

确保 MySQL 已安装并运行，创建数据库：

```sql
CREATE DATABASE funtong CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 第二步：配置数据库连接

编辑 `funtong/funtong/settings.py`，修改数据库配置：

```python
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.mysql",
        "NAME": "funtong",
        "USER": "root",              # 你的 MySQL 用户名
        "PASSWORD": "your_password",  # 你的 MySQL 密码
        "HOST": "127.0.0.1",
        "PORT": "3306",
    }
}
```

### 第三步：运行数据库迁移

```bash
cd funtong
python manage.py makemigrations
python manage.py migrate
```

### 第四步：创建测试数据（可选）

```bash
python create_test_data.py
```

这将创建 15 个示例游戏和 5 个标签。

### 第五步：启动应用

```bash
# 回到项目根目录
cd ..

# 使用一键启动脚本
./start.sh
```

### 第六步：访问应用

打开浏览器访问：
- **首页**: http://localhost:3000
- **游戏管理**: http://localhost:3000/games

---

## 📱 使用游戏管理功能

### 1. 查看游戏列表
访问 http://localhost:3000/games 可以看到：
- 游戏统计信息（游戏总数、作者总数）
- 游戏列表表格

### 2. 搜索游戏
在搜索框中输入游戏名称或作者名称，点击搜索按钮。

### 3. 新增游戏
1. 点击"新增游戏"按钮
2. 填写表单：
   - 游戏名称（必填）
   - 作者（必填）
   - 价格（必填，0-999.99）
3. 点击"确定"提交

### 4. 编辑游戏
1. 在表格中找到要编辑的游戏
2. 点击"编辑"按钮
3. 修改信息
4. 点击"确定"保存

### 5. 删除游戏
1. 在表格中找到要删除的游戏
2. 点击"删除"按钮
3. 确认删除

### 6. 翻页
- 使用表格底部的分页器切换页面
- 可以调整每页显示数量

---

## 🔧 手动启动方式

如果不使用 `start.sh` 脚本，可以手动启动：

### 启动后端

```bash
cd funtong
python manage.py runserver 8000
```

保持这个终端运行，打开新终端继续。

### 启动前端

```bash
cd frontend

# 首次运行需要安装依赖
npm install

# 启动开发服务器
npm run dev
```

---

## 🛑 停止应用

### 使用脚本停止

```bash
./stop.sh
```

### 手动停止

在运行服务器的终端按 `Ctrl + C`

---

## 🔍 测试 API

### 使用 curl 测试

```bash
# 获取游戏列表
curl http://localhost:8000/api/games/

# 获取统计信息
curl http://localhost:8000/api/stats/

# 创建游戏
curl -X POST http://localhost:8000/api/games/ \
  -H "Content-Type: application/json" \
  -d '{"name":"测试游戏","author":"测试作者","price":99.99}'
```

### 使用浏览器访问

直接在浏览器访问：
- http://localhost:8000/api/
- http://localhost:8000/api/games/
- http://localhost:8000/api/stats/

---

## 📝 常见问题

### Q1: 启动后端时报错 "No module named 'rest_framework'"
**解决**: 安装依赖
```bash
pip install djangorestframework django-cors-headers
```

### Q2: 前端无法连接后端
**检查**:
1. 后端是否在 8000 端口运行
2. 前端 `.env.local` 中 API 地址是否正确
3. 浏览器控制台是否有 CORS 错误

### Q3: 数据库连接失败
**检查**:
1. MySQL 是否运行
2. 数据库是否已创建
3. `settings.py` 中的用户名密码是否正确

### Q4: 前端端口被占用
**解决**: 修改端口
```bash
# 在 frontend 目录下
PORT=3001 npm run dev
```

### Q5: 如何清空所有数据
```bash
cd funtong
python manage.py flush
```

---

## 🎯 下一步操作

### 学习代码
1. 查看 `funtong/game/views.py` - 学习 Django REST Framework
2. 查看 `frontend/src/app/games/page.tsx` - 学习 React + Ant Design
3. 查看 `frontend/src/services/game.ts` - 学习 API 封装

### 修改代码
1. 在后端添加新字段
2. 在前端显示新字段
3. 测试功能是否正常

### 扩展功能
参考 `FULL_STACK_DEMO.md` 中的扩展建议：
- 添加用户登录
- 添加图片上传
- 添加评论功能

---

## 📚 文档说明

- `README.md` - 项目主文档
- `FULL_STACK_DEMO.md` - 详细技术文档和 API 说明
- `PROJECT_SUMMARY.md` - 项目完成总结
- `HOW_TO_USE.md` - 本文件，使用指南
- `frontend/README.md` - 前端项目说明
- `frontend/QUICK_START.md` - 前端快速开始

---

## 💡 提示

1. **开发时**: 保持后端和前端同时运行
2. **调试时**: 查看浏览器控制台和终端输出
3. **修改代码**: 前端会热更新，后端需要重启
4. **数据库**: 定期备份重要数据

---

**祝你使用愉快！如有问题，请查看文档或提 Issue。** 🎉
