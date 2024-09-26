from django.contrib.auth.mixins import UserPassesTestMixin
from django.shortcuts import redirect


class GroupRequiredMixin(UserPassesTestMixin):
    group_required = None  # Defina isso na sua view

    def test_func(self):
        user = self.request.user
        return user.is_authenticated and user.groups.filter(name=self.group_required).exists()

    def handle_no_permission(self):
        # Redirecione para uma página de login ou uma página de "sem permissão"
        return redirect('DashboardTemplateView')
