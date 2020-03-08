from ...models import * 
from rest_framework import viewsets
from ..serializers import *
from rest_framework.response import Response
from rest_framework import status


class CautelarViewSet(viewsets.ModelViewSet):
    queryset = Cautelar.objects.all()
    serializer_class = CautelarSerializer