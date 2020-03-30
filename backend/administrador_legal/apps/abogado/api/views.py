from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from ..models import *
from rest_framework.response import Response
from rest_framework import viewsets
from .serializers import *

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
            if user == instance.user_id:
                instance.delete()
                return Response('el registro fue eliminado')
            else:
                return Response('tu no tienes permiso para eliminar el registro')
        except:
            return Response(status=status.HTTP_204_NO_CONTENT)
        
        return Response('hola2')


class PersonaView(viewsets.ModelViewSet):
    serializer_class = PersonaSerializer

    def get_queryset(self):
        user = self.request.user.id
        return Persona.objects.filter(abogado = user)

    def list(self, request):
        queryset = self.get_queryset() 
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
            return Response(status=status.HTTP_204_NO_CONTENT)
        
        return Response('hola2')
