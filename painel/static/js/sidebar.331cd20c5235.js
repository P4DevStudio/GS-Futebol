document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('sidebar');
    const navbar = document.querySelector('.navbar-header');
    const content = document.querySelector('.main-content');
    const toggleButton = document.getElementById('navbar-menu-toggle');

    if (toggleButton) {
        toggleButton.addEventListener('click', function() {
            sidebar.classList.toggle('minimized'); // Alterna a classe minimizada da sidebar
            navbar.classList.toggle('sidebar-minimized'); // Ajusta a navbar
            content.classList.toggle('sidebar-minimized'); // Ajusta o conteúdo

            // Exibe ou oculta a sidebar no mobile ao clicar no botão
            if (window.innerWidth <= 768) {
                sidebar.classList.toggle('active'); // Mostra a sidebar no mobile
            }
        });
    }
});
