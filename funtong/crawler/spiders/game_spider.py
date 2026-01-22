import scrapy
from crawler.items import GameItem
import re


class GameSpider(scrapy.Spider):
    """游戏数据爬虫 - 示例爬取Steam游戏数据"""
    name = 'game_spider'
    allowed_domains = ['store.steampowered.com']

    # 爬取Steam热门游戏
    start_urls = [
        'https://store.steampowered.com/search/?filter=topsellers&page=1'
    ]

    custom_settings = {
        'DOWNLOAD_DELAY': 2,  # Steam限制较严格
        'CONCURRENT_REQUESTS': 4,
    }

    def parse(self, response):
        """解析游戏列表页"""
        games = response.css('a.search_result_row')

        for game in games[:10]:  # 限制爬取数量
            item = GameItem()

            # 游戏名称
            item['name'] = game.css('.title::text').get(default='').strip()

            # 价格
            price_text = game.css('.discount_final_price::text').get()
            if not price_text:
                price_text = game.css('.search_price::text').get(default='Free')
            item['price'] = self._parse_price(price_text)

            # 开发者
            item['author'] = game.css('.search_name .platform_img::attr(title)').get(default='Unknown')

            # 详情页URL
            detail_url = game.css('::attr(href)').get()
            item['source_url'] = detail_url

            # 图片
            item['image_url'] = game.css('.search_capsule img::attr(src)').get()

            # 请求详情页获取更多信息
            if detail_url:
                yield scrapy.Request(
                    url=detail_url,
                    callback=self.parse_detail,
                    meta={'item': item}
                )

    def parse_detail(self, response):
        """解析游戏详情页"""
        item = response.meta['item']

        # 描述
        description = response.css('.game_description_snippet::text').get()
        item['description'] = description.strip() if description else ''

        # 开发者
        developer = response.css('.dev_row .summary a::text').get()
        if developer:
            item['author'] = developer.strip()

        # 标签
        tags = response.css('.glance_tags a::text').getall()
        item['tags'] = [tag.strip() for tag in tags if tag.strip()][:5]

        yield item

    def _parse_price(self, price_text):
        """解析价格文本"""
        if not price_text or 'Free' in price_text:
            return 0.0

        # 提取数字
        match = re.search(r'[\d.]+', price_text.replace(',', ''))
        if match:
            return float(match.group())
        return 0.0


class CustomGameSpider(scrapy.Spider):
    """通用游戏爬虫 - 支持自定义URL"""
    name = 'custom_game_spider'

    def __init__(self, url=None, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if url:
            self.start_urls = [url]
        else:
            self.start_urls = []

    def parse(self, response):
        """简单的解析逻辑，可根据实际需求调整"""
        item = GameItem()

        # 尝试常见的游戏信息选择器
        item['name'] = (
            response.css('h1::text').get() or
            response.css('.game-title::text').get() or
            response.xpath('//title/text()').get(default='')
        ).strip()

        item['author'] = (
            response.css('.developer::text').get() or
            response.css('.author::text').get(default='Unknown')
        ).strip()

        item['price'] = 0.0
        item['description'] = response.css('.description::text').get(default='').strip()
        item['tags'] = []
        item['source_url'] = response.url
        item['image_url'] = response.css('img.main-image::attr(src)').get()

        yield item
