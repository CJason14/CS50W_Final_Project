# Generated by Django 4.1 on 2022-11-05 16:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Job', '0002_alter_user_darkmode'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='language',
            field=models.CharField(default='English', max_length=300),
        ),
    ]
