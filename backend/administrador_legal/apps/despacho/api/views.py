from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from ..models import *
from rest_framework import viewsets
from .serializers import *

class DespachoView(viewsets.ModelViewSet):
    queryset = Despacho.objects.all()
    serializer_class = DespachoSerializer

class JuezView(viewsets.ModelViewSet):
    queryset = Juez.objects.all()
    serializer_class = JuezSerializer
