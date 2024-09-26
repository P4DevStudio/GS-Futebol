document.addEventListener("DOMContentLoaded", function() {
    const sidebarToggle = document.getElementById('sidebarToggle'); // Botão de toggle na navbar
    const sidebar = document.getElementById('sidebar'); // Sidebar principal

    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('minimized'); // Adiciona ou remove a classe 'minimized'
        });
    }
});
