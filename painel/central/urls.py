from django.urls import path
from .views import (
    DashboardTemplateView,
    PaginaInicialView,
    RecomendadosView,
    FavoritosView,
    ListaJogosView,
    ListaLigasView,
    ListaTimesView,
    get_teams
)

urlpatterns = [
    path('dashboard/', DashboardTemplateView.as_view(), name='dashboard'),
    path('pagina_inicial/', PaginaInicialView.as_view(), name='pagina_inicial'),
    path('recomendados/', RecomendadosView.as_view(), name='recomendados'),
    path('favoritos/', FavoritosView.as_view(), name='favoritos'),
    path('lista_jogos/', ListaJogosView.as_view(), name='lista_jogos'),
    path('lista_ligas/', ListaLigasView.as_view(), name='lista_ligas'),
    path('lista_times/', ListaTimesView.as_view(), name='lista_times'),
    path('api/times/<int:season_id>/', get_teams, name='get_teams'),
]
