from django.db import models
from .proceso import Proceso

class Actuacion(models.Model):
    proceso = models.ForeignKey(Proceso, on_delete=models.CASCADE, blank=False, null=True)
    actuacion = models.CharField(max_length = 60, null = False, blank = False)
    anotacion = models.CharField(max_length = 100, null = False, blank = False)
    inicio = models.DateTimeField( null = False )
    termino = models.DateTimeField( null = False )
    registro = models.DateTimeField( null = False )

    class Meta:
        permissions = (
            ('asignar_permisos', 'Asigna permisos sobre el objeto'),
            ('ver', 'ver'),
            ('agregar', 'agregar'),
            ('modificar', 'modificar'),
            ('eliminar', 'eliminar'),
        )

