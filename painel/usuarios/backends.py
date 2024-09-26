from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import get_user_model
from django.db.models import Q
from django.contrib.sites.shortcuts import get_current_site


UserModel = get_user_model()

class MultiSiteBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        site = get_current_site(request)
        try:
            user = UserModel.objects.get(email__iexact=username, site=site)
        except UserModel.DoesNotExist:
            return None

        # Se o usuário é um superusuário ou pertence ao site atual, verifica a senha e se o usuário está ativo
        if user.is_superuser or user.site == site:
            if user.check_password(password) and self.user_can_authenticate(user):
                return user