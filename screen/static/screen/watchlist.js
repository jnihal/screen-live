document.addEventListener('DOMContentLoaded', () => {
    const movie_id = location.pathname.split('/')[2]
    const csrftoken = getCookie('csrftoken');

    const watchLater = document.getElementById('watchLater')
    const alreadyWatched = document.getElementById('alreadyWatched')
    const liked = document.getElementById('liked')

    fetch(`/watchlist/${movie_id}`)
    .then(response => response.json())
    .then(data => {
        if (data.watched) {
            watchLater.classList.add('active')
        } else {
            watchLater.classList.remove('active')
        }
    });

    watchLater.addEventListener('click', () => {
        console.log('clicked')
        fetch(`/watchlist/${movie_id}`, {
            method: 'POST',
            headers: { "X-CSRFToken": csrftoken }
        })
        .then(response => response.json())
        .then(data => {
            if (data.watched) {
                watchLater.classList.add('active')
                alreadyWatched.classList.remove('active')
                liked.classList.remove('active')
            } else {
                watchLater.classList.remove('active')
            }
        });
    });
});

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}