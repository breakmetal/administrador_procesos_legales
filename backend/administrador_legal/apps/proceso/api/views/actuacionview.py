from ...models import * 
from rest_framework import viewsets
from ..serializers import *
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from guardian.shortcuts import assign_perm, get_objects_for_user

class ActuacionViewSet(viewsets.ModelViewSet):
    queryset = Actuacion.objects.all()
    serializer_class = ActuacionSerializer

    def get_queryset(self):
        user = self.request.user
        actuaciones = get_objects_for_user(user, 'ver', klass=Actuacion)
        return actuaciones

    def create(self, request, *args, **kwargs):
        instance = request.data
        serializer = ActuacionSerializer(data=instance)
        serializer.is_valid(raise_exception=True)
        actuacion = serializer.save()
        assign_perm("asignar_permisos", request.user, actuacion)
        assign_perm("ver", request.user, actuacion)
        assign_perm("agregar", request.user, actuacion)
        assign_perm("modificar", request.user, actuacion)
        assign_perm("eliminar", request.user, actuacion)
        return Response({"mensaje": "se agrego una notificacion"})

    def list(self, request):
        queryset = self.get_queryset() 
        page = self.paginate_queryset(queryset)
        serializer_context = {'request': request}
        serializer = self.serializer_class(
            page, context=serializer_context, many=True
        )
        return self.get_paginated_response(serializer.data)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        user = self.request.user
        check_permission = user.has_perm('modificar',instance)
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
            return Response("tu no tienes permiso")
        return Response(request)

    def retrieve(self, request, pk=None):
        queryset = self.get_queryset()
        actuacion = get_object_or_404(queryset, pk=pk)
        serializer = ActuacionSerializer(actuacion)
        return Response(serializer.data)
            
    
    def destroy(self, request, pk=None):
        instance = self.get_object()
        try:
            instance = self.get_object()
            user = self.request.user
            check_permission = user.has_perm('eliminar',instance)
            if  check_permission:
                instance.delete()
                return Response('el registro fue eliminado')
            else:
                return Response('tu no tienes permiso para eliminar el registro')
        except:
            return Response(status=status.HTTP_204_NO_CONTENT)
        