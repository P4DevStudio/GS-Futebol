# aplicativo/celery.py
from __future__ import absolute_import, unicode_literals
import os
from celery import Celery

# Defina o módulo de configuração do Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'aplicativo.settings')

# Crie a instância do Celery
app = Celery('aplicativo')

# Usar uma string aqui significa que o worker não precisa serializar
# o objeto de configuração em cada tarefa
app.config_from_object('django.conf:settings', namespace='CELERY')

# Descobrir tarefas assíncronas em todos os apps Django configurados
app.autodiscover_tasks()

@app.task(bind=True)
def debug_task(self):
    print(f'Request: {self.request!r}')