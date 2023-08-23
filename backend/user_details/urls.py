from django.urls import path

from . import views

urlpatterns = [
    path('', views.ProfileAPI.as_view()),
    path('favourites/', views.FavouritesAPI.as_view()),
    path('favourites/delete', views.FavouriteDeleteAPI.as_view()),
    path('cart/', views.CartAPI.as_view()),
    path('cart/delete', views.CartDeleteAPI.as_view()),
    path('purchase_history', views.PurchaseHistoryAPI.as_view())
]