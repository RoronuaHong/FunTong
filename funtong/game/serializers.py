from rest_framework import serializers
from .models import GameModel, TagModel


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = TagModel
        fields = ['id', 'name']


class GameSerializer(serializers.ModelSerializer):
    pub_time = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", read_only=True)

    class Meta:
        model = GameModel
        fields = ['id', 'name', 'author', 'pub_time', 'price']
        read_only_fields = ['id', 'pub_time']

    def validate_price(self, value):
        if value < 0:
            raise serializers.ValidationError("价格不能为负数")
        if value > 999.99:
            raise serializers.ValidationError("价格不能超过 999.99")
        return value

    def validate_name(self, value):
        if not value or len(value.strip()) == 0:
            raise serializers.ValidationError("游戏名称不能为空")
        return value
