# Generated by Django 3.0.3 on 2020-03-28 22:43

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('abogado', '0002_auto_20200228_1924'),
        ('proceso', '0009_auto_20200328_1625'),
    ]

    operations = [
        migrations.AlterField(
            model_name='empresasnotificadas',
            name='notificacion',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='empresas_notificadas', to='proceso.Notificacion'),
        ),
        migrations.AlterField(
            model_name='personasnotificadas',
            name='persona',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='personas_notificadas', to='abogado.Persona'),
        ),
    ]
