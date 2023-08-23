from django.urls import path

from . import views

urlpatterns = [
    path('', views.InferenceAPI.as_view()),
]