# Generated by Django 3.0.3 on 2020-03-01 21:40

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('despacho', '0002_auto_20200229_1903'),
    ]

    operations = [
        migrations.AlterField(
            model_name='juez',
            name='despacho',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='juez', to='despacho.Despacho'),
        ),
    ]