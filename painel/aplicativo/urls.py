from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from django.conf.urls.i18n import i18n_patterns
from django.views.i18n import set_language
from django.http import HttpResponseRedirect



urlpatterns = [
    path('admin/', admin.site.urls),
    path('i18n/', include('django.conf.urls.i18n')), # Gerencia traduções
    path('', lambda request: HttpResponseRedirect('/admin/')),  # Redireciona a raiz para /admin/
]

urlpatterns += i18n_patterns(
    path('', include('core.urls')),  # Definindo o 'core' como página inicial
    path('accounts/', include('usuarios.urls')),  # Evite caminhos vazios duplicados
    path('central/', include('central.urls')),
)

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)