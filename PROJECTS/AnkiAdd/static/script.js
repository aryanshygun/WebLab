document.addEventListener('DOMContentLoaded', function () {
    const links = document.querySelectorAll('.toggle-buttons a');
    const currentHash = window.location.hash;

    function updateActive() {
        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === window.location.hash) {
                link.classList.add('active');
            }
        });
    }

    // Initial run
    updateActive();

    

    // Update on hash change
    window.addEventListener('hashchange', updateActive);
});