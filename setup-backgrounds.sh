#!/bin/bash

# 背景图片设置脚本
# 用于快速设置背景图片

set -e

BG_DIR="frontend/public/backgrounds"
IMAGES=("am.jpg" "dr.jpg" "pom.jpg" "wr.jpg")

echo "================================"
echo "FunTong 背景图片设置"
echo "================================"
echo ""

# 检查目录是否存在
if [ ! -d "$BG_DIR" ]; then
    echo "创建背景图片目录..."
    mkdir -p "$BG_DIR"
fi

echo "需要以下 4 张图片："
echo "  1. am.jpg"
echo "  2. dr.jpg"
echo "  3. pom.jpg"
echo "  4. wr.jpg"
echo ""

# 检查已有图片
echo "检查已有图片..."
found=0
for img in "${IMAGES[@]}"; do
    if [ -f "$BG_DIR/$img" ]; then
        size=$(du -h "$BG_DIR/$img" | cut -f1)
        echo "  ✓ $img ($size)"
        ((found++))
    else
        echo "  ✗ $img (未找到)"
    fi
done

echo ""
echo "找到 $found/4 张图片"
echo ""

if [ $found -eq 4 ]; then
    echo "✓ 所有背景图片已就绪！"
    echo ""
    echo "启动开发服务器查看效果："
    echo "  cd frontend && npm run dev"
    exit 0
fi

echo "请选择操作："
echo "  1. 从指定目录复制图片"
echo "  2. 手动放置图片（打开文件夹）"
echo "  3. 查看设置说明"
echo "  4. 退出"
echo ""

read -p "请输入选项 (1-4): " choice

case $choice in
    1)
        read -p "请输入图片所在目录的完整路径: " src_dir
        if [ ! -d "$src_dir" ]; then
            echo "✗ 目录不存在: $src_dir"
            exit 1
        fi

        echo ""
        echo "正在复制图片..."
        copied=0
        for img in "${IMAGES[@]}"; do
            if [ -f "$src_dir/$img" ]; then
                cp "$src_dir/$img" "$BG_DIR/"
                echo "  ✓ 已复制: $img"
                ((copied++))
            else
                echo "  ✗ 未找到: $img"
            fi
        done

        echo ""
        echo "已复制 $copied 张图片"

        if [ $copied -eq 4 ]; then
            echo "✓ 所有图片已复制完成！"
        else
            echo "⚠ 部分图片缺失，请检查源目录"
        fi
        ;;

    2)
        echo ""
        echo "打开背景图片文件夹..."
        open "$BG_DIR" 2>/dev/null || xdg-open "$BG_DIR" 2>/dev/null || echo "请手动打开: $BG_DIR"
        echo ""
        echo "请将以下图片拖放到打开的文件夹中："
        for img in "${IMAGES[@]}"; do
            echo "  - $img"
        done
        echo ""
        echo "完成后重新运行此脚本验证。"
        ;;

    3)
        echo ""
        echo "查看详细设置说明："
        echo ""
        if [ -f "BACKGROUND_SETUP.md" ]; then
            cat BACKGROUND_SETUP.md
        else
            echo "  请查看文件: BACKGROUND_SETUP.md"
            echo "  或访问: frontend/public/backgrounds/README.md"
        fi
        ;;

    4)
        echo "退出"
        exit 0
        ;;

    *)
        echo "✗ 无效选项"
        exit 1
        ;;
esac

echo ""
echo "================================"
echo "完成"
echo "================================"
