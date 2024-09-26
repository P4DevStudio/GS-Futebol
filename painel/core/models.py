import uuid
import auto_prefetch
from django_currentuser.db.models import CurrentUserField
from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth import get_user_model


class Base(models.Model):
	created_by = auto_prefetch.ForeignKey(get_user_model(), on_delete=models.CASCADE, verbose_name='Criado por', editable=False)
	created_in = models.DateTimeField('Criado em', auto_now_add=True, editable=False)
	modified_in = models.DateTimeField('Modificado em', auto_now=True, editable=False)

	class Meta:
		abstract = True
