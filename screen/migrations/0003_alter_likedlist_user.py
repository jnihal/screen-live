# Generated by Django 3.2.4 on 2021-07-10 14:18

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('screen', '0002_likedlist_seenlist_watchlist'),
    ]

    operations = [
        migrations.AlterField(
            model_name='likedlist',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='likedlist', to=settings.AUTH_USER_MODEL),
        ),
    ]
