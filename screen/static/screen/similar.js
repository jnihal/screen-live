document.addEventListener('DOMContentLoaded', function() {
    const movie_id = location.pathname.split('/')[2]

    fetch(`https://api.themoviedb.org/3/movie/${movie_id}/similar?api_key=5711b1d3e109a8947a0de589e2539de9&page=1`)
    .then(response => response.json())
    .then(data => {
        data.results.forEach(add_post);
    })
});

function add_post(element) {
    if (element.poster_path != null) {
        var link = document.createElement('a');
        link.href = element.id
        link.style.width = 'fit-content'
        var img = document.createElement('img');
        img.src = `https://image.tmdb.org/t/p/original${element.poster_path}`
        img.id = 'image'
        link.appendChild(img)
        document.getElementById('similarMovies').append(link)
    }
};
