document.addEventListener('DOMContentLoaded', function() {
    const html = location.pathname.split('/')[1]
    var list
    const container = document.getElementById('movie-container')

    if (html == 'movies_to_watch') {
        list = 'watchlist'
        container.innerHTML = '<h3>Movies To Watch</h3>'
    } else if (html == 'movies_watched') {
        list = 'seenlist'
        container.innerHTML = '<h3>Movies Watched</h3>'
    } else if (html == 'liked_movies') {
        list = 'likedlist'
        container.innerHTML = '<h3>Liked Movies</h3>'
    }

    fetch(list)
    .then(response => response.json())
    .then(data => {
        data.list.forEach(element => {
            fetch(`https://api.themoviedb.org/3/movie/${element.movie}?api_key=5711b1d3e109a8947a0de589e2539de9`)
            .then(response => response.json())
            .then(data => {
                add_post(data)
            })
        });
    })
});

function add_post(element) {
    if (element.poster_path != null) {
        var link = document.createElement('a');
        link.href = `movie/${element.id}`
        link.style.width = 'fit-content'
        var img = document.createElement('img');
        img.src = `https://image.tmdb.org/t/p/original${element.poster_path}`
        img.id = 'image'
        link.appendChild(img)
        document.getElementById('movie-container').append(link)
    }
};
