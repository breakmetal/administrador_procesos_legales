from django.contrib import admin
from .models import Actuacion
from .models import Archivo
from .models import Cautelar
from .models import Ejecutivo
from .models import Notificacion
from .models import Proceso

admin.site.register(Actuacion)
admin.site.register(Archivo)
admin.site.register(Cautelar)
admin.site.register(Ejecutivo)
admin.site.register(Notificacion)
admin.site.register(Proceso)

