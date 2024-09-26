from django import template
from datetime import datetime

register = template.Library()

@register.filter(name='urlpathclean')
def urlpathclean(value):
	return value.split('&page=')[0]


@register.filter(name='splitword')
def splitword(value):
	return value.split(' ')[0]


@register.filter(name='hidemiddlename')
def hidemiddlename(value):
	return str(value[:10]) + '*****' + str(value[-10:])


@register.filter(name='hidemiddletoken')
def hidemiddlename(value):
	return str(value[:3]) + '***' + str(value[-3:])

@register.filter(name='has_group')
def has_group(user, group_name):
    return user.groups.filter(name=group_name).exists()

@register.filter(name='days_since')
def days_since(date2, date1=None):
    if not date1:
        date1 = datetime.now()  # Pega a data e hora atuais
    if not date2:
        return ''
    # Assumindo que date2 é uma data, você pode querer garantir que esteja trabalhando apenas com a parte da data
    date1 = date1.date() if hasattr(date1, 'date') else date1
    date2 = date2.date() if hasattr(date2, 'date') else date2
    diff = date2 - date1
    return diff.days

# Usar {% load template_filters_extras %} no exemplo.html para funcionar (template_filters_extras é o nome do arquivo)