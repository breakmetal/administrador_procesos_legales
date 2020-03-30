from ...models import Ejecutivo, Proceso
from rest_framework import viewsets
from ..serializers import EjecutivoSerializer
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from guardian.shortcuts import assign_perm, get_objects_for_user


class EjecutivoViewSet(viewsets.ModelViewSet):
    queryset = Ejecutivo.objects.all()
    serializer_class = EjecutivoSerializer

    def list(self, request):
        pass

    def create(self, request, *args, **kwargs):
        instance = request.data
        serializer = EjecutivoSerializer(
                data=request.data,
                context={'request': request}
            )
        serializer.is_valid(raise_exception=True)
        ejecutivo = serializer.save()
        assign_perm("asignar_permisos", request.user, ejecutivo)
        assign_perm("ver", request.user, ejecutivo)
        assign_perm("agregar", request.user, ejecutivo)
        assign_perm("modificar", request.user, ejecutivo)
        assign_perm("eliminar", request.user, ejecutivo)
        return Response({"mensaje": "el registro fue agregado"})
        
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        user = self.request.user
        check_permission = user.has_perm('modificar',instance)
        if  check_permission:
            serializer = EjecutivoSerializer(
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
        ejecutivo = Ejecutivo.objects.get(pk=pk)
        user = self.request.user
        check_permission = user.has_perm('ver',ejecutivo)
        if  check_permission:
            serializer = EjecutivoSerializer(ejecutivo)
            return Response(serializer.data)
        else:
            return Response({"mensaje": "tu no tienes permiso para ver el registro"})
            
    
    def destroy(self, request, pk=None):
        try:
            instance = Ejecutivo.objects.get(id)
            user = self.request.user
            check_permission = user.has_perm('eliminar',instance)
            if  check_permission:
                instance.delete()
                return Response('el registro fue eliminado')
            else:
                return Response('tu no tienes permiso para eliminar el registro')
        except:
            return Response(status=status.HTTP_204_NO_CONTENT)
        
        return Response('hola2')