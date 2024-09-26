import uuid
from django.db import models
from django.core.validators import MinLengthValidator, MaxValueValidator
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.contrib.sites.models import Site
from central.choices import CHOICES_COUNTRY_PREFIX
from central.generics import LowercaseEmailField, LowercaseCharField
from colorfield.fields import ColorField
from central.handle_cache import invalidate_whitelabel_cache


class CustomUser(AbstractUser):
	PLAN_TYPES = [
		('Mensal', _('Mensal')),
		('Trimestral', _('Trimestral')),
		('Semestral', _('Semestral')),
		('Anual', _('Anual')),
		('Vitalicio', _('Vitalicio')),
	]
	PLAN_CONTROL = [
		('Hotmart', 'Hotmart'),
		('Braip', 'Braip'),
		('Stripe', 'Stripe'),
		('Avulso', 'Avulso'),
	]

	cod = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
	site = models.ForeignKey(Site, on_delete=models.CASCADE, null=True, blank=True)
	username = LowercaseCharField(_('username'), max_length=150, validators=[UnicodeUsernameValidator()])
	email = LowercaseEmailField(_('email address'))
	country_prefix = models.CharField(_('DDI País'), choices=CHOICES_COUNTRY_PREFIX, default='55', max_length=5)
	phone = models.CharField(_('Celular'), max_length=20, null=True, blank=True)
	plan = models.CharField(_('Plano'), choices=PLAN_TYPES, max_length=50, default='Mensal')
	due_date = models.DateField(_('Próximo Vencimento'), null=True, blank=True)
	price = models.DecimalField(_('Valor Plano R$'), max_digits=10, decimal_places=2, default=100)
	paid_by = models.CharField(_('Pagamento via'), max_length=254, default='Pix Banco Inter Empresa', null=True, blank=True, help_text=_('Pix, Avulso Stripe, Mercado Pago, Paypal, Cripto, Conta na casa de aposta'))
	plan_control = models.CharField(_('Controle de Assinatura'), choices=PLAN_CONTROL, max_length=50, default='Avulso')
	observation = models.TextField(_('Observações'), null=True, blank=True)
	delete_sessions = models.BooleanField(_('Deletar Sessões'), default=False)
	real_email = models.EmailField(_('E-mail para contato'), null=True, blank=True)
	document_to_tax = models.CharField('CPF/CNPJ', max_length=50, null=True, blank=True)
	allows_marketing = models.BooleanField(_('Aceita receber promoções/marketing'), default=True)
	alert_payment_whatsapp = models.BooleanField(_('Cobrar via Whatsapp API'), default=False)
	alert_payment_email = models.BooleanField(_('Cobrar via Email'), default=True)
	
	def clean(self):
		self.email = self.username

	class Meta:
		unique_together = ('email', 'site', 'username',)
		verbose_name = 'Usuário'
		verbose_name_plural = 'Usuários'


class UsersManager(models.Model):
	relation_user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, verbose_name='Usuário relacionado')
	access_token = models.CharField(_('Token de Acesso Gerente'), default=uuid.uuid4, max_length=100, help_text='Será setado automaticamente com o mesmo COD do usuário relacionado')
	observation = models.TextField(_('Observações'), null=True, blank=True)
	created_in = models.DateTimeField(_('Criado em'), auto_now_add=True)
	modified_in = models.DateTimeField(_('Modificado em'), auto_now=True)

	class Meta:
		verbose_name = _('Gerente')
		verbose_name_plural = _('Gerentes')

	def save(self, *args, **kwargs):
		self.access_token = self.relation_user.cod
		super().save(*args, **kwargs)

	def __str__(self):
		return str(self.relation_user.first_name)


class WhiteLabel(models.Model):
	whitelabel_cod = models.UUIDField('UUID', default=uuid.uuid4, editable=False)
	relation_manager = models.OneToOneField(UsersManager, on_delete=models.CASCADE, verbose_name='Proprietário')
	site = models.OneToOneField(Site, on_delete=models.CASCADE)
	name = models.CharField('Nome do White Label', max_length=150)
	logo_image = models.ImageField('Logomarca', null=True, blank=True)
	favicon_image = models.ImageField('Favicon', null=True, blank=True)
	slogan = models.CharField('Slogan', null=True, blank=True, max_length=150)
	primary_color = ColorField('Cor Primária', default='#25d366')
	secondary_color = ColorField('Cor Secundária', default='#ffffff')
	created_in = models.DateTimeField(_('Criado em'), auto_now_add=True)
	modified_in = models.DateTimeField(_('Modificado em'), auto_now=True)

	def save(self, *args, **kwargs):
		super().save(*args, **kwargs)
		# Invalida o cache quando o WhiteLabel for salvo
		invalidate_whitelabel_cache(self.site)
	
	class Meta:
		verbose_name = 'White Label'
		verbose_name_plural = 'White Labels'

	def __str__(self):
		return str(self.name)


class EmailSettings(models.Model):
	site = models.OneToOneField(Site, on_delete=models.CASCADE)
	email_sender = models.EmailField('E-mail disparador')
	host = models.CharField('Host', default='smtp.gmail.com', max_length=255)
	port = models.PositiveSmallIntegerField('Porta', default=465, help_text='587 ou 465')
	use_tls = models.BooleanField(default=False, verbose_name='Use TLS?')
	use_ssl = models.BooleanField(default=True, verbose_name='Use SSL?')
	password = models.CharField('Senha do e-mail', max_length=255)
	# Acesso
	email_access_subject = models.CharField('E-mail de Acesso - Assunto', max_length=255, null=True, blank=True)
	email_access_body = models.TextField('E-mail de Acesso - Conteúdo', null=True, blank=True, help_text='Palavras chaves disponíveis: {first_name}, {access}, {password}')
	# Cancelamento
	email_canceled_subject = models.CharField('E-mail de Cancelamento - Assunto', null=True, blank=True, max_length=255)
	email_canceled_body = models.TextField('E-mail de Cancelamento - Conteúdo', null=True, blank=True)

	def __str__(self):
		return str(self.email_sender)
	
	class Meta:
		verbose_name = 'Email'
		verbose_name_plural = 'E-mails'