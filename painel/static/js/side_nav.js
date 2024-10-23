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

    const contentContainer = document.getElementById('main-content-container');

    // Função para evitar comportamento padrão de navegação
    const preventNavigation = (event) => {
        event.preventDefault();
    };

    // Funções para exibir a mensagem "Em Desenvolvimento"
    const showUnderDevelopment = () => {
        contentContainer.innerHTML = '<p class="text-center">Em Desenvolvimento</p>';
    };

    // Adicionar preventDefault e exibir mensagem "Em Desenvolvimento"
    document.getElementById('home').addEventListener('click', function (event) {
        preventNavigation(event);
        showUnderDevelopment();
    });
    document.getElementById('recommended').addEventListener('click', function (event) {
        preventNavigation(event);
        showUnderDevelopment();
    });
    document.getElementById('favorites').addEventListener('click', function (event) {
        preventNavigation(event);
        showUnderDevelopment();
    });
    document.getElementById('games-list').addEventListener('click', function (event) {
        preventNavigation(event);
        showUnderDevelopment();
    });

    // Lista de Ligas
    document.getElementById('leagues-list').addEventListener('click', function (event) {
        preventNavigation(event);
        // Aqui você pode adicionar a lógica para carregar as ligas e a tabela de ligas.
        fetch('/path-to-fetch-leagues/')
        .then(response => response.json())
        .then(data => {
            // Processar e exibir as ligas como está sendo feito atualmente.
        })
        .catch(error => {
            console.error('Erro ao carregar ligas:', error);
            contentContainer.innerHTML = '<p class="text-center">Erro ao carregar as ligas.</p>';
        });
    });

    // Lista de Times
    document.getElementById('teams-list').addEventListener('click', function (event) {
        preventNavigation(event);
        fetch('/path-to-fetch-leagues/')
        .then(response => response.json())
        .then(data => {
            const leaguesHtml = data.map(league => `
                <div class="col-4 col-md-2 text-center">
                    <button class="btn btn-light league-btn" data-league-id="${league.id}">
                        <img src="${league.image}" alt="${league.name}" class="img-fluid">
                        <p>${league.name}</p>
                    </button>
                </div>
            `).join('');
            contentContainer.innerHTML = `<div class="row">${leaguesHtml}</div>`;

            // Adicionar evento de clique para carregar os times da liga
            document.querySelectorAll('.league-btn').forEach(button => {
                button.addEventListener('click', function () {
                    const leagueId = this.getAttribute('data-league-id');
                    fetch(`/path-to-fetch-teams/?league_id=${leagueId}`)
                    .then(response => response.json())
                    .then(data => {
                        const teamsHtml = data.map(team => `
                            <p>${team.name}</p>
                        `).join('');
                        contentContainer.innerHTML = `<div class="teams-list">${teamsHtml}</div>`;
                    })
                    .catch(error => {
                        console.error('Erro ao carregar times:', error);
                        contentContainer.innerHTML = '<p class="text-center">Erro ao carregar os times.</p>';
                    });
                });
            });
        })
        .catch(error => {
            console.error('Erro ao carregar ligas:', error);
            contentContainer.innerHTML = '<p class="text-center">Erro ao carregar as ligas.</p>';
        });
    });
});
