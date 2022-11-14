# Generated by Django 4.1 on 2022-11-06 18:10

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('Job', '0005_remove_chat_job_key'),
    ]

    operations = [
        migrations.AddField(
            model_name='chat',
            name='timestamp',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]