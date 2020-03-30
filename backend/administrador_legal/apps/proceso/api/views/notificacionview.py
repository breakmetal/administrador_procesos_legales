from ...models import Notificacion
from rest_framework import viewsets
from ..serializers import NotificacionSerializer
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from guardian.shortcuts import assign_perm, get_objects_for_user

class NotificacionViewSet(viewsets.ModelViewSet):
    queryset = Notificacion.objects.all()
    serializer_class = NotificacionSerializer

    def get_queryset(self):
        user = self.request.user
        notificaciones = get_objects_for_user(user, 'ver', klass=Notificacion)
        return notificaciones

    def create(self, request, *args, **kwargs):
        instance = request.data
        serializer = NotificacionSerializer(data=instance)
        serializer.is_valid(raise_exception=True)
        notificacion = serializer.save()
        assign_perm("asignar_permisos", request.user, notificacion)
        assign_perm("ver", request.user, notificacion)
        assign_perm("agregar", request.user, notificacion)
        assign_perm("modificar", request.user, notificacion)
        assign_perm("eliminar", request.user, notificacion)
        return Response({"mensaje": "se agrego el registro"})

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
            serializer = NotificacionSerializer(
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
        notificacion = get_object_or_404(queryset, pk=pk)
        serializer = NotificacionSerializer(notificacion)
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
        