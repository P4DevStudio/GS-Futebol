import random
import string
from django.db import models

"""
- A classe DefaultDict estende a classe dict e redefine o método __missing__ para retornar a chave original envolta em chaves ({}) quando a chave não for encontrada. 
Isso evita que um erro KeyError seja levantado e mantém o texto do template original.

- O método format_map é utilizado em vez de format para aplicar as substituições. 
format_map permite que um dicionário personalizado (como DefaultDict) seja usado para fazer as substituições.

"""
class DefaultDict(dict):
    def __missing__(self, key):
        return '{' + key + '}'
    

def generate_password():
    # Define o conjunto de caracteres permitidos, excluindo os caracteres indesejados
    excluded_characters = 'iolIOL12oqQ0'
    allowed_characters = ''.join(
        c for c in (string.ascii_letters + string.digits) if c not in excluded_characters
    )
    # Garante pelo menos uma letra e um dígito dos caracteres permitidos
    senha = [
        random.choice(string.ascii_letters.replace('i', '').replace('I', '').replace('l', '').replace('L', '').replace('o', '').replace('O', '') + 
		string.digits.replace('1', '').replace('2', '').replace('0', '')),
        random.choice(string.digits.replace('1', '').replace('2', '').replace('0', ''))
    ]
    # Preenche a senha até ter 8 caracteres
    senha += random.choices(allowed_characters, k=6)
    random.shuffle(senha) # Embaralha
    return ''.join(senha).upper()


class LowercaseEmailField(models.EmailField):
	def to_python(self, value):
		value = super(LowercaseEmailField, self).to_python(value)
		if isinstance(value, str):
			return value.lower()
		return value


class LowercaseCharField(models.CharField):
	def to_python(self, value):
		value = super(LowercaseCharField, self).to_python(value)
		if isinstance(value, str):
			return value.lower()
		return value