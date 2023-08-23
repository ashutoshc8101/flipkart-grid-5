from django.urls import path, re_path

from . import views

urlpatterns = [
    path('register/', views.register_by_access_token),
    path('', views.authentication_test),
]