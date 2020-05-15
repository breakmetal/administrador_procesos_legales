from django.db import models
from .abogado import Abogado
from django.contrib.auth.models import User
from django.contrib.postgres.fields import JSONField

class Empresa(models.Model):
   abogado = models.ForeignKey( User, on_delete = models.CASCADE )
   documento = models.FloatField()
   nombre = models.CharField( max_length = 50, null = False, blank = False )
   actividad = models.CharField( max_length = 50, null = True, blank = False )
   email = models.CharField(max_length = 50)
   celular = models.CharField(max_length=20)
   fijo = models.CharField(max_length=8)
   direccion = models.CharField(max_length = 60)
    

