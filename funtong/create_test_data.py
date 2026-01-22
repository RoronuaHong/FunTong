#!/usr/bin/env python
"""
创建测试数据脚本
"""
import os
import django

# 设置 Django 环境
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'funtong.settings')
django.setup()

from game.models import GameModel, TagModel

def create_test_data():
    """创建测试数据"""

    # 清空现有数据
    print("清理现有数据...")
    GameModel.objects.all().delete()
    TagModel.objects.all().delete()

    # 创建标签
    print("创建标签...")
    tags = [
        TagModel(name="动作"),
        TagModel(name="冒险"),
        TagModel(name="角色扮演"),
        TagModel(name="策略"),
        TagModel(name="模拟"),
    ]
    TagModel.objects.bulk_create(tags)
    print(f"创建了 {len(tags)} 个标签")

    # 创建游戏
    print("创建游戏...")
    games = [
        GameModel(name="塞尔达传说：旷野之息", author="任天堂", price=298.00),
        GameModel(name="艾尔登法环", author="FromSoftware", price=268.00),
        GameModel(name="巫师3：狂猎", author="CD Projekt Red", price=127.00),
        GameModel(name="上古卷轴5：天际", author="Bethesda", price=89.00),
        GameModel(name="黑暗之魂3", author="FromSoftware", price=168.00),
        GameModel(name="只狼：影逝二度", author="FromSoftware", price=268.00),
        GameModel(name="空洞骑士", author="Team Cherry", price=48.00),
        GameModel(name="星露谷物语", author="ConcernedApe", price=48.00),
        GameModel(name="哈迪斯", author="Supergiant Games", price=80.00),
        GameModel(name="泰拉瑞亚", author="Re-Logic", price=40.00),
        GameModel(name="我的世界", author="Mojang", price=165.00),
        GameModel(name="饥荒", author="Klei Entertainment", price=24.00),
        GameModel(name="死亡细胞", author="Motion Twin", price=90.00),
        GameModel(name="蔚蓝", author="Maddy Makes Games", price=70.00),
        GameModel(name="奥日与黑暗森林", author="Moon Studios", price=90.00),
    ]

    GameModel.objects.bulk_create(games)
    print(f"创建了 {len(games)} 个游戏")

    print("\n数据创建完成！")
    print(f"游戏总数: {GameModel.objects.count()}")
    print(f"标签总数: {TagModel.objects.count()}")

if __name__ == '__main__':
    create_test_data()
