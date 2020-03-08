from django.urls import include, path
from rest_framework import routers
from .views import *

router = routers.DefaultRouter()
router.register(r'abogado/user', UsersView)
router.register(r'abogado/empresas', EmpresaView,  basename ='Empresas')
router.register(r'abogado/personas', PersonaView,  basename = 'Personas') 
urlpatterns = router.urls