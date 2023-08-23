from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response

from products.serializers import ProductSerializer, CategorySerializer
from products.models import Product, Category
from user_details.models import Favourite, PurchaseHistory
from user_details.serializers import FavouriteSerializer, PurchaseHistorySerializer
from django.db.models import Count

class DashboardAPI(APIView):

  def get(self, request):
    new_products = Product.objects.order_by("-created_at").all()[:5]

    top_rated_products = Product.objects.order_by("-rating").all()[:8]

    trending = Favourite.objects.annotate(
      freq_count = Count('product')).order_by('-freq_count').all()[:8]

    best_sellers = PurchaseHistory.objects.annotate(
      freq_count = Count('product')).order_by('-freq_count').all()[:4]

    categories = Category.objects.all()

    return Response(
      data = {
        'categories': CategorySerializer(categories, many = True).data,
        'new_products': ProductSerializer(new_products, many = True).data,
        'top_rated_products': ProductSerializer(top_rated_products, many = True).data,
        'trending': FavouriteSerializer(trending, many = True).data,
        'best_sellers': PurchaseHistorySerializer(best_sellers, many = True).data
      }
    )