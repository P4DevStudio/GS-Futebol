from django.urls import path
from . import views
from .views import DashboardTemplateView


urlpatterns = [
    path('/admin/', views.index, name='index'),  # Página inicial
    path('dashboard/', DashboardTemplateView.as_view(), name='DashboardTemplateView'),
]