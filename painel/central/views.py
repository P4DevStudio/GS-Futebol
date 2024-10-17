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
        # Captura o season_id enviado via AJAX
        season_id = request.POST.get('season_id')

        # Log do season_id capturado
        logger.debug(f"Season ID recebido: {season_id}")

        # Salva o season_id no array para acompanhamento
        if season_id not in season_ids_used:
            season_ids_used.append(season_id)

        # URL da tabela da liga
        table_url = f'https://api.football-data-api.com/league-tables?key=db01a476916110021e97e90f1ecdb8f9c5574ded43012b2f24304e34ba394bbe&season_id={season_id}'

        # Log da URL gerada
        logger.debug(f"URL gerada: {table_url}")

        # Fazendo a requisição à API
        table_response = requests.get(table_url)

        # Log da resposta da API
        logger.debug(f"Status da API: {table_response.status_code}")
        logger.debug(f"Resposta da API (texto): {table_response.text}")

        # Verificar se a resposta é válida e contém dados JSON
        if table_response.status_code == 200:
            try:
                league_table = table_response.json().get('data', {}).get('league_table', [])
                logger.debug(f"Dados da tabela recebidos: {league_table}")
            except ValueError:
                # Erro ao tentar decodificar JSON, resposta não é um JSON válido
                logger.error(f"Erro ao decodificar JSON para season_id {season_id}")
                return JsonResponse({'error': 'Resposta inválida da API.'})
        else:
            # Se a requisição falhou
            logger.error(f"Falha na requisição da API para season_id {season_id}")
            return JsonResponse({'error': 'Falha ao obter dados da API.'})

        # Retorna os dados da tabela no formato JSON
        return JsonResponse({'league_table': league_table})
