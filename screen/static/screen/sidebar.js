document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.getElementById('menuBtn');
    menuBtn.addEventListener('click', () => {
        document.getElementById('sidebarMobile').style.display = 'block';
    })

    const closeBtn = document.getElementById('closeBtn');
    closeBtn.addEventListener('click', () => {
        document.getElementById('sidebarMobile').style.display = 'none';
    })
})