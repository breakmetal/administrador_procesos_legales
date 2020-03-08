from django.db import models
from apps.abogado.models import Abogado
from apps.abogado.models import Persona
from apps.abogado.models import Empresa
from django.contrib.auth.models import User
from apps.despacho.models import Despacho


class Proceso(models.Model):
    PROCESOS_CHOICES =  (('JURIDICO', 'juridico'), ('EJECUTIVO', 'ejecutivo'),('OTRO', 'otro')) 
    LITISCONSORCIO = (('NECESARIO', 'necesario'), ('FACULTATIVO', 'facultativo'), ('CUASI-NECESARIO', 'cuasi-necesario'), ('NO-APLICA', 'no aplica')) 
    radicado = models.FloatField( primary_key=True)
    despacho = models.ForeignKey(Despacho, on_delete=models.CASCADE, blank=False, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=False, null=True)
    tipo = models.CharField(max_length = 30, null = False, choices = PROCESOS_CHOICES, default = 'JURIDICO', blank = False)
    estado = models.CharField(max_length = 30, null = False, blank = False)
    litisconsorcio = models.CharField(max_length = 30, null = False, choices = LITISCONSORCIO, default = 'NO-APLICA', blank = False)
    descripcion = models.TextField(max_length = 150, null = False, blank = False)
    fecha_providencia = models.DateTimeField( null = False )
    fecha_publicacion = models.DateTimeField( null = False )
    fecha_finalizacion = models.DateTimeField( null = False )

    class Meta:
        default_permissions = ('add', 'change', 'delete')
        permissions = (
            ('asignar_permisos', 'Asigna permisos sobre el objeto'),
            ('ver_proceso', 'ver todo del proceso'),
            ('agregar_archivos', 'agregar archivos'),
            ('modificar_archivos', 'modificar archivos'),
            ('eliminar_archivos', 'eliminar archivos'),
            ('agregar_notificacion', 'agregar notificacion'),
            ('modificar_notificacion', 'modificar notificacion'),
            ('eliminar_notificacion', 'eliminar notificacion'),
            ('agregar_actuacion', 'agregar actuacion'),
            ('modificar_actuacion', 'modificar actuacion'),
            ('eliminar_actuacion', 'eliminar actuacion'),
            ('agregar_cautela', 'agregar cautela'),
            ('modificar_cautela', 'modificar cautela'),
            ('eliminar_cautela', 'eliminar cautela'),
        )


class Partesn(models.Model):
    ROLES = (('DEMANDADO', 'demandado'), ('DEMANDANTE', 'demandante'), ('PERITO', 'perito'), ('TERCERO', 'tercero'))
    persona = models.ForeignKey(Persona, on_delete=models.CASCADE)
    Proceso = models.ForeignKey(Proceso, on_delete=models.CASCADE)
    rol =  models.CharField(max_length = 15, null = False, choices = ROLES, default = 'DEMANDANTE', blank = False)

class  Partesj(models.Model):
    ROLES = (('DEMANDADO', 'demandado'), ('DEMANDANTE', 'demandante'))
    empresa = models.ForeignKey(Empresa, on_delete=models.CASCADE)
    Proceso = models.ForeignKey(Proceso, on_delete=models.CASCADE)
    rol =  models.CharField(max_length = 15, null = False, choices = ROLES, default = 'DEMANDANTE', blank = False)
