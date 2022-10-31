from asyncio.windows_events import NULL
from cgi import test
from cmath import log
from errno import ESTALE
from importlib.resources import path
from multiprocessing import context
from turtle import title
from typing import List
from unicodedata import category
from unittest import result
from xml.etree.ElementTree import Comment
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from sqlalchemy import Integer
from .models import *



def index(request):
    return render(request, "index.html")

def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("homepage"))
        else:
            return render(request, "login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("homepage"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "register.html", {
                "message": "Email or Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("homepage"))
    else:
        return render(request, "register.html")




def category():
    categories = Job.objects.values_list('category', flat=True).distinct()
    return {"categories" : categories}

@login_required(login_url="/login")
def profile(request):
    username = request.user.username
    if request.method == "POST":
        if request.user.is_company:
            description = request.POST["profile_description"]
            User.objects.filter(username = username).update(description = description)
        else:
            first_name = request.POST["first_name"]
            last_name = request.POST["last_name"]
            email = request.POST["email"]
            phone_number = request.POST["phone_number"]
            date_of_birth = request.POST["date_of_birth"]
            if not date_of_birth:
                User.objects.filter(username = username).update(
                        first_name = first_name,
                        last_name = last_name,
                        email = email,
                        phone_number = phone_number
                    )
            else:
                User.objects.filter(username = username).update(
                    first_name = first_name,
                    last_name = last_name,
                    email = email,
                    phone_number = phone_number,
                    date_of_birth = date_of_birth
                )
    user = User.objects.filter(username = username)
    return render(request, "profile.html", {"user": user[0]})