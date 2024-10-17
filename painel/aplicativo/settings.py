import os
import platform
from dotenv import load_dotenv, find_dotenv
from pathlib import Path
import json
import redis


# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Init váriaveis de embiente
load_dotenv(find_dotenv())


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.getenv('SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!
if platform.system() == "Windows":
    DEBUG = True
else:
    DEBUG = (os.getenv('DEBUG', 'False') == 'True')

ALLOWED_HOSTS = json.loads(os.getenv('ALLOWED_HOSTS'))
CSRF_TRUSTED_ORIGINS = json.loads(os.getenv('CSRF_TRUSTED_ORIGINS'))


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # Meus apps
    'core',
    'central',
    'usuarios',
    # 'usuarios.apps.UsuariosConfig',
    # Libs de terceiros
    'django_extensions',  # pip install django-extensions
    'crispy_forms',  # pip install django-crispy-forms
    'crispy_bootstrap5',  # pip install crispy-bootstrap5
    'colorfield', # pip install django-colorfield
    # Amazon AWs S3 Bucket
    'storages', # pip install django-storages & pip install boto3
    # Multi sites
    'django.contrib.sites',
]

# SITE_ID = 1 # Como estamos usando vários sites, essa várivel deve ficar comentada, caso contrário ela irá força tudo para o site id 1.

# Tratar moeda real com mask escobar
DECIMAL_SEPARATOR = ','
USE_THOUSAND_SEPARATOR = True

# New configs
AUTH_USER_MODEL = 'usuarios.CustomUser'
AUTHENTICATION_BACKENDS = [
    'usuarios.backends.MultiSiteBackend',
]


# Crispy Forms bootstrap5
CRISPY_ALLOWED_TEMPLATE_PACKS = "bootstrap5"
CRISPY_TEMPLATE_PACK = 'bootstrap5'

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'django.contrib.sites.middleware.CurrentSiteMiddleware', # Multi sites
    'django_currentuser.middleware.ThreadLocalUserMiddleware', # Para usar CurrentUserField
]

ROOT_URLCONF = 'aplicativo.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'central', 'templates'), os.path.join(BASE_DIR, 'core', 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'aplicativo.wsgi.application'


# Database
# https://docs.djangoproject.com/en/5.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.getenv('POSTGRES_NAME'),
        'USER': os.getenv('POSTGRES_USER'),
        'PASSWORD': os.getenv('POSTGRES_PASSWORD'),
        'HOST': 'localhost',
        'PORT': '5432',
        'OPTIONS': {
            'client_encoding': 'utf8',
        },
    }
}

CACHES = {
    'default': {
        'BACKEND': 'django_redis.cache.RedisCache',
        'LOCATION': f'redis://:{os.getenv('REDIS_PASSWORD')}@{os.getenv('REDIS_HOST')}:{os.getenv('REDIS_PORT')}/1',
        'OPTIONS': {
            'CLIENT_CLASS': 'django_redis.client.DefaultClient',
            # Opcionalmente, você pode adicionar serializadores para melhorar a performance
            # 'SERIALIZER': 'django_redis.serializers.json.JSONSerializer',
        }
    }
}

# Password validation
# https://docs.djangoproject.com/en/5.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.1/topics/i18n/

LANGUAGE_CODE = 'pt-br'
TIME_ZONE = 'America/Sao_Paulo'
USE_I18N = True
USE_L10N = True
USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.1/howto/static-files/

STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'static')

# S3 BUCKETS CONFIG
# Para configurar a aws s3 é instalada duas libs: pip install django-storages > https://django-storages.readthedocs.io/en/latest/ | pip install boto3 > https://pypi.org/project/boto3/
AWS_ACCESS_KEY_ID = os.getenv('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = os.getenv('AWS_SECRET_ACCESS_KEY')
AWS_STORAGE_BUCKET_NAME = os.getenv('AWS_STORAGE_BUCKET_NAME')
AWS_S3_FILE_OVERWRITE = False  # Overrinding files com o mesmo nome
AWS_DEFAULT_ACL = None
DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
# STATICFILES_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage' # Está linha abaixo coloca os arquivos static dentro do armazenamento s3
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage' # Arquivos estáticos puxados do servidor da aplicacão

# Default primary key field type
# https://docs.djangoproject.com/en/5.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

DEBUG_PROPAGATE_EXCEPTIONS = (os.getenv('DEBUG_PROPAGATE_EXCEPTIONS', 'False') == 'True')

# SMTP Configuration
# EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_FROM_USER = os.getenv('EMAIL_MAIN')
EMAIL_HOST = os.getenv('EMAIL_HOST')
EMAIL_PORT = os.getenv('EMAIL_PORT')
EMAIL_USE_SSL = True
EMAIL_USE_TSL = False
EMAIL_HOST_USER = os.getenv('EMAIL_MAIN')
EMAIL_HOST_PASSWORD = os.getenv('EMAIL_PASSWORD')
DEFAULT_FROM_EMAIL = EMAIL_HOST_USER


# Confifgurações de Autentificação
LOGIN_REDIRECT_URL = 'DashboardTemplateView'
LOGOUT_REDIRECT_URL = 'login'
LOGIN_URL = 'login'

# REDIS
REDIS_CONN = redis.Redis(
 	host=os.getenv('REDIS_HOST'),
 	port=os.getenv('REDIS_PORT'),
 	db=0,
 	decode_responses=True,
 	username='default',
 	password=os.getenv('REDIS_PASSWORD'),
)

#Loggs

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
        },
        'file': {
            'class': 'logging.FileHandler',
            'filename': 'debug.log',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['console', 'file'],
            'level': 'DEBUG',  # Nível de log, pode ser INFO, WARNING, ERROR, etc.
        },
        'central': {  # Ajuste o nome do logger se necessário
            'handlers': ['console', 'file'],
            'level': 'DEBUG',
        },
    },
}