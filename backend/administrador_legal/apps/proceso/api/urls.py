from django.urls import include, path
from rest_framework import routers
from .views import *
from .views.procesoview import ProcesoViewSet
from .views.actuacionview import ActuacionViewSet
from .views.archivosview import ArchivoViewSet
from .views.cautelaresview import CautelarViewSet
from .views.ejecutivosview import EjecutivoViewSet
from .views.notificacionview import NotificacionViewSet
from .views.partes_naturalview import ParteNViewSet
from .views.partes_juridicoview import ParteJViewSet


router = routers.DefaultRouter()
router.register(r'procesos/actuaciones', ActuacionViewSet)
router.register(r'procesos/archivos', ArchivoViewSet)
router.register(r'procesos/cautelares', CautelarViewSet)
router.register(r'procesos/ejecutivos', EjecutivoViewSet)
router.register(r'procesos/notificaciones', NotificacionViewSet)
router.register(r'procesos/partes_natural', ParteNViewSet)
router.register(r'procesos/partes_juridico', ParteJViewSet)
router.register(r'procesos/procesos', ProcesoViewSet)
urlpatterns = router.urls