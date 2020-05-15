from django.db import models
from .abogado import Abogado
from django.contrib.postgres.fields import JSONField
from django.contrib.auth.models import User

class Persona(models.Model):
    id = models.AutoField( primary_key=True )
    abogado = models.ForeignKey( User, on_delete = models.CASCADE )
    documento = models.FloatField()
    nombre = models.CharField( max_length = 50, null = False, blank = False )
    apellido = models.CharField( max_length = 50, null = False, blank = False )
    nacimiento = models.DateField()
    ocupacion = models.CharField( max_length = 50, null = False, blank = False )
    email = models.CharField(max_length = 50)
    celular = models.CharField(max_length=20)
    fijo = models.CharField(max_length=8, blank=True)
    direccion = models.CharField(max_length = 60)

    
    