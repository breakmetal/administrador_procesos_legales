from django.urls import include, path
from rest_framework import routers
from .views import *

router = routers.DefaultRouter()
router.register(r'despachos/despachos', DespachoView)
router.register(r'despachos/juez', JuezView)
urlpatterns = router.urls