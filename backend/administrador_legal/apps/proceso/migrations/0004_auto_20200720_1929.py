# Generated by Django 3.0.5 on 2020-07-21 00:29

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('proceso', '0003_auto_20200523_2032'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='notificacion',
            options={'permissions': (('verNotificaciones', 'permite listas las notificaciones'),)},
        ),
        migrations.AlterField(
            model_name='notificacion',
            name='proceso',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='notificaciones', to='proceso.Proceso'),
        ),
    ]
