import logging
from django.http import JsonResponse
from django.shortcuts import render
from django.views.generic import TemplateView
import requests
from django.views import View
from django.core.cache import cache
from dotenv import load_dotenv, find_dotenv
import os

# Configurando o logger
logger = logging.getLogger(__name__)
load_dotenv(find_dotenv())
FOOTBALL_API_KEY = os.getenv('FOOTBALL_API_KEY')

season_ids_used = []
class ListaLigaView(View):
    default_leagueid = 11321  # Default league ID

    def get(self, request, leagueid=None):
        if leagueid is None:
            leagueid = self.default_leagueid
        # Example API URL with dynamic leagueid
        api_url = f'https://api.football-data-api.com/league-teams?key={FOOTBALL_API_KEY}&season_id={leagueid}'
        cache_key = f"league_data_{leagueid}"  # Cache key based on league ID
        cache_timeout = 60 * 15  # 15 minutes cache timeout

        # Check if the response is already cached
        league_table = cache.get(cache_key)
        if not league_table:
            # Make the request to the external API
            response = requests.get(api_url)
            # Check if the request was successful (HTTP status 200)
            if response.status_code == 200:
                api_data = response.json().get('data', [])  # Extract the 'data' key from the response

                # Sort the data by table_position
                league_table = sorted(api_data, key=lambda x: x.get('table_position', 0))
                # Cache the API response
                cache.set(cache_key, league_table, cache_timeout)
            else:
                league_table = None

            # Pass the data and leagueid to the template
        context = {
            'leagueid': leagueid,     # Pass the leagueid
            'league_table': league_table  # Pass the league table data
        }
        return render(request, 'central/main/lista_ligas.html', context)

class ListaTimesView(View):
    default_time_id = 59  
    def get(self, request, timeid=None):
        if timeid is None:
            timeid = self.default_time_id
        api_url = f'https://api.football-data-api.com/team?key={FOOTBALL_API_KEY}&team_id={timeid}&include=stats'
        cache_key = f"timedata{timeid}"
        cache_timeout =  0  # 15 minutes cache timeout

        filtered_time_table = cache.get(cache_key)
        #if not filtered_time_table:
        response = requests.get(api_url)

        if response.status_code == 200:
            api_data = response.json().get('data', []) 
            time_table = sorted(api_data, key=lambda x: x.get('table_position', 0))
            logger.debug(time_table)
            filtered_time_table = [
        {
            'season': team.get('season'),
            'competition_id': team.get('competition_id'),
            'suspended_matches': team.get('suspended_matches'),
            'homeAttackAdvantage': team.get('homeAttackAdvantage'), 
            'homeDefenceAdvantage': team.get('homeDefenceAdvantage'), 
            'homeOverallAdvantage': team.get('homeOverallAdvantage'), 
            'seasonGoals_overall': team.get('seasonGoals_overall'), 
            'seasonConceded_overall': team.get('seasonConceded_overall'), 
            'seasonGoalsTotal_overall': team.get('seasonGoalsTotal_overall'), 
            'seasonGoalsTotal_home': team.get('seasonGoalsTotal_home'), 
            'seasonGoalsTotal_away': team.get('seasonGoalsTotal_away'), 
            'seasonScoredNum_overall': team.get('seasonScoredNum_overall'), 
            'seasonScoredNum_home': team.get('seasonScoredNum_home'), 
        }
        for team in time_table
    ]
            cache.set(cache_key, filtered_time_table, cache_timeout)
        else:
            time_table = None
        context = {
            'timeid': timeid,    
            'competitions': filtered_time_table 
        }
        return render(request, 'central/main/lista_times.html', context)
    
class TodayMatchesView(View):

    def get(self, request):
        api_url = f'https://api.football-data-api.com/todays-matches?key={FOOTBALL_API_KEY}'
        cache_key = f"TodayMatches"  
        cache_timeout = 60 * 15  # 15 minutes cache timeout

        match_data = cache.get(cache_key)
        if not match_data:
            response = requests.get(api_url)
            if response.status_code == 200:
                match_data = response.json()['data']
                cache.set(cache_key, match_data, cache_timeout)
            else:
                match_data = None
        context = {
            'matches': match_data,
        }
        return render(request, 'central/main/jogos_dia.html', context)
    