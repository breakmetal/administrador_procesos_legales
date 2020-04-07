from ...models import PersonasNotificadas, Notificacion, Proceso
from rest_framework import viewsets
from ..serializers import PersonasNotificadasSerializer
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from guardian.shortcuts import assign_perm, get_objects_for_user

class PersonasNotificadasView(viewsets.ModelViewSet):
    queryset = PersonasNotificadas.objects.all()
    serializer_class = PersonasNotificadasSerializer



    def update(self, request, pk=None):
        pass

    def list(self, resquest):
        pass


    def create(self, request, *args, **kwargs):
        instance = request.data
        user = self.request.user
        notificacion = Notificacion.objects.get(id=instance["notificacion"])
        proceso = Proceso.objects.get(id = notificacion.proceso.id)
        check_permission = user.has_perm('agregar', proceso)
        if check_permission:
            serializer = self.get_serializer(data=instance)
            serializer.is_valid(raise_exception=True)
            notificado = serializer.save()
            return Response({"mensaje": "se agrego una empresa"})
        else:
            return Response({"mensaje": "no tienes permiso"})
        

    def partial_update(self, request, pk=None):
        instance = PersonasNotificadas.objects.get(id=pk)
        notificacion = Notificacion.objects.get(id=instance.notificacion.id)
        proceso = Proceso.objects.get(id=notificacion.proceso.id)
        user = self.request.user
        check_permission = user.has_perm('modificar', proceso)
        if  check_permission:
            serializer = PersonasNotificadasSerializer(
                instance=instance,
                data=request.data,
                context={'request': request},
                partial=True 
            )
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)
        else:
            return Response({"mensaje":"tu no tienes permiso"})

    def retrieve(self, request, pk=None):
        queryset = PersonasNotificadas.objects.get(id=pk)
        notificacion = Notificacion.objects.get(id=queryset.notificacion.id)
        user = self.request.user
        proceso = Proceso.objects.get(id=notificacion.proceso.id)
        check_permission = user.has_perm('ver', proceso)
        if  check_permission:
            serializer = PersonasNotificadasSerializer(queryset)
            return Response(serializer.data)
        else:
            return Response({"mensaje": "tu no tienes permiso para ver el registro"})
    
    def destroy(self, request, pk=None):
        try:
            instance = self.get_object()
            notificacion = Notificacion.objects.get(id=instance.notificacion.id)
            user = self.request.user
            proceso = Proceso.objects.get(id=notificacion.proceso.id)
            check_permission = user.has_perm('modificar', proceso)
            if  check_permission:
                instance.delete()
                return Response('el registro fue eliminado')
            else:
                return Response({'mensaje':'tu no tienes permiso para eliminar el registro'})
        except:
            return Response(status=status.HTTP_204_NO_CONTENT)
        
