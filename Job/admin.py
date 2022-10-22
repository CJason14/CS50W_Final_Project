from django.contrib import admin

from Job.models import *

admin.site.register(Job)
admin.site.register(User)
admin.site.register(Company)
admin.site.register(Uniquecheck)