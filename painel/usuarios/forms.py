from django.contrib.auth.forms import UserCreationForm, AuthenticationForm, UserChangeForm
from django.contrib.auth import get_user_model
from django import forms
from crispy_forms.layout import HTML, Submit, Layout, Row, Column
from crispy_forms.helper import FormHelper
from django.core.exceptions import ValidationError


class LoginForm(AuthenticationForm):
	username = forms.CharField(label='E-mail')
	
	def __init__(self, *args, **kwargs):
		super().__init__(*args, **kwargs)
		self.fields['username'].widget.attrs.update({'autofocus': 'autofocus'})


class RegisterForm(UserCreationForm):
	username = forms.EmailField(label='E-mail', widget=forms.EmailInput(attrs={'autocomplete': 'username'}))
	phone = forms.CharField(label='DDD + Celular')
	first_name = forms.CharField(label='Qual seu nome?')
	
	class Meta:
		model = get_user_model()
		fields = ('first_name', 'username', 'phone', 'password1', 'password2')

	def __init__(self, *args, site=None, whitelabel=None, **kwargs):
		self.site = site
		self.whitelabel = whitelabel
		super().__init__(*args, **kwargs)
		# Verifique a opção ask_register_phone e adicione ou remova o campo de telefone
		# if self.whitelabel:
		# 	if self.whitelabel.ask_register_name:
		# 		self.fields['first_name'].required = True
		# 	else:
		# 		del self.fields['first_name']

		# 	if self.whitelabel.ask_register_phone:
		# 		self.fields['phone'].required = True
		# 	else:
		# 		del self.fields['phone']
		
		# Focus
		if 'first_name' in self.fields:
			self.fields['first_name'].widget.attrs.update({'autofocus': 'autofocus'})
		elif 'username' in self.fields:
			self.fields['username'].widget.attrs.update({'autofocus': 'autofocus'})

	def clean_username(self):
		username = self.cleaned_data.get('username')
		if get_user_model().objects.filter(username=username, site=self.site).exists():
			raise ValidationError('Um usuário com esse e-mail já existe para este site.')
		return username


class CustomUserChangeForm(UserChangeForm):
	class Meta:
		model = get_user_model()
		fields = ('username',)

