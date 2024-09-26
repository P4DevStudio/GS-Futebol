from django.views.generic import ListView, TemplateView, UpdateView, DetailView, DeleteView, CreateView, FormView
from django.http import JsonResponse, HttpResponse, Http404, HttpResponseRedirect, HttpResponseForbidden
from django.contrib.auth.mixins import LoginRequiredMixin
from django.utils.translation import gettext as _
from core import models
from django.urls import reverse_lazy
from django.contrib import messages
from core import forms
from django.views.decorators.http import require_http_methods
import json
from django.shortcuts import get_object_or_404
from django.shortcuts import render


def index(request):
    return render(request, 'index.html')


class DashboardTemplateView(TemplateView):
    template_name = 'dashboard.html'