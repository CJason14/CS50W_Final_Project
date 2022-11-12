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
import json
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import  render
from django.core.files.storage import FileSystemStorage
from django.templatetags.static import static
from os import path
import schedule
import time


def index(request):
    if request.user.is_authenticated:
        if request.user.language == "English":
            language = English.objects.all()
        else:
            language = German.objects.all()
    else:
        language = English.objects.all()
    return render(request, "index.html", {"language": language})

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
    if request.user.language == "English":
        language = English.objects.all()
    else:
        language = German.objects.all()
    username = request.user.username
    if request.method == "POST":
        if request.user.is_company:
            description = request.POST["profile_description"]
            User.objects.filter(username = username).update(description = description)
        else:
            my_file=request.FILES.get('file_profile')
            cv_file=request.FILES.get('cv')
            if my_file:
                fss = FileSystemStorage()
                fss.save(my_file.name, my_file)
                User.objects.filter(username = username).update(
                    image = my_file
                )
            if cv_file:
                fss2 = FileSystemStorage()
                fss2.location = fss2.base_location + "CV/"
                fss2.save(cv_file.name, cv_file)
                User.objects.filter(username = username).update(
                    cv = cv_file
                )
                cv_file = NULL

            first_name = request.POST["first_name"]
            last_name = request.POST["last_name"]
            email = request.POST["email"]
            phone_number = request.POST["phone_number"]
            if not request.user.date_of_birth:
                date_of_birth = request.POST["date_of_birth"]
                if date_of_birth:
                    User.objects.filter(username = username).update(
                            first_name = first_name,
                            last_name = last_name,
                            email = email,
                            phone_number = phone_number,
                            date_of_birth = date_of_birth
                        )
                else:
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
                    phone_number = phone_number
                )
    user = User.objects.filter(username = username)
    if not request.user.date_of_birth:
        birthday = ""
    else:
        birthday = user[0].date_of_birth.date()
    userinformation = {
        "user": user[0],
        "birthday": birthday,
        "language": language
    }
    return render(request, "profile.html", userinformation)

def jobs(request):
    jobs = Job.objects.all()
    return JsonResponse([Job.serialize() for Job in jobs], safe=False)

@login_required(login_url="/login")
@csrf_exempt
def settings(request):
    if request.user.language == "English":
        language = English.objects.all()
    else:
        language = German.objects.all()
    if request.method == "PUT":
        data = json.loads(request.body)
        username = request.user.username
        if data["Darkmode"] == "0":
            if request.user.darkmode:
                User.objects.filter(username = username).update(darkmode = 0)
            else:
                User.objects.filter(username = username).update(darkmode = 1)
        if data["Language"]:
            if data["Language"] == "English":
                User.objects.filter(username = username).update(language = "English")
            if data["Language"] == "Deutsch":
                User.objects.filter(username = username).update(language = "German")
        return JsonResponse({"changes": "worked"})
    return render(request, "settings.html", {"language": language})

@login_required(login_url="/login")
def contacts(request):
    username = request.user.username
    if request.user.is_company:
        contacts = Chat.objects.filter(company = username)
        for contact in contacts:
            contact.company = contact.user
    else:
        contacts = Chat.objects.filter(user = username)
    return JsonResponse([contacts_content.serialize() for contacts_content in contacts], safe=False)


@login_required(login_url="/login")
def chat(request):
    if request.user.language == "English":
        language = English.objects.all()
    else:
        language = German.objects.all()
    return render(request, "chat.html", {"language": language})


@login_required(login_url="/login")
@csrf_exempt
def messages(request):
    data = json.loads(request.body)
    recipient = data.get("recipient")
    if request.user.is_company:
        username = request.user.username
        chat_id = Chat.objects.filter(user = recipient, company = username)
        if not chat_id[0].chat_id:
            Chat.objects.create(
                user = username,
                company = recipient
            )
        messages = Messages.objects.order_by("timestamp").filter(chat_id = chat_id[0].chat_id)
        for message in messages:
            print(message.user)
            if message.user:
                message.user = False
            else:
                message.user = True
            print(message.user)
    else:
        username = request.user.username
        chat_id = Chat.objects.filter(user = username, company = recipient)
        if not chat_id[0].chat_id:
            Chat.objects.create(
                user = username,
                company = recipient
            )
        messages = Messages.objects.order_by("timestamp").filter(chat_id = chat_id[0].chat_id)
    return JsonResponse([post_content.serialize() for post_content in messages], safe=False)

@login_required(login_url="/login")
@csrf_exempt
def getprofilepicture(request):
    data = json.loads(request.body)
    username = data["username"]
    user = User.objects.filter(username = username)
    return JsonResponse({"image_url": user[0].image.url})


@login_required(login_url="/login")
def new_job(request):
    if request.user.is_company:
        if request.user.language == "English":
            language = English.objects.all()
        else:
            language = German.objects.all()
        return render(request, "new_job.html", {"language": language})

def deleteimages():
    users = User.objects.all()
    for user in users:
        print(user.image)