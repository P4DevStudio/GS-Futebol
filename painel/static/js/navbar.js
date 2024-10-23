document.addEventListener('DOMContentLoaded', function () {
    const sidebarToggle = document.getElementById('navbar-menu-toggle');
    const sidebar = document.querySelector('.vertical-menu');
    const sidebarLogo = document.getElementById('sidebar-logo');
    const sidebarFavicon = document.getElementById('sidebar-favicon');
    const navbar = document.querySelector('.navbar-header');

    sidebarToggle.addEventListener('click', function () {
        sidebar.classList.toggle('minimized');

        if (sidebar.classList.contains('minimized')) {
            navbar.style.left = '60px';
            navbar.style.width = 'calc(100% - 60px)';
            sidebarLogo.style.display = 'none';
            sidebarFavicon.style.display = 'block';
        } else {
            navbar.style.left = '250px';
            navbar.style.width = 'calc(100% - 250px)';
            sidebarLogo.style.display = 'block';
            sidebarFavicon.style.display = 'none';
        }
    });
});
