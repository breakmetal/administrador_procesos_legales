from ...models import * 
from rest_framework import viewsets
from ..serializers import *
from rest_framework.response import Response
from rest_framework import status


class ActuacionViewSet(viewsets.ModelViewSet):
    queryset = Actuacion.objects.all()
    serializer_class = ActuacionSerializer