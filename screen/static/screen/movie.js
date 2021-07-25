document.addEventListener('DOMContentLoaded', function() {
    const movie_id = location.pathname.split('/')[2]

    fetch(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=5711b1d3e109a8947a0de589e2539de9`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        document.getElementById('moviePage').style.backgroundImage = `linear-gradient(180deg, rgba(25,26,31,0) 0%, rgba(25,26,31,0.7) 40%, rgba(25,26,31,1) 90%), url('https://image.tmdb.org/t/p/original${data.backdrop_path}')`
        document.getElementById('movieTitle').innerHTML = `${data.title}`
        if (data.adult) {
            document.getElementById('movieInfo').innerHTML = `<span class="adult-badge">18+</span> ${data.release_date.slice(0, 4)} • ${minToHrs(data.runtime)} • ${getGenres(data.genres)}`
        } else {
            document.getElementById('movieInfo').innerHTML = `${data.release_date.slice(0, 4)} • ${minToHrs(data.runtime)} • ${getGenres(data.genres)}`
        }

        document.getElementById('imdbLink').href = `https://www.imdb.com/title/${data.imdb_id}`
        document.getElementById('movieBrief').innerHTML = data.overview

        data.spoken_languages.every(element => {
            if (element.iso_639_1 == data.original_language) {
                document.getElementById('language').innerHTML = element.english_name
                return false
            }

            return true
        })

        if (data.status != 'Released') {
            document.getElementById('liked').style.display = 'none'
            document.getElementById('alreadyWatched').style.display = 'none'
        }
        
    })

    fetch(`https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=5711b1d3e109a8947a0de589e2539de9`)
    .then(response => response.json())
    .then(data => {
        const videos = data.results
        document.getElementById('trailerLink').href = `https://www.youtube.com/watch?v=${getTrailer(videos)}`
    })

    fetch(`https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=5711b1d3e109a8947a0de589e2539de9`)
    .then(response => response.json())
    .then(data => {
        const cast = data.cast
        const crew = data.crew
        document.getElementById('cast').innerHTML = (getCast(cast))
        document.getElementById('director').innerHTML = (getDirector(crew))
    })
});

function minToHrs(min) {
    return `${Math.floor(min / 60)}h ${min % 60}m`
}

function getGenres(array) {
    var str = ""
    array.forEach(element => {
        str += `${element.name}, `
    });

    return str.slice(0, str.length - 2)
}

function getTrailer(array) {
    var key
    array.every(element => {
        if (element.type == "Trailer") {
            key = element.key
            return false
        }

        return true
    })

    return key
}

function getCast(array) {
    var str = ""
    array.slice(0,3).forEach(element => {
        str += `${element.name}, `
    })

    return str.slice(0, str.length - 2)
}

function getDirector(array) {
    var director = ""
    array.every(element => {
        if (element.job == 'Director') {
            director += `${element.name}`
            return false
        }

        return true
    });

    return director
}