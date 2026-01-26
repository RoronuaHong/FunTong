# Scrapy settings for crawler project
import os
import sys
import django

# 添加Django项目路径
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "funtong.settings")
django.setup()

BOT_NAME = "funtong_crawler"

SPIDER_MODULES = ["crawler.spiders"]
NEWSPIDER_MODULE = "crawler.spiders"

# 遵守robots.txt规则
ROBOTSTXT_OBEY = False

# 并发请求数
CONCURRENT_REQUESTS = 16

# 下载延迟
DOWNLOAD_DELAY = 1

# 禁用cookies
COOKIES_ENABLED = False

# User-Agent
USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"

# Pipeline配置
ITEM_PIPELINES = {
    "crawler.pipelines.DuplicatesPipeline": 100,
    "crawler.pipelines.DjangoPipeline": 300,
}

# 日志级别
LOG_LEVEL = "INFO"

# 请求头
DEFAULT_REQUEST_HEADERS = {
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
}

# SSL/TLS 配置 - 解决Google访问问题
DOWNLOADER_CLIENT_TLSVERIFICATION_METHODS = ["TLSv1.2", "TLSv1.3"]
DOWNLOADER_CLIENT_TLS_CIPHERS = "DEFAULT"

# 超时设置
DOWNLOAD_TIMEOUT = 30

# 启用HTTP缓存
HTTPCACHE_ENABLED = True
HTTPCACHE_EXPIRATION_SECS = 3600
HTTPCACHE_DIR = "httpcache"
