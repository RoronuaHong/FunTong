#!/bin/bash

echo "======================================"
echo "FunTong 全栈应用启动脚本"
echo "======================================"
echo ""

# 获取脚本所在目录
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# 启动后端
echo "启动 Django 后端..."
cd "$SCRIPT_DIR/funtong"

# 检查是否需要迁移
if [ ! -f "db.sqlite3" ] && [ ! -d "game/migrations" ]; then
    echo "检测到首次运行，执行数据库迁移..."
    python manage.py makemigrations
    python manage.py migrate
fi

# 后台启动 Django
python manage.py runserver 8000 &
DJANGO_PID=$!
echo "Django 后端已启动 (PID: $DJANGO_PID) - http://localhost:8000"
echo ""

# 等待后端启动
sleep 3

# 启动前端
echo "启动 Next.js 前端..."
cd "$SCRIPT_DIR/frontend"

# 检查是否需要安装依赖
if [ ! -d "node_modules" ]; then
    echo "检测到未安装依赖，正在安装..."
    npm install
fi

# 后台启动 Next.js
npm run dev &
NEXTJS_PID=$!
echo "Next.js 前端已启动 (PID: $NEXTJS_PID) - http://localhost:3000"
echo ""

echo "======================================"
echo "启动完成！"
echo "======================================"
echo "前端地址: http://localhost:3000"
echo "后端地址: http://localhost:8000"
echo "API 接口: http://localhost:8000/api/"
echo "游戏管理: http://localhost:3000/games"
echo ""
echo "按 Ctrl+C 停止所有服务"
echo ""

# 保存 PID 到文件
echo "$DJANGO_PID" > "$SCRIPT_DIR/.django.pid"
echo "$NEXTJS_PID" > "$SCRIPT_DIR/.nextjs.pid"

# 捕获 Ctrl+C 信号
trap "echo ''; echo '正在停止服务...'; kill $DJANGO_PID $NEXTJS_PID 2>/dev/null; rm -f '$SCRIPT_DIR/.django.pid' '$SCRIPT_DIR/.nextjs.pid'; echo '服务已停止'; exit 0" INT TERM

# 等待进程结束
wait
