from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from ..models import *

from rest_framework import viewsets
from .serializers import *

class UsersView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class EmpresaView(viewsets.ModelViewSet):
    serializer_class = EmpresaSerializer
    
    def get_queryset(self):
        user = self.request.user.id
        return Empresa.objects.filter(abogado = user)
    

class PersonaView(viewsets.ModelViewSet):
    serializers_class = PersonaSerializer

    def get_queryset(self):
        user = self.request.user.id
        return Persona.objects.filter(abogado = user)

