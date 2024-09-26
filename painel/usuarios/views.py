import traceback
from django.urls import reverse_lazy
from django.shortcuts import render, get_object_or_404
from django.contrib.auth import views as auth_views
from . forms import LoginForm, RegisterForm
from django.contrib.auth import get_user_model, login, authenticate
from django.views.generic import CreateView, UpdateView, ListView, TemplateView
from django.contrib import messages
from django.contrib.sites.shortcuts import get_current_site
from .models import WhiteLabel, UsersManager
from central.handle_cache import get_whitelabel_for_site
from django.contrib.auth.mixins import LoginRequiredMixin
from django.utils.translation import gettext as _
from usuarios.mixins import GroupRequiredMixin
from django.db.models import Count, Q, Sum, IntegerField
from django.db.models.functions import Cast


# GERENTES
class ManagerDashboardTemplateView(LoginRequiredMixin, TemplateView):
	template_name = "managers/dashboard.html"

	def get_context_data(self, **kwargs):          
		context = super().get_context_data(**kwargs)                     
		context['session_title'] = _('Destaques')
		return context


class ManagerUserListView(LoginRequiredMixin, GroupRequiredMixin, ListView):
	model = get_user_model()
	paginate_by = 200
	paginate_orphans = 3
	template_name = 'managers/list.html'
	context_object_name = 'lista'
	group_required = 'GERENTE'

	def get_queryset(self):
		if hasattr(self, '_cached_queryset'):
			return self._cached_queryset
		# Valida o site relacionado ao manager, se não conferir retorna vazio.
		site = get_current_site(self.request)
		if self.request.user.site != site:
			return self.model.objects.none()
		
		client = self.request.GET.get('_q', None)
		only_activies = self.request.GET.get('ativos', None)
		if only_activies:
			queryset = self.model.objects.filter(site=site, is_active=True).order_by('-date_joined')
			if client:
				queryset = queryset.filter(email__icontains=client)
			self._cached_queryset = queryset
		else:
			queryset = self.model.objects.filter(site=site).order_by('-date_joined')
			if client:
				queryset = queryset.filter(email__icontains=client)
			self._cached_queryset = queryset
			return queryset
		return self._cached_queryset
		
	def get_context_data(self, **kwargs):          
		context = super().get_context_data(**kwargs)
		# context['total_clients'] = self._cached_queryset.count()
		# context['total_rooms'] = self._cached_queryset.aggregate(total_n_rooms=Sum(Cast('n_rooms', IntegerField())))['total_n_rooms'] or 0         
		return context


class LoginView(auth_views.LoginView):
	form_class = LoginForm
	template_name = 'central/authentication/login_page.html'

	def get_context_data(self, **kwargs):          
		context = super().get_context_data(**kwargs)
		current_site = get_current_site(self.request)
		whitelabel = get_whitelabel_for_site(current_site)
		context['whitelabel'] = whitelabel
		return context


class RegisterView(CreateView):
	model = get_user_model()
	form_class = RegisterForm
	template_name = 'central/authentication/register_page.html'
	success_url = reverse_lazy('')

	def dispatch(self, request, *args, **kwargs):
		# Obtenha o site e a empresa uma vez e armazene-os como variáveis de instância
		self.current_site = get_current_site(request)
		# self.whitelabel = get_object_or_404(WhiteLabel, site=self.current_site)
		self.whitelabel = get_whitelabel_for_site(self.current_site)
		return super().dispatch(request, *args, **kwargs)

	def get_form_kwargs(self):
		kwargs = super().get_form_kwargs()
		kwargs['site'] = self.current_site
		kwargs['whitelabel'] = self.whitelabel
		return kwargs

	def form_valid(self, form):
		self.object = form.save(commit=False)
		self.object.site = self.current_site
		self.object.save()
		to_return = super().form_valid(form)
		login(self.request, self.object)
		messages.success(self.request, 'Cadastro realizado com sucesso!')
		return to_return
	
	def get_context_data(self, **kwargs):          
		context = super().get_context_data(**kwargs)
		current_site = get_current_site(self.request)
		whitelabel = get_whitelabel_for_site(current_site)
		context['whitelabel'] = whitelabel
		return context