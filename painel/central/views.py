import logging
from django.http import JsonResponse
from django.shortcuts import render
from django.views.generic import TemplateView
import requests

# Configurando o logger
logger = logging.getLogger(__name__)

# Array para armazenar os season_id usados
season_ids_used = []

class DashboardTemplateView(TemplateView):
    template_name = 'central/main/dashboard.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        # URL para buscar as ligas selecionadas
        league_url = 'https://api.football-data-api.com/league-list?key=db01a476916110021e97e90f1ecdb8f9c5574ded43012b2f24304e34ba394bbe&chosen_leagues_only=true'
        league_response = requests.get(league_url)

        if league_response.status_code == 200:
            league_data = league_response.json().get('data', [])
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
                            break
        else:
            filtered_leagues = []

        context['league_data'] = filtered_leagues
        context['league_table'] = []  # Tabela inicial vazia
        return context

    def post(self, request, *args, **kwargs):
        season_id = request.POST.get('season_id')
        logger.debug(f"Season ID recebido: {season_id}")

        if '.' in season_id:
            season_id = season_id.replace('.', '')

        if season_id not in season_ids_used:
            season_ids_used.append(season_id)

        # URL da tabela da liga
        table_url = f'https://api.football-data-api.com/league-tables?key=db01a476916110021e97e90f1ecdb8f9c5574ded43012b2f24304e34ba394bbe&season_id={season_id}'

        logger.debug(f"URL gerada: {table_url}")

        table_response = requests.get(table_url)

        logger.debug(f"Status da API: {table_response.status_code}")
        logger.debug(f"Resposta da API (texto): {table_response.text}")

        if table_response.status_code == 200:
            try:
                league_table = table_response.json().get('data', {}).get('league_table', [])
                logger.debug(f"Dados da tabela recebidos: {league_table}")
            except ValueError:
                logger.error(f"Erro ao decodificar JSON para season_id {season_id}")
                return JsonResponse({'error': 'Resposta inválida da API.'})
        else:
            logger.error(f"Falha na requisição da API para season_id {season_id}")
            return JsonResponse({'error': 'Falha ao obter dados da API.'})

        return JsonResponse({'league_table': league_table})


class PaginaInicialView(TemplateView):
    template_name = 'central/main/desenvolvimento.html'


class RecomendadosView(TemplateView):
    template_name = 'central/main/desenvolvimento.html'


class FavoritosView(TemplateView):
    template_name = 'central/main/desenvolvimento.html'


class ListaJogosView(TemplateView):
    template_name = 'central/main/desenvolvimento.html'


class ListaLigasView(DashboardTemplateView):
    template_name = 'central/main/dashboard.html'


class ListaTimesView(TemplateView):
    template_name = 'central/main/lista_times.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        # Usar a mesma lógica da Lista de Ligas para carregar as ligas e seus season IDs
        league_url = 'https://api.football-data-api.com/league-list?key=db01a476916110021e97e90f1ecdb8f9c5574ded43012b2f24304e34ba394bbe&chosen_leagues_only=true'
        league_response = requests.get(league_url)

        if league_response.status_code == 200:
            league_data = league_response.json().get('data', [])
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
                            break
            context['league_data'] = filtered_leagues
        else:
            context['league_data'] = []

        return context


def get_teams(request, season_id):
    """Função que faz a requisição para obter as equipes de uma liga filtrada"""
    api_key = 'db01a476916110021e97e90f1ecdb8f9c5574ded43012b2f24304e34ba394bbe'

    # Logando o Season ID recebido
    logger.debug(f"Season ID recebido: {season_id}")

    # Corrigindo o season_id (removendo pontos, se houver)
    if '.' in season_id:
        season_id = season_id.replace('.', '')

    # Logando a URL gerada
    teams_url = f'https://api.football-data-api.com/league-teams?key={api_key}&season_id={season_id}&include=stats'
    logger.debug(f"URL gerada: {teams_url}")

    # Fazendo a requisição para obter os times
    response = requests.get(teams_url)

    # Logando o status da API e a resposta
    logger.debug(f"Status da API: {response.status_code}")
    logger.debug(f"Resposta da API (texto): {response.text}")

    if response.status_code == 200:
        try:
            teams_data = response.json().get('data', [])
            logger.debug(f"Dados dos times recebidos: {teams_data}")
            return JsonResponse({'teams': teams_data})
        except ValueError:
            logger.error(f"Erro ao decodificar JSON para season_id {season_id}")
            return JsonResponse({'error': 'Resposta inválida da API.'}, status=500)
    else:
        logger.error(f"Erro ao buscar os times para o season_id {season_id}")
        return JsonResponse({'error': 'Erro ao obter os times da API.'}, status=500)
