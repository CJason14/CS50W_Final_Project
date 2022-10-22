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
from sqlalchemy import null, true

class User(AbstractUser):
    id = models.AutoField(primary_key=True)
    email = models.CharField(max_length=200, unique=True)
    first_name = models.CharField(max_length=60)
    last_name = models.CharField(max_length=60)
    password = models.CharField(max_length=300)
    phone_number = models.CharField(max_length=50)
    date_of_birth = models.DateTimeField(blank=True, null=True)
    cv = models.ImageField(upload_to='images')

class Company(models.Model):
    id = models.AutoField(primary_key=True)
    email = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=300)
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=1000)

class Uniquecheck(models.Model):
    id = models.AutoField(primary_key=True)
    email = models.CharField(max_length=100, unique=True)

class Job(models.Model):
    id = models.AutoField(primary_key=True)
    company_key= models.CharField(max_length=200)
    title = models.CharField(max_length=200)
    description = models.CharField(max_length=1000)
    salary = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=100)

class Chat(models.Model):
    id = models.AutoField(primary_key=True)
    job_key = models.CharField(max_length=200)
    context = models.CharField(max_length=1000)
    writer = models.CharField(max_length=200)
    recipient = models.CharField(max_length=200)

