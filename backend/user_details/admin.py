from django.contrib import admin
from .models import UserDetail, BrowsingHistory, Review, SearchQuery, PurchaseHistory, Favourite, Cart

# Register your models here.
admin.site.register(UserDetail)
admin.site.register(BrowsingHistory)
admin.site.register(Review)
admin.site.register(SearchQuery)
admin.site.register(PurchaseHistory)
admin.site.register(Favourite)
admin.site.register(Cart)