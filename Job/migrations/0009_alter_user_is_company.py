# Generated by Django 4.1 on 2022-11-02 21:15

from django.db import migrations, models
import sqlalchemy.sql.expression


class Migration(migrations.Migration):

    dependencies = [
        ('Job', '0008_delete_images_user_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='is_company',
            field=models.BooleanField(default=sqlalchemy.sql.expression.false),
        ),
    ]