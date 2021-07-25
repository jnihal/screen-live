document.addEventListener('DOMContentLoaded', function() {

    fetch(`api/${likedlist}`)
    .then(response => response.json())
    .then(data => {
        array = []
        data.list.forEach(element => {
            array.push(element.movie)
        })
        fetchMetaData(array)
        .then(data => {
            if (data.length == 0) {
                document.getElementById('divR').style.display = 'none'
            } else {
                data.forEach(element => {
                    add_post(element, 'recommendation')
                })
            }
        })
    })

    fetch(`api/${watchlist}`)
    .then(response => response.json())
    .then(data => {
        if (data.list.length == 0) {
            document.getElementById('divW').style.display = 'none'
        } else {
            data.list.forEach(element => {
                fetch(`https://api.themoviedb.org/3/movie/${element.movie}?api_key=5711b1d3e109a8947a0de589e2539de9`)
                .then(response => response.json())
                .then(data => {
                    add_post(data, 'watchlist')
                })
            });
        }
    })

    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=5711b1d3e109a8947a0de589e2539de9`)
    .then(response => response.json())
    .then(data => {
        data.results.forEach(element => {
            add_post(element, 'popular')
        })
    })

    fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=5711b1d3e109a8947a0de589e2539de9`)
    .then(response => response.json())
    .then(data => {
        data.results.forEach(element => {
            add_post(element, 'trending')
        })
    })
});

function add_post(element, list) {
    fetch(`api/${seenlist}`)
    .then(response => response.json())
    .then(data => {
        array = []
        data.list.forEach(element => {
            array.push(element.movie)
        })

        if (element.poster_path != null && !array.includes(element.id)) {
            var link = document.createElement('a');
            link.href = `movie/${element.id}`
            link.style.width = 'fit-content'
            var img = document.createElement('img');
            img.src = `https://image.tmdb.org/t/p/original${element.poster_path}`
            img.id = 'image'
            link.appendChild(img)
            document.getElementById(list).append(link)
        }
    })

    
};

async function fetchMetaData(array) {
    let allData = [];
  
    for (let index = 0; index < array.length; index++) {
        let element = array[index]
        const response = await fetch(`https://api.themoviedb.org/3/movie/${element}/recommendations?api_key=5711b1d3e109a8947a0de589e2539de9&page=1`)
        let { results } = await response.json();
        results.forEach(e => allData.unshift(e));
    }
    allData = shuffle(allData);
    return removeDuplicates(allData.slice(0, 100))
}

function shuffle(array) {
    var currentIndex = array.length,  randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
}

function removeDuplicates(array) {
      
    jsonObject = array.map(JSON.stringify);

    uniqueSet = new Set(jsonObject);
    uniqueArray = Array.from(uniqueSet).map(JSON.parse);

    return uniqueArray
}
