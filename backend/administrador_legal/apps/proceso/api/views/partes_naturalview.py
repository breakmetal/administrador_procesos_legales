from ...models import Proceso, Partesn
from rest_framework import viewsets
from ..serializers import PartesNSerializer
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from guardian.shortcuts import assign_perm, get_objects_for_user

class ParteNViewSet(viewsets.ModelViewSet):
    queryset = Partesn.objects.all()
    serializer_class = PartesNSerializer

    def create(self, request, *args, **kwargs):
        instance = request.data
        user = self.request.user
        proceso = Proceso.objects.get(id = instance["proceso"])
        if proceso.user.id == request.user.id:
            serializer = PartesNSerializer(data=instance)
            serializer.is_valid(raise_exception=True)
            parte = serializer.save()
            return Response({"mensaje": "el registro fue agregado"})
        else:
            return Response({"mensaje": "tu no tienes permiso"})
        
    def list(self, request):
        pass

    def update(self, request, *args, **kwargs):
       pass

    def partial_update(self, request, pk=None):
        instance = Partesn.objects.get(id = pk)
        user = self.request.user
        proceso = Proceso.objects.get(id = instance.proceso.id)
        check_permission = user.has_perm('modificar',proceso)
        if  check_permission:
            serializer = self.get_serializer(
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
        queryset = Partesn.objects.get(id = pk)
        proceso = Proceso.objects.get(id = queryset.proceso.id)
        user = self.request.user
        check_permission =  user.has_perm('ver', proceso)
        if check_permission:
            serializer = PartesNSerializer(queryset)
            return Response(serializer.data)
        else:
            return Response({"mensaje":"tu no tienes permiso"})
        
    
    def destroy(self, request, pk=None):
        try:
            queryset = Partesn.objects.get(id = pk)
            proceso = Proceso.objects.get(id = queryset.proceso.id)
            user = self.request.user
            check_permission =  user.has_perm('eliminar', proceso)
            if  check_permission:
                queryset.delete()
                return Response({"mensaje":"el registro fue eliminado"})
            else:
                return Response({"mensaje":"tu no tienes permiso"})
        except:
            return Response(status=status.HTTP_204_NO_CONTENT)
        