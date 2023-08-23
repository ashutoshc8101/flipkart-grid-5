from rest_framework import serializers

class CategorySerializer(serializers.Serializer):
  id = serializers.IntegerField()
  title = serializers.CharField()
  icon_url = serializers.CharField()

class ProductSerializer(serializers.Serializer):
  id = serializers.IntegerField()
  title = serializers.CharField()
  image_url = serializers.CharField()
  brand = serializers.CharField()
  category = CategorySerializer()
  actual_price = serializers.FloatField()
  selling_price = serializers.FloatField()
  rating = serializers.FloatField()
  description = serializers.CharField()

