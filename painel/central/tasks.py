from celery import shared_task
from django.core.mail import send_mail
from django.shortcuts import render
from django.conf import settings
from telegram import Bot
# from telegram.ext import Updater


"""
APP criado para centralizar métodos universais, genéricos, que servirão para diversos apps
"""

# Método de tratamento de erros e envio par ao telegram channel
# Método de envio de e-mails transacionais


@shared_task
def send_email_task(subject, message, from_email, recipient_list):
    send_mail(subject, message, from_email, recipient_list)


@shared_task
def send_error_to_telegram_task(message_content):
    try:
        bot_token = settings.TOKEN_BOT_ERRORS
        chat_id = settings.ID_GROUP_ERRORS
        # updater = Updater(bot_token)
        # message = updater.bot.send_message(
        #     chat_id=chat_id,
        #     text=message_content,
        # )
        bot = Bot(token=bot_token)
        bot.send_message(chat_id=chat_id, text=message_content)
        print('==> Sucesso! Erro enviado para telegram channel.')
    except Exception as e:
        print(f'==> Falha! Erro não enviado para telegram channel. {e}')