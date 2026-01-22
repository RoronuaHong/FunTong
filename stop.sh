#!/bin/bash

echo "停止 FunTong 应用..."

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# 读取并停止 Django
if [ -f "$SCRIPT_DIR/.django.pid" ]; then
    DJANGO_PID=$(cat "$SCRIPT_DIR/.django.pid")
    kill $DJANGO_PID 2>/dev/null
    echo "Django 后端已停止 (PID: $DJANGO_PID)"
    rm -f "$SCRIPT_DIR/.django.pid"
fi

# 读取并停止 Next.js
if [ -f "$SCRIPT_DIR/.nextjs.pid" ]; then
    NEXTJS_PID=$(cat "$SCRIPT_DIR/.nextjs.pid")
    kill $NEXTJS_PID 2>/dev/null
    echo "Next.js 前端已停止 (PID: $NEXTJS_PID)"
    rm -f "$SCRIPT_DIR/.nextjs.pid"
fi

# 额外清理：停止所有相关进程
pkill -f "python manage.py runserver" 2>/dev/null
pkill -f "next dev" 2>/dev/null

echo "所有服务已停止"
