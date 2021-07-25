from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.urls import reverse
from django.contrib.auth.decorators import login_required

from .models import User, Profile, Watchlist, Seenlist, Likedlist

# Create your views here.
@login_required(login_url="login")
def index(request):
    return render(request, "screen/index.html")


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        email = request.POST["email"]
        password = request.POST["password"]
        user = authenticate(request, username=email, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "screen/login.html", {
                "message": "Invalid email or password."
            })
    else:
        return render(request, "screen/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("login"))


def register(request):
    if request.method == "POST":
        email = request.POST["email"]
        first_name = request.POST["first_name"].title()
        last_name = request.POST["last_name"].title()
        profile_pic = request.FILES.get("profile_pic")

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "screen/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(
                email, email, password, first_name=first_name, last_name=last_name)
            profile = Profile(user=user, profile_pic=profile_pic)
            user.save()
            profile.save()
        except IntegrityError:
            return render(request, "screen/register.html", {
                "message": "Email already registered."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "screen/register.html")


@login_required(login_url="login")
def discover(request):
    return render(request, "screen/discover.html")


@login_required(login_url="login")
def top_rated(request):
    return render(request, "screen/top_rated.html")


@login_required(login_url="login")
def upcoming(request):
    return render(request, "screen/upcoming.html")


@login_required(login_url="login")
def movie(request, id):
    return render(request, "screen/movie.html")


@login_required(login_url="login")
def movies_to_watch(request):
    return render(request, "screen/movies_to_watch.html")


@login_required(login_url="login")
def movies_watched(request):
    return render(request, "screen/movies_watched.html")


@login_required(login_url="login")
def liked_movies(request):
    return render(request, "screen/liked_movies.html")


@login_required(login_url="login")
def watch_movie(request, id):
    if request.method == "POST":
        user = request.user
        
        watched = Watchlist.objects.filter(user=user, movie=id).exists()

        if watched:
            Watchlist.objects.filter(user=user, movie=id).delete()
            return JsonResponse({
                'status': 201,
                'watched': False
            }, status=201)
        
        else:
            Seenlist.objects.filter(user=user, movie=id).delete()
            Likedlist.objects.filter(user=user, movie=id).delete()
            watchlist = Watchlist(user=user, movie=id)
            watchlist.save()
            return JsonResponse({
                "status": 201,
                "watched": True,
            }, status=201)
    
    elif request.method == "GET":
        user = request.user
        watched = Watchlist.objects.filter(user=user, movie=id).exists()

        return JsonResponse({
            'status': 201,
            'watched': watched
        }, status=201)

    else:
        return JsonResponse({
            "error": "GET or POST request required."
        }, status=400)


def seen_movie(request, id):
    if request.method == "POST":
        user = request.user
        
        seen = Seenlist.objects.filter(user=user, movie=id).exists()

        if seen:
            Seenlist.objects.filter(user=user, movie=id).delete()
            return JsonResponse({
                'status': 201,
                'seen': False
            }, status=201)
        
        else:
            Watchlist.objects.filter(user=user, movie=id).delete()
            seenlist = Seenlist(user=user, movie=id)
            seenlist.save()
            return JsonResponse({
                "status": 201,
                "seen": True,
            }, status=201)
    
    elif request.method == "GET":
        user = request.user
        seen = Seenlist.objects.filter(user=user, movie=id).exists()

        return JsonResponse({
            'status': 201,
            'seen': seen
        }, status=201)

    else:
        return JsonResponse({
            "error": "GET or POST request required."
        }, status=400)


def like_movie(request, id):
    if request.method == "POST":
        user = request.user
        
        liked = Likedlist.objects.filter(user=user, movie=id).exists()

        if liked:
            Likedlist.objects.filter(user=user, movie=id).delete()
            return JsonResponse({
                'status': 201,
                'liked': False
            }, status=201)
        
        else:
            Watchlist.objects.filter(user=user, movie=id).delete()
            seenlist = Seenlist(user=user, movie=id)
            seenlist.save()
            likelist = Likedlist(user=user, movie=id)
            likelist.save()
            return JsonResponse({
                "status": 201,
                "liked": True,
            }, status=201)
    
    elif request.method == "GET":
        user = request.user
        liked = Likedlist.objects.filter(user=user, movie=id).exists()

        return JsonResponse({
            'status': 201,
            'liked': liked
        }, status=201)

    else:
        return JsonResponse({
            "error": "GET or POST request required."
        }, status=400)


def get_list(request, list_name):
    if list_name == 'watchlist':
        return JsonResponse({
        'list': list(request.user.watchlist.values('movie'))
        }, status=201)
    
    elif list_name == 'seenlist':
        return JsonResponse({
        'list': list(request.user.seenlist.values('movie'))
        }, status=201)

    elif list_name == 'likedlist':
        return JsonResponse({
        'list': list(request.user.likedlist.values('movie'))
        }, status=201)
    
    else:
        return JsonResponse({
            "error": "Enter a valid list name"
        }, status=400)