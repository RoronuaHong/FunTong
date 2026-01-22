import scrapy


class GameItem(scrapy.Item):
    """游戏数据Item"""
    name = scrapy.Field()
    author = scrapy.Field()
    price = scrapy.Field()
    description = scrapy.Field()
    tags = scrapy.Field()  # 标签列表
    image_url = scrapy.Field()
    source_url = scrapy.Field()
