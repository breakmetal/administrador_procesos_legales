from django.contrib import admin
from .models import Abogado
from .models import Persona
from .models import Empresa

admin.site.register(Abogado)
admin.site.register(Persona)
admin.site.register(Empresa)