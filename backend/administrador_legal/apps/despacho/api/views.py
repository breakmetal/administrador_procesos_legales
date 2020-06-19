from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import RetrieveModelMixin
from ..models import *
from .serializers import DespachoSerializer

class DespachoDetail(GenericViewSet, RetrieveModelMixin):
    queryset = Despacho.objects.all()
    serializer_class = DespachoSerializer


