import boto3
from django.db import models
from django.db.models.signals import pre_save, post_delete
from django.dispatch import receiver
from django.conf import settings
from usuarios import models as usuarios_models


# ====> Esse arquivo precisa ser importado através do método ready em apps.py pra funcionar.

def delete_image(image):
    if not image:
        return

    # Cria um cliente S3
    s3 = boto3.client('s3',
		aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
		aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
    )
    
    # Deleta a imagem no S3
    s3.delete_object(Bucket=settings.AWS_STORAGE_BUCKET_NAME, Key=image.name)


@receiver(pre_save, sender=usuarios_models.WhiteLabel)
def delete_old_image_on_update(sender, instance, **kwargs):
    if not instance.pk:
        # Se a instância não tiver um ID ainda (i.e., é uma nova instância), não fazer nada
        return
    try:
        # Obtém a instância existente do banco de dados
        old_instance = sender.objects.get(pk=instance.pk)
    except sender.DoesNotExist:
        return

    # Para cada campo ImageField no modelo, verifica se ele foi alterado
    for field in instance._meta.fields:
        if isinstance(field, models.ImageField):
            old_image = getattr(old_instance, field.name)
            new_image = getattr(instance, field.name)

            if old_image and (old_image != new_image):
                delete_image(old_image)


@receiver(post_delete, sender=usuarios_models.WhiteLabel)
def delete_images_from_s3(sender, instance, **kwargs):
    # Itera sobre todos os campos do modelo
    for field in instance._meta.fields:
        if isinstance(field, models.ImageField):
            # Obtém o nome do arquivo no S3
            image = getattr(instance, field.name)
            if image:
                delete_image(image)
