from django.core.management.base import BaseCommand
from django.contrib.sites.models import Site

class Command(BaseCommand):
    help = 'Create a new Site'

    def add_arguments(self, parser):
        parser.add_argument('domain_name', type=str, help='The domain name of the site')
        parser.add_argument('display_name', type=str, help='The display name of the site')

    def handle(self, *args, **kwargs):
        domain_name = kwargs['domain_name']
        display_name = kwargs['display_name']

        site, created = Site.objects.get_or_create(domain=domain_name, name=display_name)

        if created:
            self.stdout.write(self.style.SUCCESS(f'Successfully created site {display_name}'))
        else:
            self.stdout.write(self.style.SUCCESS(f'Site {display_name} already exists'))


