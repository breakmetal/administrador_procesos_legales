# Generated by Django 3.0.3 on 2020-04-05 18:24

import apps.proceso.models.archivo
import apps.proceso.models.ejecutivo
from django.conf import settings
import django.contrib.postgres.fields.jsonb
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('abogado', '0002_auto_20200228_1924'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('despacho', '0004_auto_20200302_1725'),
    ]

    operations = [
        migrations.CreateModel(
            name='Notificacion',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tipo', models.CharField(max_length=60)),
                ('mensaje', models.CharField(max_length=100)),
                ('expedicion', models.DateTimeField()),
                ('limite', models.DateField()),
            ],
            options={
                'permissions': (('asignar_permisos', 'Asigna permisos sobre el objeto'), ('ver', 'ver'), ('agregar', 'agregar'), ('modificar', 'modificar'), ('eliminar', 'eliminar')),
            },
        ),
        migrations.CreateModel(
            name='Proceso',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('numero_proceso', models.CharField(max_length=23)),
                ('tipo', models.CharField(choices=[('JURIDICO', 'juridico'), ('EJECUTIVO', 'ejecutivo'), ('OTRO', 'otro')], default='JURIDICO', max_length=30)),
                ('estado', models.CharField(max_length=30)),
                ('litisconsorcio', models.CharField(choices=[('NECESARIO', 'necesario'), ('FACULTATIVO', 'facultativo'), ('CUASI-NECESARIO', 'cuasi-necesario'), ('NO-APLICA', 'no aplica')], default='NO-APLICA', max_length=30)),
                ('descripcion', models.TextField(max_length=150)),
                ('fecha_providencia', models.DateTimeField()),
                ('fecha_publicacion', models.DateTimeField()),
                ('fecha_finalizacion', models.DateTimeField()),
                ('despacho', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='despacho.Despacho')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'permissions': (('asignar_permisos', 'Asigna permisos sobre el objeto'), ('ver', 'ver'), ('agregar', 'agregar'), ('modificar', 'modificar'), ('eliminar', 'eliminar')),
            },
        ),
        migrations.CreateModel(
            name='PersonasNotificadas',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('notificado', models.BooleanField(default=False)),
                ('medio', models.CharField(choices=[('EMAIL', 'email'), ('PERSONAL', 'personal'), ('TELEFONO', 'telefono')], default='EMAIL', max_length=30)),
                ('notificacion', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='personasNotificadas', to='proceso.Notificacion')),
                ('persona', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='abogado.Persona')),
            ],
        ),
        migrations.CreateModel(
            name='Partesn',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rol', models.CharField(choices=[('DEMANDADO', 'demandado'), ('DEMANDANTE', 'demandante'), ('PERITO', 'perito'), ('TERCERO', 'tercero')], default='DEMANDANTE', max_length=15)),
                ('Proceso', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='partesNaturales', to='proceso.Proceso')),
                ('persona', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='abogado.Persona')),
            ],
            options={
                'permissions': (('asignar_permisos', 'Asigna permisos sobre el objeto'), ('ver', 'ver'), ('agregar', 'agregar'), ('modificar', 'modificar'), ('eliminar', 'eliminar')),
            },
        ),
        migrations.CreateModel(
            name='Partesj',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rol', models.CharField(choices=[('DEMANDADO', 'demandado'), ('DEMANDANTE', 'demandante')], default='DEMANDANTE', max_length=15)),
                ('Proceso', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='partesJuridicas', to='proceso.Proceso')),
                ('empresa', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='abogado.Empresa')),
            ],
            options={
                'permissions': (('asignar_permisos', 'Asigna permisos sobre el objeto'), ('ver', 'ver'), ('agregar', 'agregar'), ('modificar', 'modificar'), ('eliminar', 'eliminar')),
            },
        ),
        migrations.AddField(
            model_name='notificacion',
            name='proceso',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='proceso.Proceso'),
        ),
        migrations.CreateModel(
            name='EmpresasNotificadas',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('notificado', models.BooleanField(default=False)),
                ('medio', models.CharField(choices=[('EMAIL', 'email'), ('PERSONAL', 'personal'), ('TELEFONO', 'telefono')], default='EMAIL', max_length=30)),
                ('empresa', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='abogado.Empresa')),
                ('notificacion', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='empresasNotificadas', to='proceso.Notificacion')),
            ],
        ),
        migrations.CreateModel(
            name='Ejecutivo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('pretencion', django.contrib.postgres.fields.jsonb.JSONField(default=apps.proceso.models.ejecutivo.Ejecutivo.pretencion_default, verbose_name='pretencion')),
                ('titulo', models.CharField(choices=[('VALOR', 'valor'), ('EJECUTIVO', 'ejecutivo')], default='VALOR', max_length=9)),
                ('obligacion', models.CharField(choices=[('DAR', 'dar'), ('HACER', 'hacer'), ('NO_HACER', 'no hacer')], default='DAR', max_length=8)),
                ('cuantia', models.CharField(default='minima', max_length=6)),
                ('proceso', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='proceso.Proceso')),
            ],
            options={
                'permissions': (('asignar_permisos', 'Asigna permisos sobre el objeto'), ('ver', 'ver'), ('agregar', 'agregar'), ('modificar', 'modificar'), ('eliminar', 'eliminar')),
            },
        ),
        migrations.CreateModel(
            name='Cautelar',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('clase', models.CharField(choices=[('REALES', 'reales'), ('BANCARIAS', 'bancarias'), ('DINEARIAS', 'dinearias'), ('DOCUMENTALES', 'documentales')], default='REALES', max_length=15)),
                ('estado', models.CharField(choices=[('ORDENACION', 'ordenacion'), ('CONSTITUCION', 'constitucion'), ('CLASIFICACION', 'clasificacion'), ('CANCELACION', 'cancelacion'), ('ACEPTADO', 'aceptado')], default='ORDENACION', max_length=15)),
                ('secuestro_info', django.contrib.postgres.fields.jsonb.JSONField()),
                ('proceso', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='proceso.Proceso')),
            ],
            options={
                'permissions': (('asignar_permisos', 'Asigna permisos sobre el objeto'), ('ver', 'ver'), ('agregar', 'agregar'), ('modificar', 'modificar'), ('eliminar', 'eliminar')),
            },
        ),
        migrations.CreateModel(
            name='Archivo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('archivo', models.FileField(null=True, upload_to=apps.proceso.models.archivo.proyect_directory_path)),
                ('extension', models.CharField(max_length=10)),
                ('descripcion', models.CharField(max_length=100)),
                ('proceso', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='proceso.Proceso')),
            ],
            options={
                'permissions': (('asignar_permisos', 'Asigna permisos sobre el objeto'), ('ver', 'ver'), ('agregar', 'agregar'), ('modificar', 'modificar'), ('eliminar', 'eliminar')),
            },
        ),
        migrations.CreateModel(
            name='Actuacion',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('actuacion', models.CharField(max_length=60)),
                ('anotacion', models.CharField(max_length=100)),
                ('inicio', models.DateTimeField()),
                ('termino', models.DateTimeField()),
                ('registro', models.DateTimeField()),
                ('proceso', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='proceso.Proceso')),
            ],
            options={
                'permissions': (('asignar_permisos', 'Asigna permisos sobre el objeto'), ('ver', 'ver'), ('agregar', 'agregar'), ('modificar', 'modificar'), ('eliminar', 'eliminar')),
            },
        ),
    ]
