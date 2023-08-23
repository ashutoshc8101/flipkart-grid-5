from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import UserDetail, Favourite, Cart, PurchaseHistory
from products.models import Product
from google_auth.serializers import UserDetailsSerializer
from .serializers import FavouriteSerializer, CartSerializer, PurchaseHistorySerializer

# Create your views here.
class ProfileAPI(APIView):

  def post(self, request):

    data = request.data

    user_details = UserDetail.objects.filter(user__email = data['email']).first()

    user_details.age = data['age']
    user_details.gender = data['gender']
    user_details.location = data['location']

    full_name = data['name']

    first_name = full_name.split(' ')[0]
    last_name = ''

    if len(full_name.split(' ')) > 1:
      last_name = full_name.split(' ')[1]

    user_details.user.first_name = first_name

    user_details.user.last_name = last_name

    user_details.user.save()

    user_details.save()

    return Response(
      data = UserDetailsSerializer(user_details).data
    )


class FavouritesAPI(APIView):

  def get(self, request):

    user_detail = UserDetail.objects.filter(user = request.user).first()
    favourites = Favourite.objects.filter(user_detail = user_detail).all()

    return Response(
      data = FavouriteSerializer(favourites, many = True).data
    )

  def post(self, request):

    product_id = request.data.get('productId')

    product = Product.objects.filter(id = product_id).first()
    user_detail = UserDetail.objects.filter(user = request.user).first()

    favourite = Favourite(
      product = product
    )

    favourite.save()

    favourite.user_detail.add(user_detail)

    favourite.save()

    return Response(FavouriteSerializer(favourite).data)


class CartAPI(APIView):

  def get(self, request):

    user_detail = UserDetail.objects.filter(user = request.user).first()
    cartItems = Cart.objects.filter(user_detail = user_detail).all()

    return Response(
      data = CartSerializer(cartItems, many = True).data
    )

  def post(self, request):

    product_id = request.data.get('productId')

    product = Product.objects.filter(id = product_id).first()
    user_detail = UserDetail.objects.filter(user = request.user).first()

    cart = Cart(
      product = product
    )

    cart.save()

    cart.user_detail.add(user_detail)

    cart.save()

    return Response(CartSerializer(cart).data)


  def delete(self, request, product_id):

    favourite = Favourite.objects.file(
      product__id = product_id,
      user = request.user
    ).first()

    favourite.delete()

    return Response(data = 'Successfully deleted')


class PurchaseHistoryAPI(APIView):

  def get(self, request):

    purchase_history = PurchaseHistory.objects.filter(
      user_detail__user = request.user).order_by('-purchased_on').all()[:8]

    return Response( data = PurchaseHistorySerializer(
      purchase_history, many = True).data )


class FavouriteDeleteAPI(APIView):

  def post(self, request):
    product_id = request.data['product_id']

    user_detail = UserDetail.objects.filter(user = request.user).first()

    favourite = Favourite.objects.filter(
      product__id = product_id,
      user_detail = user_detail
    ).first()

    favourite.delete()

    return Response(data = 'Successfully deleted')


class CartDeleteAPI(APIView):

  def post(self, request):
    product_id = request.data['product_id']

    user_detail = UserDetail.objects.filter(user = request.user).first()

    cart = Cart.objects.filter(
      product__id = product_id,
      user_detail = user_detail
    ).first()

    cart.delete()

    return Response(data = 'Successfully deleted')