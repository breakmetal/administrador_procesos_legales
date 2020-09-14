from django.shortcuts import render
from django.db.models import Q
from django.contrib.auth.models import User
from rest_framework.decorators import action
from rest_framework import generics
from ..models import *
from rest_framework.response import Response
from rest_framework import viewsets
from .serializers import *
#from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import permissions


class UsersView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_queryset(self):
        user = self.request.user.id
        return User.objects.filter(id = user)
    
    def retrieve(self, request, pk=None):
        user = self.get_object()
        serializer = self.get_serializer(user)
        print ( serializer)
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        user = self.request.user.id
        if user == instance.id:
            serializer = UserSerializer(
                instance=instance,
                data=request.data,
                context={'request': request}
            )
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)
        else:
            return Response("tu no tienes permiso")


class EmpresaView(viewsets.ModelViewSet):
    serializer_class = EmpresaSerializer
    
    def get_queryset(self):
        user = self.request.user.id
        return Empresa.objects.filter(abogado = user)
    
    def list(self, request):
        queryset = self.get_queryset() 
        nombre = self.request.query_params.get('nombre', None)
        documento = self.request.query_params.get('documento', None)
        if nombre != None:
            queryset = queryset.filter(nombre__contains = nombre)
        if documento != None:
            queryset = queryset.filter(documento__contains = documento)
        else:
            pass
        page = self.paginate_queryset(queryset)
        serializer_context = {'request': request}
        serializer = self.serializer_class(
            page, context=serializer_context, many=True
        )
        print("serializer ", serializer, "serializer.data", serializer.data )
        return self.get_paginated_response(serializer.data)


    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        user = self.request.user.id
        if user == instance.abogado_id:
            serializer = PersonaSerializer(
                instance=instance,
                data=request.data,
                context={'request': request}
            )
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)
        else:
            return Response("tu no tienes permiso")

    def destroy(self, request, pk=None):
        instance = self.get_object()
        try:
            instance = self.get_object()
            user = self.request.user.id
            if user == instance.abogado_id:
                instance.delete()
                return Response('el registro fue eliminado')
            else:
                return Response('tu no tienes permiso para eliminar el registro')
        except:
            return Response("fuck")
        
        return Response('hola2')
    
    @action(detail=False, methods=['get'])
    def partesJuridicas(self, request):
        queryset = self.get_queryset()
        nombre = self.request.query_params.get('nombre', None)
        queryset = queryset.filter(nombre__contains = nombre)
        serializer = EmpresaSerializer(queryset, many = True)
        return  Response(serializer.data)
  



class PersonaView(viewsets.ModelViewSet):
    serializer_class = PersonaSerializer

    def get_queryset(self):
        user = self.request.user.id
        return Persona.objects.filter(abogado = user)

    def list(self, request):
        queryset = self.get_queryset() 
        nombre = self.request.query_params.get('nombre', None)
        documento = self.request.query_params.get('documento', None)
        if nombre != None:
            queryset = queryset.filter(Q(nombre__contains = nombre) | Q(apellido__contains = nombre))
        if documento != None:
            queryset = queryset.filter(documento__contains = documento)
        else:
            pass
        page = self.paginate_queryset(queryset)
        serializer_context = {'request': request}
        serializer = self.serializer_class(
            page, context=serializer_context, many=True
        )
        print("serializer ", serializer, "serializer.data", serializer.data )
        return self.get_paginated_response(serializer.data)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        user = self.request.user.id
        if user == instance.abogado_id:
            serializer = PersonaSerializer(
                instance=instance,
                data=request.data,
                context={'request': request}
            )
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)
        else:
            return Response("tu no tienes permiso")

    def destroy(self, request, pk=None):
        instance = self.get_object()
        try:
            instance = self.get_object()
            user = self.request.user.id
            if user == instance.abogado_id:
                instance.delete()
                return Response('el registro fue eliminado')
            else:
                return Response('tu no tienes permiso para eliminar el proceso')
        except:
            return Response("fuck")
        
        return Response('hola2')

    @action(detail=False, methods=['get'])
    def partesPersonas(self, request):
        queryset = self.get_queryset()
        nombre = self.request.query_params.get('nombre', None)
        queryset = queryset.filter(Q(nombre__contains = nombre) | Q(apellido__contains = nombre))
        serializer = PersonaSerializer(queryset, many = True)
        return  Response(serializer.data)


    @action(detail=False, methods=['get'])
    def lista_prueba(self, request):
        queryset = Persona.objects.all()
        serializer = PersonaSerializer(queryset, many = True)
        return Response(serializer.data)
        