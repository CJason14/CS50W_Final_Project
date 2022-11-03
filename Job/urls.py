from unicodedata import name
from django.urls import path

from . import views

from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path("", views.index, name="homepage"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("profile", views.profile, name="profile"),
    path("chat", views.chat, name="chat"),
    path("jobs", views.jobs, name="jobs")
]