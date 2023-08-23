from django.db import models

# Create your models here.

class Category(models.Model):
  title = models.CharField(max_length = 50)
  icon_url = models.CharField(max_length = 1024, default = '')

  def __str__(self):
    return self.title


class Product(models.Model):
  title = models.CharField(max_length = 200)
  image_url = models.CharField(max_length = 1024)
  brand = models.CharField(max_length = 50, default = '')
  category = models.ForeignKey(Category, on_delete = models.CASCADE)
  actual_price = models.FloatField(default=0.0)
  selling_price = models.FloatField(default=0.0)
  rating = models.FloatField(default=0.0)
  description = models.CharField(max_length = 1000, default = '')
  gender = models.CharField(max_length = 50, default='Male')
  age = models.IntegerField(null = True)

  created_at = models.DateTimeField(auto_now_add=True)

  def __str__(self):
    return self.title

