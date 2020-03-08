from ...models import * 
from rest_framework import viewsets
from ..serializers import *
from rest_framework.response import Response
from rest_framework import status



class EjecutivoViewSet(viewsets.ModelViewSet):
    queryset = Ejecutivo.objects.all()
    serializer_class = EjecutivoSerializer
