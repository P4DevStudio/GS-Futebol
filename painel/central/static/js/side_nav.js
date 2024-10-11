document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.getElementById('vertical-menu-btn');  // Botão da navbar para alternar sidebar
    const sidebar = document.querySelector('.vertical-menu');  // Sidebar
    const navbar = document.querySelector('.navbar-header');  // Navbar
    const content = document.querySelector('.main-content');  // Conteúdo principal
    const mobileFavicon = document.getElementById('mobile-favicon');  // Favicon no mobile

    // Função que ajusta o layout com base no estado da sidebar e na largura da tela
    function adjustLayout() {
        if (window.innerWidth > 768) {  // Desktop
            mobileFavicon.style.display = 'none';  // Esconde o favicon no desktop
            if (sidebar.classList.contains('minimized')) {
                navbar.classList.add('sidebar-minimized');
                content.classList.add('sidebar-minimized');
            } else {
                navbar.classList.remove('sidebar-minimized');
                content.classList.remove('sidebar-minimized');
            }
        } else {  // Mobile
            mobileFavicon.style.display = 'inline-block';  // Mostra o favicon no mobile
            navbar.style.width = '100vw';
            content.style.marginLeft = '0';
        }
    }

    // Evento de clique no botão para alternar a sidebar
    toggleButton.addEventListener('click', function () {
        if (window.innerWidth > 768) {  // Desktop
            sidebar.classList.toggle('minimized');
            adjustLayout();  // Ajusta o layout após a alteração
        } else {  // Mobile
            sidebar.classList.toggle('active');
        }
    });

    // Ajusta o layout ao redimensionar a janela
    window.addEventListener('resize', adjustLayout);

    // Ajusta o layout ao carregar a página
    adjustLayout();
});
