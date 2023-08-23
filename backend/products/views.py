from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import ProductSerializer, CategorySerializer
from .models import Product, Category
from user_details.models import Review
from user_details.serializers import ReviewSerializer

# Create your views here.
class ProductAPI(APIView):

  def get(self, request):
    product_id = request.query_params.get('id')

    product = Product.objects.filter(id = product_id).first()
    reviews = Review.objects.filter(product = product).all()

    return Response(
      data = {
        'product': ProductSerializer(product).data,
        'reviews': ReviewSerializer(reviews, many = True).data
      }
    )

class CategoryAPI(APIView):

  def get(self, request):

    category_id = request.query_params.get('category_id')
    category = Category.objects.filter(id = category_id).first()
    products = Product.objects.filter(category__id = category_id).all()

    return Response(
      data = {
        'category' : CategorySerializer(category).data,
        'products': ProductSerializer(products, many = True).data
      }
    )
