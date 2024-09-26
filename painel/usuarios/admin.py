from django.contrib import admin
from usuarios import models
from django.contrib.auth.admin import UserAdmin
from usuarios.forms import RegisterForm, CustomUserChangeForm
from django.utils.html import format_html
import datetime
from django.contrib.sites.shortcuts import get_current_site
from django.contrib import messages


@admin.register(models.CustomUser)
class CustomUserAdmin(UserAdmin):
	# add_form = RegisterForm
	form = CustomUserChangeForm
	model = models.CustomUser
	list_display = (
		'username',
		'first_name',
		'phone_tag',
		'get_due_date',
		'get_due_date_status',
		'is_active',
		'is_staff',
	)
	list_filter = ('is_staff', 'is_active', 'plan_control')
	fieldsets = (
		('Dados de acesso', {'fields': ('password', 'username', 'email', 'site'),},),
		('Informações pessoais', {'fields': (
			'first_name', 
			'last_name', 
			'real_email',
			'country_prefix', 
			'phone', 
			'document_to_tax',
		),},),
		('Assinatura', {'fields': ('plan_control', 'plan', 'due_date', 'price', 'paid_by', 'observation'),},),
		('Marketing', {'fields': ('allows_marketing', 'alert_payment_whatsapp', 'alert_payment_email'),},),
		('Permissões', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions'),},),
		('Datas importantes', {'fields': ('last_login', 'date_joined', 'delete_sessions'),},),
	)
	search_fields = ('email', 'first_name')
	ordering = ('-date_joined',)

	# def save_model(self, request, obj, form, change):
	# 	if not obj.id: # and not request.user.is_superuser
	# 		obj.site = get_current_site(request)
	# 		print('CustomUserAdmin - Salvei o usuário com relação para o site:', obj.site)
	# 	super().save_model(request, obj, form, change)

	# def save_model(self, request, obj, form, change):
	# 	if form.is_valid():
	# 		super().save_model(request, obj, form, change)
	# 	else:
	# 		# Printar os erros no console
	# 		print("Form errors:", form.errors)
			
	# 		# Você também pode exibir uma mensagem no Django Admin
	# 		for field, errors in form.errors.items():
	# 			for error in errors:
	# 				messages.error(request, f"Erro no campo {field}: {error}")

	def get_due_date(self, o):
		try:
			return o.due_date.strftime("%d/%m/%Y")
		except:
			return '-'
	get_due_date.short_description = 'Vencimento'
	get_due_date.admin_order_field = 'due_date'

	def get_due_date_status(self, o):
		if o.plan == 'Vitalicio':
			return format_html(f'<span style="text-align:center;font-size:11px;display:inline-block;background-color:#2c8ad9;color:#fff;padding:3px;margin-top:2px;margin-bottom:2px;border-radius:2px;">Vitalicio</span>')
		
		if not o.due_date:
			return '-'

		if o.due_date <= datetime.date.today():
			return format_html(f'<span style="text-align:center;font-size:11px;display:inline-block;background-color:#f48b03;color:#fff;padding:3px;margin-top:2px;margin-bottom:2px;border-radius:2px;">Venceu</span>')
		else:
			return format_html(f'<span style="text-align:center;font-size:11px;display:inline-block;background-color:#25d366;color:#fff;padding:3px;margin-top:2px;margin-bottom:2px;border-radius:2px;">Vigente</span>')
	get_due_date_status.short_description = 'Status'
	get_due_date_status.admin_order_field = 'due_date'

	def phone_tag(self, o):
		if o.phone:
			o.phone = o.phone.replace('(', '').replace(')', '').replace(' ', '').replace('-', '')
			return format_html(f'<a href="https://web.whatsapp.com/send?phone=55{o.phone}" target="_blank" style="text-align:center;font-size:11px;display:inline-block;background-color:#25d366;color:#fff;padding:3px;margin-top:2px;margin-bottom:2px;border-radius:2px;text-decoration: none;">{o.phone}</a>')
		else:
			return format_html(f'<span>-</span>')
	phone_tag.short_description = 'Whatsapp'

	class Media:
		js = [
			'js/jquery-3.5.1.min.js',
			'js/jquery.mask.min.js',
			'js/set_mask_escobar.js',
		]

	def save_model(self, request, obj, form, change):
		print('Post succeeded')
		obj.save()


@admin.register(models.UsersManager)
class UsersManagerAdmin(admin.ModelAdmin):
	list_display = ('relation_user',)


@admin.register(models.WhiteLabel)
class WhiteLabelAdmin(admin.ModelAdmin):
	list_display = ('relation_manager',)


@admin.register(models.EmailSettings)
class EmailSettingsAdmin(admin.ModelAdmin):
	list_display = ('email_sender', 'site',)