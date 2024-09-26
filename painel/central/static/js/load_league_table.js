document.addEventListener("DOMContentLoaded", function() {
    const loadLeagueTable = async () => {
        try {
            const response = await fetch('/get-brazil-league-table/');
            const data = await response.json();

            const leagueTable = document.getElementById('leagueTable').getElementsByTagName('tbody')[0];

            leagueTable.innerHTML = ''; // Limpa a tabela antes de inserir novos dados

            data.forEach((team, index) => {
                const row = leagueTable.insertRow();
                const positionCell = row.insertCell(0);
                const nameCell = row.insertCell(1);
                const pointsCell = row.insertCell(2);

                positionCell.innerText = index + 1; // Posição
                nameCell.innerText = team.name;     // Nome do time
                pointsCell.innerText = team.points; // Pontuação
            });
        } catch (error) {
            console.error("Erro ao carregar a tabela da liga:", error);
        }
    };

    // Carrega a tabela automaticamente quando a página é carregada
    loadLeagueTable();
});
