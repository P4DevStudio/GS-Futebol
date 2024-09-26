from django.shortcuts import render
import requests
from django.http import JsonResponse
from django.views.generic import TemplateView

class DashboardTemplateView(TemplateView):
    template_name = 'central/main/dashboard.html'

# Função para buscar dados da API e passar para o frontend
def dashboard_view(request):
    url = "https://api.footystats.org/league-table"
    params = {
        "key": "test85g57",  # Sua chave da API FootyStats
        "league_id": 3252,   # ID da Liga Brasileira
        "season_id": 2023    # Temporada 2023
    }

    try:
        response = requests.get(url, params=params)
        response.raise_for_status()
        data = response.json().get('data', [])  # Capturando os dados da tabela da liga
        # Enviando os dados diretamente para o template
        return render(request, 'central/main/dashboard.html', {'league_data': data})
    except requests.exceptions.RequestException as e:
        return render(request, 'central/main/dashboard.html', {'error': str(e)})
