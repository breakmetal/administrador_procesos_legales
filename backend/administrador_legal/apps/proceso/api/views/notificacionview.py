from ...models import Notificacion, Proceso
from rest_framework import viewsets
from ..serializers import NotificacionSerializer
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from guardian.shortcuts import assign_perm, get_objects_for_user
from rest_framework.decorators import action
from datetime import date
from datetime import timedelta 

class NotificacionViewSet(viewsets.ModelViewSet):
    queryset = Notificacion.objects.all()
    serializer_class = NotificacionSerializer

    def create(self, request, *args, **kwargs):
        instance = request.data
        proceso = Proceso.objects.get(id = instance["proceso"])
        user = self.request.user
        check_permission = user.has_perm('agregar', proceso)
        if check_permission or proceso.user == user.id:
            serializer = NotificacionSerializer(data=instance)
            serializer.is_valid(raise_exception=True)
            actuacion = serializer.save()
            return Response({"mensaje": "se agrego una notificacion"})
        else:
            return Response({"mensaje": "no tienes permiso"})

    def update(self, request, pk=None):
        instance = Notificacion.objects.get(id = pk)
        user = self.request.user
        proceso = Proceso.objects.get(id = instance.proceso.id)
        check_permission = user.has_perm('modificar',proceso)
        if  check_permission:
            serializer = NotificacionSerializer(
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
        notificacion = Notificacion.objects.get(id = pk)
        proceso = Proceso.objects.get(id = notificacion.proceso.id)
        check_permission = user.has_perm('ver',proceso)
        if check_permission:
            serializer = self.get_serializer(notificacion)
            return Response(serializer.data)
        else:
            return Response({"mensaje": "tu no tienes permiso"})
            
    
    def destroy(self, request, pk=None):
        try:
            instance = Notificacion.objects.get(id = pk)
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
    def listar_notificaciones(self, request, pk = None):
        user = self.request.user
        proceso = Proceso.objects.get(id = pk)
        check_permission = user.has_perm('ver',proceso)
        if check_permission:
            notificaciones = Notificacion.objects.filter(proceso = proceso.id).order_by('limite')
            page = self.paginate_queryset(notificaciones)
            serializer_context = {'request': notificaciones}
            serializer = self.get_serializer(
            page, many=True
            )
            return self.get_paginated_response(serializer.data)
        else:
            return Response('tu no tienes permiso para ver los registros')

    
    @action(detail=True, methods=['get'])
    def contar_notificaciones(self, request, pk = None):
        user = self.request.user
        proceso = Proceso.objects.get(id = pk)
        check_permission = user.has_perm('ver',proceso)
        if check_permission:
            notificaciones = Notificacion.objects.filter(proceso = proceso.id).count()
            return Response(notificaciones)
        else:
            return Response('tu no tienes permiso para ver los registros')
    
     
    @action(detail=True, methods=['get'])
    def alerta(self, request, pk = None):
        user = self.request.user
        proceso = Proceso.objects.get(id = pk)
        check_permission = user.has_perm('ver',proceso)
        if check_permission:
            fechaHoy = date.today()
            fechaQuery = fechaHoy + timedelta(days=5) 
            notificaciones = Notificacion.objects.filter(proceso = pk).filter(limite__gte = fechaHoy).filter(limite__lte = fechaQuery).count()
            return Response(notificaciones)
        else:
            return Response('tu no tienes permiso para ver los registros')