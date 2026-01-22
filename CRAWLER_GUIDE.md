# FunTong 爬虫使用指南

## 项目结构

```
funtong/
├── crawler/                    # Scrapy爬虫模块
│   ├── __init__.py
│   ├── settings.py            # Scrapy配置
│   ├── items.py               # 数据模型定义
│   ├── pipelines.py           # 数据处理Pipeline
│   └── spiders/               # 爬虫文件夹
│       ├── __init__.py
│       └── game_spider.py     # 游戏爬虫
├── game/
│   └── management/
│       └── commands/
│           └── crawl.py       # Django管理命令
└── scrapy.cfg                 # Scrapy项目配置
```

## 安装依赖

```bash
pip install -r requirements.txt
```

## 使用方法

### 1. 运行默认Steam游戏爬虫

```bash
cd funtong
python manage.py crawl
```

### 2. 指定爬虫名称

```bash
python manage.py crawl --spider=game_spider
```

### 3. 使用自定义URL爬虫

```bash
python manage.py crawl --spider=custom_game_spider --url=https://example.com/games
```

## 爬虫功能说明

### game_spider
- 爬取Steam热门游戏数据
- 自动提取: 游戏名称、开发者、价格、描述、标签、图片
- 自动去重和存储到数据库

### custom_game_spider
- 支持自定义URL
- 通用解析逻辑，适配大部分游戏网站

## 核心组件

### Items (items.py)
定义爬取的数据结构:
- name: 游戏名称
- author: 开发者
- price: 价格
- description: 描述
- tags: 标签列表
- image_url: 图片链接
- source_url: 来源链接

### Pipelines (pipelines.py)
1. **DuplicatesPipeline**: 去重
2. **DjangoPipeline**: 存储到Django数据库

### Settings (settings.py)
- 并发请求数: 16
- 下载延迟: 1秒
- HTTP缓存: 启用
- 日志级别: INFO

## 扩展开发

### 添加新爬虫

在 `crawler/spiders/` 创建新文件:

```python
import scrapy
from crawler.items import GameItem

class NewGameSpider(scrapy.Spider):
    name = 'new_game_spider'
    start_urls = ['https://example.com']

    def parse(self, response):
        item = GameItem()
        item['name'] = response.css('h1::text').get()
        # ... 其他字段
        yield item
```

运行:
```bash
python manage.py crawl --spider=new_game_spider
```

### 自定义Pipeline

在 `crawler/pipelines.py` 添加:

```python
class CustomPipeline:
    def process_item(self, item, spider):
        # 自定义处理逻辑
        return item
```

在 `crawler/settings.py` 注册:
```python
ITEM_PIPELINES = {
    'crawler.pipelines.CustomPipeline': 200,
}
```

## 注意事项

1. 遵守目标网站的 robots.txt 和使用条款
2. 合理设置下载延迟，避免对服务器造成压力
3. Steam等网站有严格的访问限制，建议使用代理
4. 定期检查选择器是否失效

## 故障排查

### 常见问题

1. **连接超时**
   - 增加下载延迟
   - 检查网络连接
   - 考虑使用代理

2. **数据库错误**
   - 确认MySQL服务运行
   - 检查数据库配置
   - 运行 `python manage.py migrate`

3. **选择器失效**
   - 检查目标网站是否更新
   - 使用浏览器开发者工具重新分析
   - 更新CSS选择器

## 日志查看

爬虫运行时会输出详细日志，包括:
- 爬取进度
- 数据保存状态
- 错误信息
- 统计信息

查看统计:
```
Created: X items
Updated: Y items
Failed: Z items
```
