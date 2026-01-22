from datetime import datetime
from game.models import GameModel, TagModel
from twisted.internet import defer
from twisted.internet.threads import deferToThread
import logging

logger = logging.getLogger(__name__)


class DuplicatesPipeline:
    """去重Pipeline"""

    def __init__(self):
        self.seen_names = set()

    def process_item(self, item, spider):
        name = item.get('name', '').strip()

        if not name:
            logger.warning(f"Item without name: {item}")
            raise Exception("Missing name")

        if name in self.seen_names:
            logger.info(f"Duplicate item found: {name}")
            raise Exception(f"Duplicate item: {name}")

        self.seen_names.add(name)
        return item


class DjangoPipeline:
    """Django数据库存储Pipeline - 支持异步"""

    def __init__(self):
        self.created_count = 0
        self.updated_count = 0
        self.failed_count = 0

    def _save_to_db(self, item):
        """在同步线程中保存数据到Django数据库"""
        try:
            name = item.get('name', '').strip()
            author = item.get('author', 'Unknown').strip()
            price = item.get('price', 0.0)

            if not name:
                logger.error(f"Item missing required field 'name': {item}")
                self.failed_count += 1
                return item

            # 检查是否存在
            game, created = GameModel.objects.update_or_create(
                name=name,
                defaults={
                    'author': author,
                    'price': price,
                }
            )

            if created:
                self.created_count += 1
                logger.info(f"Created new game: {name}")
            else:
                self.updated_count += 1
                logger.info(f"Updated existing game: {name}")

            # 处理标签
            tags = item.get('tags', [])
            if tags:
                for tag_name in tags:
                    tag, _ = TagModel.objects.get_or_create(name=tag_name.strip())
                    logger.debug(f"Processed tag: {tag_name}")

            return item

        except Exception as e:
            self.failed_count += 1
            logger.error(f"Error saving item {item.get('name', 'Unknown')}: {str(e)}")
            return item

    def process_item(self, item, spider):
        """异步处理item - 使用deferToThread在线程中运行Django ORM"""
        return deferToThread(self._save_to_db, item)

    def close_spider(self, spider):
        """爬虫关闭时输出统计信息"""
        logger.info("=" * 50)
        logger.info(f"Crawler Statistics:")
        logger.info(f"Created: {self.created_count}")
        logger.info(f"Updated: {self.updated_count}")
        logger.info(f"Failed: {self.failed_count}")
        logger.info(f"Total Processed: {self.created_count + self.updated_count + self.failed_count}")
        logger.info("=" * 50)
