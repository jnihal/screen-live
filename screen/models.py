from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    pass


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile_pic = models.ImageField(upload_to="profile_pics", blank=True)
    timestamp = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.user.email


class Watchlist(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="watchlist")
    movie = models.IntegerField(blank=False)

class Seenlist(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="seenlist")
    movie = models.IntegerField(blank=False)

class Likedlist(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="likedlist")
    movie = models.IntegerField(blank=False)