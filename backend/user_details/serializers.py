from rest_framework import serializers

from products.serializers import ProductSerializer
from google_auth.serializers import UserDetailsSerializer

class FavouriteSerializer(serializers.Serializer):
  product = ProductSerializer()

class CartSerializer(serializers.Serializer):
  product = ProductSerializer()

class PurchaseHistorySerializer(serializers.Serializer):
  product = ProductSerializer()

  purchased_on = serializers.DateTimeField()

class ReviewSerializer(serializers.Serializer):
  user_detail = UserDetailsSerializer()
  review = serializers.CharField()
  created_at = serializers.DateTimeField()
