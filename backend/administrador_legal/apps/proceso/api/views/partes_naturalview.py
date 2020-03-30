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

    def get_queryset(self):
        user = self.request.user
        partes_naturales = get_objects_for_user(user, 'ver', klass=Partesn)
        return partes_naturales

    def create(self, request, *args, **kwargs):
        instance = request.data
        serializer = PartesNSerializer(data=instance)
        serializer.is_valid(raise_exception=True)
        parte = serializer.save()
        assign_perm("asignar_permisos", request.user, parte)
        assign_perm("ver", request.user, parte)
        assign_perm("agregar", request.user, parte)
        assign_perm("modificar", request.user, parte)
        assign_perm("eliminar", request.user, parte)
        return Response({"mensaje": "se agrego una persona"})

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
            serializer = PartesNSerializer(
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
        queryset = self.get_queryset()
        parte = get_object_or_404(queryset, pk=pk)
        serializer = PartesNSerializer(parte)
        return Response(serializer.data)
            
    
    def destroy(self, request, pk=None):
        instance = self.get_object()
        try:
            instance = self.get_object()
            user = self.request.user
            check_permission = user.has_perm('eliminar',instance)
            if  check_permission:
                instance.delete()
                return Response({'mensaje':'el registro fue eliminado'})
            else:
                return Response({'mensaje':'tu no tienes permiso para eliminar el registro'})
        except:
            return Response(status=status.HTTP_204_NO_CONTENT)
        