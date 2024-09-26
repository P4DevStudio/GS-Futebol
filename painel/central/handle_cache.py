from django.core.cache import cache
from usuarios import models


def get_whitelabel_for_site(site):
    cache_key = f'whitelabel_{site.pk}'
    whitelabel = cache.get(cache_key)
    if not whitelabel:
        try:
            whitelabel = models.WhiteLabel.objects.select_related('relation_manager').get(site=site)
            cache.set(cache_key, whitelabel, timeout=60*60)  # Cache por 1 hora
        except models.WhiteLabel.DoesNotExist:
            return None
    return whitelabel


def invalidate_whitelabel_cache(site):
    cache_key = f'whitelabel_{site.pk}'
    cache.delete(cache_key)
