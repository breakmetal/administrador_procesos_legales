from ...models import PersonasNotificadas, Notificacion
from rest_framework import viewsets
from ..serializers import PersonasNotificadasSerializer
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from guardian.shortcuts import assign_perm, get_objects_for_user

class PersonasNotificadasView(viewsets.ModelViewSet):
    queryset = PersonasNotificadas.objects.all()
    serializer_class = PersonasNotificadasSerializer



    def create(self, request, *args, **kwargs):
        instance = request.data
        serializer = PersonasNotificadasSerializer(data=instance)
        serializer.is_valid(raise_exception=True)
        notificado = serializer.save()
        return Response({"mensaje": "se agrego una persona"})

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        notificacion = Notificacion.objects.get(pk=instance.notificacion.id)
        user = self.request.user
        check_permission = user.has_perm('modificar',notificacion)
        if  check_permission:
            serializer = PersonasNotificadasSerializer(
                instance=instance,
                data=request.data,
                context={'request': request}
            )
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)
        else:
            return Response({"mensaje":"tu no tienes permiso"})
        return Response(request)

    def retrieve(self, request, pk=None):
        queryset = PersonasNotificadas.objects.get(id=pk)
        notificacion = Notificacion.objects.get(pk=queryset.notificacion.id)
        user = self.request.user
        check_permission = user.has_perm('ver',notificacion)
        if  check_permission:
            serializer = PersonasNotificadasSerializer(queryset)
            return Response(serializer.data)
        else:
            return Response({"mensaje": "tu no tienes permiso para ver el registro"})
    
    def destroy(self, request, pk=None):
        try:
            instance = self.get_object()
            notificacion = Notificacion.objects.get(pk=instance.notificacion.id)
            user = self.request.user
            check_permission = user.has_perm('modificar',notificacion)
            if  check_permission:
                instance.delete()
                return Response('el registro fue eliminado')
            else:
                return Response({'mensaje':'tu no tienes permiso para eliminar el registro'})
        except:
            return Response(status=status.HTTP_204_NO_CONTENT)
        
        return Response('hola2')