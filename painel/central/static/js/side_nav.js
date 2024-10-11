document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.getElementById('vertical-menu-btn');  // Botão da navbar para alternar sidebar
    const sidebar = document.querySelector('.vertical-menu');  // Sidebar
    const navbar = document.querySelector('.navbar-header');  // Navbar
    const content = document.querySelector('.main-content');  // Conteúdo principal

    // Função que ajusta o layout com base no estado da sidebar e na largura da tela
    function adjustLayout() {
        if (window.innerWidth > 768) {  // Desktop
            if (sidebar.classList.contains('minimized')) {
                navbar.style.width = 'calc(100vw - 60px)';
                content.style.marginLeft = '60px';
            } else {
                navbar.style.width = 'calc(100vw - 250px)';
                content.style.marginLeft = '250px';
            }
        } else {  // Mobile
            if (sidebar.classList.contains('active')) {
                navbar.style.width = 'calc(100vw - 250px)';
                content.style.marginLeft = '250px';
            } else {
                navbar.style.width = '100vw';
                content.style.marginLeft = '0';
            }
        }
    }

    // Evento de clique no botão para alternar a sidebar
    toggleButton.addEventListener('click', function () {
        if (window.innerWidth > 768) {  // Desktop
            sidebar.classList.toggle('minimized');
            content.classList.toggle('sidebar-minimized');
        } else {  // Mobile
            sidebar.classList.toggle('active');
        }
        adjustLayout();  // Ajusta o layout após a alteração
    });

    // Ajusta o layout ao redimensionar a janela
    window.addEventListener('resize', adjustLayout);

    // Ajusta o layout ao carregar a página
    adjustLayout();
});
