from django.urls import path
from .views import (
    ListaLigaView,
    ListaTimesView,
    TodayMatchesView
)

urlpatterns = [
    path('lista_ligas/', ListaLigaView.as_view(), name='lista_ligas'),
    path('jogos_dia/', TodayMatchesView.as_view(), name='jogos_dia'),
    path('lista_ligas/<int:leagueid>/', ListaLigaView.as_view(), name='lista_liga_with_id'),
    path('lista_times/<int:timeid>/', ListaTimesView.as_view(), name='lista_times'),
]
