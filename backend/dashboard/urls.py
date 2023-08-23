from django.urls import path, re_path

from . import views

urlpatterns = [
    path('', views.DashboardAPI.as_view()),
]