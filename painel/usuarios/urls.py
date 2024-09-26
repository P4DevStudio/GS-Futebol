from . import views
from django.urls import path
# from usuarios.views import LoginView #, RegisterView
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('login/', views.LoginView.as_view(), name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),

    # GERENTE
    path('manager/dashboard/', views.ManagerDashboardTemplateView.as_view(), name="ManagerDashboardTemplateView"),
    path('manager/accounts/', views.ManagerUserListView.as_view(), name='ManagerUserListView'),
    # path('manager/rooms/', views.RoomListView.as_view(), name='RoomListView'),
    # path('manager/invoices/', views.InvoicesListView.as_view(), name='InvoicesListView'),
    # path('manager/calculate-invoice/', views.CalculateInvoiceListView.as_view(), name='CalculateInvoiceListView'),
    
    # ==> Páginas desativadas, logins devem ser criados através das vendas via plataformas digitais.
    # path('register/', views.RegisterView.as_view(), name='register'),

    # path('reset-password/', auth_views.PasswordResetView.as_view(template_name='central/authentication/reset_password.html'), name='password_reset'),
    # path('reset-password-email-sended/', auth_views.PasswordResetDoneView.as_view(template_name='central/authentication/reset_password_email_sended.html'), name='password_reset_done'),
    # path('reset/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(template_name='central/authentication/reset_password_confirm_password.html'), name='password_reset_confirm'),
    # path('reset-password-success/', auth_views.PasswordResetCompleteView.as_view(template_name='central/authentication/reset_password_complete.html'), name='password_reset_complete'),
]
