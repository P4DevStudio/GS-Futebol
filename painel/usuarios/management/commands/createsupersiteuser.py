from django.core.management.base import BaseCommand
from django.contrib.sites.models import Site
from django.contrib.auth import get_user_model

class Command(BaseCommand):
    help = 'Create a new superuser and associate it with a site'

    def add_arguments(self, parser):
        parser.add_argument('username', type=str)
        parser.add_argument('email', type=str)
        parser.add_argument('password', type=str)
        parser.add_argument('site_name', type=str)
        parser.add_argument('is_superuser', type=bool)

    def handle(self, *args, **kwargs):
        User = get_user_model()
        username = kwargs['username']
        email = kwargs['email']
        password = kwargs['password']
        site_name = kwargs['site_name']
        is_superuser = kwargs['is_superuser']

        try:
            site = Site.objects.get(name=site_name)
            user = User.objects.create_superuser(username, email, password, site=site, is_superuser=is_superuser)
        except Exception as e:
            self.stdout.write(self.style.SUCCESS(f'Error: {e}\n\nMaybe this erros is not important!\n\n'))
            return

        if user:
            self.stdout.write(self.style.SUCCESS(f'Successfully created user {user}'))
        else:
            self.stdout.write(self.style.SUCCESS(f'User {user} already exists'))

