from django.db import models
from django.contrib.postgres.fields import JSONField
from .proceso import Proceso


class Cautelar(models.Model):
    CLASES = ( ('REALES', 'reales'), ('BANCARIAS', 'bancarias'), ('DINEARIAS', 'dinearias'), ('DOCUMENTALES', 'documentales') )
    ESTADOS = ( ('ORDENACION', 'ordenacion'), ('CONSTITUCION', 'constitucion'), ('CLASIFICACION', 'clasificacion'), ('CANCELACION', 'cancelacion'), ('ACEPTADO', 'aceptado') )
    proceso = models.ForeignKey(Proceso, on_delete=models.CASCADE, blank=False, null=True)
    clase = models.CharField(max_length = 15, null = False, choices = CLASES, default = 'REALES', blank = False)
    estado =  models.CharField(max_length = 15, null = False, choices = ESTADOS, default = 'ORDENACION', blank = False)
    secuestro_info = JSONField()

    class Meta:
        permissions = (
            ('asignar_permisos', 'Asigna permisos sobre el objeto'),
            ('ver', 'ver'),
            ('agregar', 'agregar'),
            ('modificar', 'modificar'),
            ('eliminar', 'eliminar'),
        )
