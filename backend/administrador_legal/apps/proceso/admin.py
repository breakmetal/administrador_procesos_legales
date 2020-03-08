from django.contrib import admin
from .models import Actuacion
from .models import Archivo
from .models import Cautelar
from .models import Ejecutivo
from .models import Notificacion
from .models import Proceso
from .models import Partesj
from .models import Partesn

admin.site.register(Actuacion)
admin.site.register(Archivo)
admin.site.register(Cautelar)
admin.site.register(Ejecutivo)
admin.site.register(Notificacion)
admin.site.register(Proceso)
admin.site.register(Partesn)
admin.site.register(Partesj)

