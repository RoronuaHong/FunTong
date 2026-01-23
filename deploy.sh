#!/bin/bash

# FunTong 部署脚本
# 用于快速推送代码到 GitHub 并触发自动构建

set -e

echo "================================"
echo "FunTong 部署脚本"
echo "================================"
echo ""

# 检查是否有未提交的更改
if [[ -n $(git status -s) ]]; then
    echo "检测到未提交的更改："
    git status -s
    echo ""
    read -p "是否提交这些更改？(y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        read -p "请输入提交信息: " commit_msg
        git add .
        git commit -m "$commit_msg"
        echo "✓ 更改已提交"
    else
        echo "✗ 取消部署"
        exit 1
    fi
else
    echo "✓ 没有未提交的更改"
fi

echo ""
echo "当前分支: $(git branch --show-current)"
echo ""

# 推送到 GitHub
read -p "是否推送到 GitHub？(y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "正在推送到 GitHub..."
    git push origin $(git branch --show-current)
    echo "✓ 推送成功"
    echo ""
    echo "GitHub Actions 将自动构建并推送 Docker 镜像"
    echo "查看构建状态: https://github.com/RoronuaHong/FunTong/actions"
else
    echo "✗ 取消推送"
    exit 0
fi

echo ""
read -p "是否创建版本标签？(y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    read -p "请输入版本号 (例如: 1.0.0): " version
    if [[ -z "$version" ]]; then
        echo "✗ 版本号不能为空"
        exit 1
    fi

    git tag "v$version"
    git push origin "v$version"
    echo "✓ 版本标签 v$version 已创建并推送"
    echo ""
    echo "GitHub Actions 将构建带有版本标签的镜像:"
    echo "  - 18606977713/funtong-backend:v$version"
    echo "  - 18606977713/funtong-frontend:v$version"
fi

echo ""
echo "================================"
echo "部署完成！"
echo "================================"
echo ""
echo "后续步骤："
echo "1. 等待 GitHub Actions 构建完成"
echo "2. 在服务器上运行: docker-compose pull && docker-compose up -d"
echo ""
