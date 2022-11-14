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
    path("jobs", views.jobs, name="jobs"),
    path("settings", views.settings, name="settings"),
    path("messages", views.messages, name="messages"),
    path("contacts", views.contacts, name="contact"),
    path("profile_picture", views.getprofilepicture, name="profile_picture"),
    path("new_job", views.new_job, name="new_job"),
    path("applications", views.applications, name="applications"),
    path("application_answer", views.applications_form, name="application_answer"),
    path("getuserdata", views.getuserdata, name="getuserdata"),
    path("apply", views.apply, name="apply")
]