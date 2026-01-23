from django.core.management.base import BaseCommand
from game.models import GameModel
from decimal import Decimal


class Command(BaseCommand):
    help = '初始化游戏示例数据'

    def handle(self, *args, **options):
        # 检查是否已有数据
        if GameModel.objects.exists():
            self.stdout.write(self.style.WARNING('数据库中已有游戏数据，跳过初始化'))
            return

        # 创建示例游戏数据
        demo_games = [
            {
                'name': '艾尔登法环',
                'author': 'FromSoftware',
                'price': Decimal('298.00'),
            },
            {
                'name': '赛博朋克2077',
                'author': 'CD Projekt Red',
                'price': Decimal('198.00'),
            },
        ]

        for game_data in demo_games:
            GameModel.objects.create(**game_data)
            self.stdout.write(
                self.style.SUCCESS(f'成功创建游戏: {game_data["name"]}')
            )

        self.stdout.write(self.style.SUCCESS('示例数据初始化完成！'))
