document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.querySelector('.vertical-menu');
    const navbar = document.querySelector('.navbar-header');
    const content = document.querySelector('.main-content');
    const toggleButton = document.getElementById('navbar-menu-toggle');

    if (toggleButton) {
        toggleButton.addEventListener('click', function() {
            // Alterna entre a versão minimizada e expandida no desktop
            sidebar.classList.toggle('minimized');
            navbar.classList.toggle('sidebar-minimized');
            content.classList.toggle('sidebar-minimized');

            // No mobile, a sidebar aparecerá sobre o conteúdo ao clicar
            if (window.innerWidth <= 768) {
                sidebar.classList.toggle('active'); // Aplica classe 'active' para mostrar no mobile
            }
        });
    }
});
