from cgi import test
from cmath import log
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
            Uniquecheck.objects.create(
                email = email
            )
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

def profile(request):
    pass

def company(request):
    pass