# Generated by Django 4.1 on 2022-11-05 21:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Job', '0003_user_language'),
    ]

    operations = [
        migrations.CreateModel(
            name='English',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('translation', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='German',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('translation', models.CharField(max_length=200)),
            ],
        ),
    ]
