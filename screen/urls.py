from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('login', views.login_view, name='login'),
    path('register', views.register, name='register'),
    path('logout', views.logout_view, name='logout'),
    path('discover', views.discover, name='discover'),
    path('top-rated', views.top_rated, name='top_rated'),
    path('upcoming', views.upcoming, name='upcoming'),
    path('movie/<int:id>', views.movie, name='movie'),
    path('movies_to_watch', views.movies_to_watch, name='moviesToWatch'),
    path('movies_watched', views.movies_watched, name='moviesWatched'),
    path('liked_movies', views.liked_movies, name='likedMovies'),

    # API Routes
    path('watchlist/<int:id>', views.watch_movie, name='watchlist'),
    path('seenlist/<int:id>', views.seen_movie, name='seenlist'),
    path('likedlist/<int:id>', views.like_movie, name='likedlist'),
    path('api/<str:list_name>', views.get_list, name='getList'),
]