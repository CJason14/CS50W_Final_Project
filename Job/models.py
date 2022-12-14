from distutils.command.upload import upload
import email
from email.policy import default
from enum import unique
from operator import truediv
from pickle import TRUE
from pyexpat import model
from tokenize import blank_re
from unicodedata import category, decimal
from django.contrib.auth.models import AbstractUser
from django.db import models
from sqlalchemy import false, null, true
from django.utils.timezone import now

class User(AbstractUser):
    id = models.AutoField(primary_key=True)
    email = models.CharField(max_length=200, unique=True)
    first_name = models.CharField(max_length=60, blank=True, null=True)
    last_name = models.CharField(max_length=60, blank=True, null=True)
    password = models.CharField(max_length=300)
    phone_number = models.CharField(max_length=50, blank=True, null=True)
    date_of_birth = models.DateTimeField(blank=True, null=True)
    cv = models.ImageField(upload_to='images/CV', blank=True, null=True)
    is_company = models.BooleanField(default = False)
    description = models.CharField(max_length=1000, blank=True, null=True)
    image = models.ImageField(upload_to='images', blank=True)
    darkmode = models.BooleanField(default = False)
    language = models.CharField(default = "English", max_length=300)

    def serialize(self):
        return {
            "first_name": self.first_name,
            "last_name": self.last_name,
            "cv": self.cv.name,
            "email": self.email,
            "phone_number": self.phone_number
        }

class Job(models.Model):
    id = models.AutoField(primary_key=True)
    company_key= models.CharField(max_length=200)
    title = models.CharField(max_length=200)
    description = models.CharField(max_length=1000)
    salary = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=100)

    def serialize(self):
        return {
            "title": self.title,
            "description": self.description,
            "salary": self.salary,
            "category": self.category,
            "company_key": self.company_key,
            "id": self.id
        }

class Application(models.Model):
    id = models.AutoField(primary_key=True)
    company_name = models.CharField(max_length=200)
    user_id = models.CharField(max_length=200)
    job_id = models.CharField(max_length=200)
    accepted = models.BooleanField(default = False)
    declined = models.BooleanField(default = False)
    visible = models.BooleanField(default= True)

    def serialize(self):
        return {
            "username": self.user_id,
            "accepted": self.accepted,
            "declined": self.declined,
            "id": self.id,
            "visible": self.visible
        }



class Chat(models.Model):
    chat_id = models.AutoField(primary_key=True)
    company = models.CharField(max_length=200)
    user = models.CharField(max_length=200)

    def serialize(self):
        return {
            "user": self.user,
            "company": self.company
        }

class Messages(models.Model):
    id = models.AutoField(primary_key=True)
    chat_id = models.CharField(max_length=200)
    context = models.CharField(max_length=1000)
    user = models.BooleanField(default=False)
    timestamp = models.DateTimeField(default=now)

    def serialize(self):
        return {
            "context": self.context,
            "user": self.user
        }


class German(models.Model):
    id = models.AutoField(primary_key=True)
    translation = models.CharField(max_length=200)

class English(models.Model):
    id = models.AutoField(primary_key=True)
    translation = models.CharField(max_length=200)