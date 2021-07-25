document.addEventListener('DOMContentLoaded', () => {
    const movie_id = location.pathname.split('/')[2]
    const csrftoken = getCookie('csrftoken');
    
    const watchLater = document.getElementById('watchLater')
    const alreadyWatched = document.getElementById('alreadyWatched')
    const liked = document.getElementById('liked')

    fetch(`/seenlist/${movie_id}`)
    .then(response => response.json())
    .then(data => {
        if (data.seen) {
            alreadyWatched.classList.add('active')
        } else {
            alreadyWatched.classList.remove('active')
        }
    });

    alreadyWatched.addEventListener('click', () => {
        console.log('clicked')
        fetch(`/seenlist/${movie_id}`, {
            method: 'POST',
            headers: { "X-CSRFToken": csrftoken }
        })
        .then(response => response.json())
        .then(data => {
            if (data.seen) {
                alreadyWatched.classList.add('active')
                watchLater.classList.remove('active')
            } else {
                alreadyWatched.classList.remove('active')
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