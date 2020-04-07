from django.db import models
from .proceso import Proceso
from django.db.models.signals import post_delete
from django.dispatch import receiver
import os


def proyect_directory_path(instance, filename):
        return 'archivos_proceso/{0}/{1}'.format(instance.proceso.id, filename)

class Archivo(models.Model):
    proceso = models.ForeignKey(Proceso, on_delete=models.CASCADE, blank=False, null=True)
    archivo =  models.FileField(upload_to = proyect_directory_path, null=True) 
    extension = models.CharField(max_length = 10, null = False,  blank = False)
    descripcion = models.CharField(max_length = 100, null = False,  blank = False)


@receiver(post_delete, sender = Archivo)
def eliminar_archivo(sender, instance, **kwargs):
    os.remove(instance.archivo.path)