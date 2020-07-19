from ...models import Actuacion, Proceso 
from rest_framework import viewsets
from ..serializers import *
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from guardian.shortcuts import get_objects_for_user

class ActuacionViewSet(viewsets.ModelViewSet):
    queryset = Actuacion.objects.all()
    serializer_class = ActuacionSerializer

    def get_queryset(self):
        user = self.request.user
        procesos = get_objects_for_user(user, 'ver', klass=Proceso)
        return procesos

    def create(self, request, *args, **kwargs):
        instance = request.data
        proceso = Proceso.objects.get(id = instance["proceso"])
        user = self.request.user
        check_permission = user.has_perm('agregar', proceso)
        if check_permission or proceso.user == user.id:
            serializer = self.get_serializer(data=instance)
            serializer.is_valid(raise_exception=True)
            actuacion = serializer.save()
            return Response({"mensaje": "se agrego una notificacion"})
        else:
            return Response({"mensaje": "no tienes permiso"})
        

    def list(self, request):
        pass

    def update(self, request, pk=None):
        instance = Actuacion.objects.get(id = pk)
        user = self.request.user
        proceso = Proceso.objects.get(id = instance.proceso.id)
        check_permission = user.has_perm('modificar',proceso)
        if  check_permission:
            serializer = ActuacionSerializer(
                instance=instance,
                data=request.data,
                context={'request': request}
            )
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)
        else:
            return Response({"mensaje": "tu no tienes permiso"})

    def retrieve(self, request, pk=None):
        user = self.request.user
        actuacion = Actuacion.objects.get(id = pk)
        proceso = Proceso.objects.get(id = actuacion.proceso.id)
        check_permission = user.has_perm('ver',proceso)
        if check_permission:
            serializer = self.get_serializer(actuacion)
            return Response(serializer.data)
        else:
            return Response({"mensaje": "tu no tienes permiso"})
            
    
    def destroy(self, request, pk=None):
        try:
            instance = Actuacion.objects.get(id = pk)
            proceso = Proceso.objects.get(id = instance.proceso.id)
            user = self.request.user
            check_permission = user.has_perm('eliminar', proceso)
            if  check_permission:
                instance.delete()
                return Response('el registro fue eliminado')
            else:
                return Response('tu no tienes permiso para eliminar el registro')
        except:
            return Response(status=status.HTTP_204_NO_CONTENT)
    

    @action(detail=True, methods=['get'])
    def listar_actuaciones(self, request, pk = None):
        user = self.request.user
        proceso = Proceso.objects.get(id = pk)
        check_permission = user.has_perm('ver',proceso)
        if check_permission:
            actuaciones = Actuacion.objects.filter(proceso = proceso.id).order_by('registro')
            page = self.paginate_queryset(actuaciones)
            serializer_context = {'request': actuaciones}
            serializer = self.get_serializer(
            page, many=True
            )
            return self.get_paginated_response(serializer.data)
        else:
            return Response('tu no tienes permiso para ver los registros')
        
    @action(detail=True, methods=['get'])
    def contar_actuaciones(self, request, pk = None):
        user = self.request.user
        proceso = Proceso.objects.get(id = pk)
        check_permission = user.has_perm('ver',proceso)
        if check_permission:
            actuaciones = Actuacion.objects.filter(proceso = pk).count()
            return Response(actuaciones)
        else:
            return Response('tu no tienes permiso para ver los registros')

    