from django.contrib import admin
from .models import User, Profile, Watchlist, Seenlist, Likedlist

# Register your models here.
admin.site.register(User)
admin.site.register(Profile)
admin.site.register(Watchlist)
admin.site.register(Seenlist)
admin.site.register(Likedlist)