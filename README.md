# Screen
Screen is a website which will help users to discover new movies, keep track of movies they have watched, save movies to a list to wath later and also recommend movies based on the movies they like.

This project uses [**The Movie Database**](https://www.themoviedb.org/documentation/api) API to get details about the movies.

## Features
### Navigation
- **Home** - Users can see recommended movies, thier watchlist, popular and trending movies.
- **Discover** - Users can search for movies (search as you type) and also discover movies using genre.
- **Top Rated** - Displays a list of top rated movies of all time.
- **Upcoming** - Find movies that are going to be released in the future.

### Profile
- **Movies to Watch** - List of movies to watch later.
- **Movies Watched** - List of movies the have already seen.
- **Liked Movies** - List of movies they have liked.

### Movie Page
- Get youtube trailer and IMDb links for that movie.
- Shows various details about the movie like runtime, release year, genre, cast, director and language.
- Displays a list of movies similar to the current movie.
- Ability to like/unlike and add/remove the movie to watchlist or seenlist.

## Usage
- Run `pip install requirements.txt` to install necessary packages.
- Open your terminal in the project's main directory (where the manage.py file is located)
- Run `python manage.py makemigrations screen` to make migrations for the screen app.
- Run `python manage.py migrate` to apply migrations to your database.
- Run `python manage.py runserver` to start the server and use the website.