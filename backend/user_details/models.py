from django.db import models
from django.contrib.auth.models import User
from products.models import Product

class UserDetail(models.Model):

    GENDERS = [
      ('M', 'Male'),
      ('F', 'Female')
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    age = models.IntegerField(null = True)
    gender = models.CharField(max_length = 1, choices = GENDERS, null = True)
    location = models.CharField(max_length = 50, null = True)

    def __str__(self):
      return self.user.first_name + ' ' + self.user.last_name


class BrowsingHistory(models.Model):

  product = models.ForeignKey(Product, on_delete=models.CASCADE)
  user_detail = models.ManyToManyField(UserDetail)


class Review(models.Model):
  product = models.ForeignKey(Product, on_delete = models.CASCADE)
  user_detail = models.ForeignKey(UserDetail, on_delete = models.CASCADE)

  review = models.CharField(max_length = 500, default = '')

  created_at = models.DateTimeField(auto_now_add = True)


class SearchQuery(models.Model):
  user_detail = models.ForeignKey(User, on_delete = models.CASCADE)

  query = models.CharField(max_length = 4096, default = '')


class PurchaseHistory(models.Model):
  product = models.ForeignKey(Product, on_delete = models.CASCADE)
  user_detail = models.ManyToManyField(UserDetail)

  purchased_on = models.DateTimeField(auto_now_add = True)


class Favourite(models.Model):
  product = models.ForeignKey(Product, on_delete = models.CASCADE)
  user_detail = models.ManyToManyField(UserDetail)


class Cart(models.Model):
  product = models.ForeignKey(Product, on_delete = models.CASCADE)
  user_detail = models.ManyToManyField(UserDetail)
