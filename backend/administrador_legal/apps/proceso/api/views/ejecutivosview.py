from ...models import Ejecutivo, Proceso
from rest_framework import viewsets
from ..serializers import EjecutivoSerializer, ProcesoSerializer
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
        proceso = Proceso.objects.get(id = instance['proceso'])
        user = request.user.id
        if proceso.user.id == user:
            serializer = self.get_serializer(
                data=request.data,
                context={'request': request}
            )
            serializer.is_valid(raise_exception=True)
            ejecutivo = serializer.save()
            return Response({"mensaje": "el registro fue agregado"})
        else:
            return Response({"mensaje": "no puedes hacer eso"})
        
        
    def update(self, request, pk = None):
        instance = Ejecutivo.objects.get(id = pk)
        user = self.request.user
        proceso = Proceso.objects.get(id = instance.proceso.id)
        check_permission = user.has_perm('modificar',proceso)
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
            return Response({"mensaje": "tu no tienes permiso"})

    def retrieve(self, request, pk=None):
        try:
            ejecutivo =  Ejecutivo.objects.get(proceso = pk)
            user = self.request.user
            proceso = Proceso.objects.get(id = pk)
            check_permission = user.has_perm('ver',proceso)
            if  check_permission:
                serializer = EjecutivoSerializer(ejecutivo)
                return Response(serializer.data)
            else:
                return Response({"mensaje": "tu no tienes permiso para ver el registro"})
            
        except:
            return Response('')
    
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