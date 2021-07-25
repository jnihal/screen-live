let currentPage = 1;
var scroll = true; 

document.addEventListener('DOMContentLoaded', function() {
    load(10);

    const movie = document.getElementById('movie-container')
    movie.onscroll = () => {
        if (scroll && movie.scrollTop === (movie.scrollHeight - movie.clientHeight)) {
            scroll = false;
            load(10);
            setTimeout(function () { scroll = true; }, 500);
        }
    };
});


function load(n) {
    let promises = []
    for (let index = 0; index < n; index++) {
        const page = currentPage;
        currentPage = currentPage + 1;

        promises.push(fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=5711b1d3e109a8947a0de589e2539de9&page=${page}`))
    }
    Promise.all(promises)
    .then(responses => {
        return Promise.all(responses.map(response => {
            return response.json()
        }))
    })
    .then(data => {
        data.forEach(element => {
            element.results.forEach(add_post)
        })
    })
};


function add_post(element) {
    if (element.poster_path != null && element.vote_count > 5000) {
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
