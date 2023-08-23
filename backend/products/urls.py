from django.urls import path

from . import views

urlpatterns = [
    path('', views.ProductAPI.as_view()),
    path('category', views.CategoryAPI.as_view())
]