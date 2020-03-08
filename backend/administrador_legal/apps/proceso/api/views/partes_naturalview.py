from ...models import * 
from rest_framework import viewsets
from ..serializers import *
from rest_framework.response import Response
from rest_framework import status



class ParteNViewSet(viewsets.ModelViewSet):
    queryset = Partesn.objects.all()
    serializer_class = PartesNSerializer