from django.core.management.base import BaseCommand
from scrapy.crawler import CrawlerProcess
from scrapy.utils.project import get_project_settings
import sys
import os


class Command(BaseCommand):
    help = '启动Scrapy爬虫爬取游戏数据'

    def add_arguments(self, parser):
        parser.add_argument(
            '--spider',
            type=str,
            default='game_spider',
            help='指定要运行的爬虫名称 (默认: game_spider)'
        )
        parser.add_argument(
            '--url',
            type=str,
            help='自定义爬取URL (用于custom_game_spider)'
        )

    def handle(self, *args, **options):
        spider_name = options['spider']
        custom_url = options.get('url')

        self.stdout.write(self.style.SUCCESS(f'Starting crawler: {spider_name}'))

        # 添加crawler模块路径
        crawler_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), '..')
        sys.path.insert(0, crawler_path)

        # 获取Scrapy配置
        os.environ.setdefault('SCRAPY_SETTINGS_MODULE', 'crawler.settings')
        settings = get_project_settings()

        # 创建爬虫进程
        process = CrawlerProcess(settings)

        # 启动爬虫
        if spider_name == 'custom_game_spider' and custom_url:
            process.crawl(spider_name, url=custom_url)
        else:
            process.crawl(spider_name)

        self.stdout.write(self.style.SUCCESS('Crawler started...'))
        process.start()
        self.stdout.write(self.style.SUCCESS('Crawler finished!'))
