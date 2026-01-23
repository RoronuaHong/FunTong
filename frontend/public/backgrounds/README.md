# 背景图片文件夹

## 使用说明

请将以下图片文件放在此目录中：

- **am.jpg** - 背景图片 1
- **dr.jpg** - 背景图片 2
- **pom.jpg** - 背景图片 3
- **wr.jpg** - 背景图片 4

## 图片要求

- **格式**: JPG/JPEG
- **推荐尺寸**: 1920x1080 或更高
- **文件大小**: 建议每张图片不超过 500KB（优化后）
- **比例**: 16:9 横向图片效果最佳

## 快速放置图片

将你的图片文件直接拷贝到此目录：

```bash
cp /path/to/your/am.jpg ./am.jpg
cp /path/to/your/dr.jpg ./dr.jpg
cp /path/to/your/pom.jpg ./pom.jpg
cp /path/to/your/wr.jpg ./wr.jpg
```

或使用图形界面：
1. 打开此文件夹
2. 将图片文件拖放到此处
3. 确保文件名正确

## 效果说明

- 背景图片会自动轮播，每 8 秒切换一次
- 切换时有平滑的淡入淡出效果
- 图片会缓慢放大，营造动态效果
- 半透明遮罩层确保内容清晰可读

## 图片优化建议

如果图片文件过大，建议使用以下工具优化：

### 在线工具
- [TinyPNG](https://tinypng.com/) - 无损压缩
- [Squoosh](https://squoosh.app/) - Google 的图片优化工具

### 命令行工具
```bash
# 使用 ImageMagick 调整大小和压缩
convert input.jpg -resize 1920x1080 -quality 85 output.jpg

# 批量处理
for img in *.jpg; do
  convert "$img" -resize 1920x1080 -quality 85 "optimized_$img"
done
```

## 自定义配置

如果需要修改轮播设置，编辑文件：
`frontend/src/components/BackgroundSlider.tsx`

可调整参数：
- 切换间隔时间
- 动画效果
- 图片数量
- 遮罩透明度
