from django.shortcuts import render
from django.views.generic import TemplateView
import requests

class DashboardTemplateView(TemplateView):
    template_name = 'central/main/dashboard.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        # URL para buscar as ligas selecionadas
        league_url = 'https://api.football-data-api.com/league-list?key=db01a476916110021e97e90f1ecdb8f9c5574ded43012b2f24304e34ba394bbe&chosen_leagues_only=true'
        league_response = requests.get(league_url)

        if league_response.status_code == 200:
            league_data = league_response.json().get('data', [])
            # Filtrar as ligas que possuem uma temporada em 2024
            filtered_leagues = []
            for league in league_data:
                if 'season' in league:
                    for season in league['season']:
                        if season['year'] == 2024:
                            league_with_season_2024 = {
                                'name': league['name'],
                                'image': league['image'],
                                'season_2024_id': season['id']
                            }
                            filtered_leagues.append(league_with_season_2024)
                            break  # Para o loop após encontrar a temporada de 2024
        else:
            filtered_leagues = []

        # Adiciona as ligas ao contexto
        context['league_data'] = filtered_leagues

        # Se for necessário, buscar a tabela da liga 2024 (por exemplo, temporada "11321")
        season_id = 11321  # Exemplo fixo, ou você pode pegar de alguma lógica dinâmica
        table_url = f'https://api.football-data-api.com/league-tables?key=db01a476916110021e97e90f1ecdb8f9c5574ded43012b2f24304e34ba394bbe&season_id={season_id}'
        table_response = requests.get(table_url)

        if table_response.status_code == 200:
            league_table = table_response.json().get('data', {}).get('league_table', [])
            context['league_table'] = league_table
        else:
            context['league_table'] = []

        return context
