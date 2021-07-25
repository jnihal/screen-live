document.addEventListener('DOMContentLoaded', function() {
    const search = document.getElementById('searchInput')

    search.addEventListener('keyup', function() {
        load(search.value)
    })
    
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=5711b1d3e109a8947a0de589e2539de9&with_genres=28`)
    .then(response => response.json())
    .then(data => {
        data.results.forEach(element => {
            add_post(element, 'action')
        })
    })
    
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=5711b1d3e109a8947a0de589e2539de9&with_genres=18`)
    .then(response => response.json())
    .then(data => {
        data.results.forEach(element => {
            add_post(element, 'drama')
        })
    })

    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=5711b1d3e109a8947a0de589e2539de9&with_genres=80`)
    .then(response => response.json())
    .then(data => {
        data.results.forEach(element => {
            add_post(element, 'crime')
        })
    })
    
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=5711b1d3e109a8947a0de589e2539de9&with_genres=35`)
    .then(response => response.json())
    .then(data => {
        data.results.forEach(element => {
            add_post(element, 'comedy')
        })
    })
    
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=5711b1d3e109a8947a0de589e2539de9&with_genres=10749`)
    .then(response => response.json())
    .then(data => {
        data.results.forEach(element => {
            add_post(element, 'romance')
        })
    })

    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=5711b1d3e109a8947a0de589e2539de9&with_genres=27`)
    .then(response => response.json())
    .then(data => {
        data.results.forEach(element => {
            add_post(element, 'horror')
        })
    })
    
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=5711b1d3e109a8947a0de589e2539de9&with_genres=16`)
    .then(response => response.json())
    .then(data => {
        data.results.forEach(element => {
            add_post(element, 'animation')
        })
    })
    
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=5711b1d3e109a8947a0de589e2539de9&with_genres=99`)
    .then(response => response.json())
    .then(data => {
        data.results.forEach(element => {
            add_post(element, 'documentary')
        })
    })
    
});


function load(query) {
    document.getElementById('searchContainer').innerHTML = ''
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=5711b1d3e109a8947a0de589e2539de9&query=${query}`)
    .then(response => response.json())
    .then(data => {
        data.results.forEach(element => {
            add_post(element, 'searchContainer')
        });
    })
};


function add_post(element, list) {
    if (element.poster_path != null) {
        var link = document.createElement('a');
        link.href = `movie/${element.id}`
        link.style.width = 'fit-content'
        var img = document.createElement('img');
        img.src = `https://image.tmdb.org/t/p/original${element.poster_path}`
        img.id = 'image'
        link.appendChild(img)
        document.getElementById(list).append(link)
    }
};
