from ...models import Cautelar,Proceso 
from rest_framework import viewsets
from ..serializers import CautelarSerializer
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework.decorators import action
from guardian.shortcuts import assign_perm, get_objects_for_user

class CautelarViewSet(viewsets.ModelViewSet):
    queryset = Cautelar.objects.all()
    serializer_class = CautelarSerializer

    def get_queryset(self):
        user = self.request.user
        cautelares = get_objects_for_user(user, 'ver', klass=Cautelar)
        return cautelares

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
        queryset = self.get_queryset() 
        page = self.paginate_queryset(queryset)
        serializer_context = {'request': request}
        serializer = self.serializer_class(
            page, context=serializer_context, many=True
        )
        return self.get_paginated_response(serializer.data)

    def update(self, request, pk = None):
        instance = Cautelar.objects.get(id = pk)
        user = self.request.user
        proceso = Proceso.objects.get(id = instance.proceso.id)
        check_permission = user.has_perm('modificar',proceso)
        if  check_permission:
            serializer = CautelarSerializer(
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
        cautelar = Cautelar.objects.get(id = pk)
        proceso = Proceso.objects.get(id = cautelar.proceso.id)
        check_permission = user.has_perm('ver',proceso)
        if check_permission:
            serializer = self.get_serializer(cautelar)
            return Response(serializer.data)
        else:
            return Response({"mensaje": "tu no tienes permiso"})
            
    
    def destroy(self, request, pk=None):
        try:
            instance = Cautelar.objects.get(id = pk)
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
    def listar_cautelares(self, request, pk = None):
        user = self.request.user
        proceso = Proceso.objects.get(id = pk)
        check_permission = user.has_perm('ver',proceso)
        if check_permission:
            cautelares = Cautelar.objects.filter(proceso = proceso.id)
            page = self.paginate_queryset(cautelares)
            serializer_context = {'request': cautelares}
            serializer = self.get_serializer(
            page, many=True
        )
            return self.get_paginated_response(serializer.data)
        else:
            return Response('tu no tienes permiso para ver los registros')

    
    @action(detail=True, methods=['get'])
    def contar_cautelares(self, request, pk = None):
        user = self.request.user
        proceso = Proceso.objects.get(id = pk)
        check_permission = user.has_perm('ver',proceso)
        if check_permission:
            cautelares = Cautelar.objects.filter(proceso = proceso.id).count()
            return Response(cautelares)
        else:
            return Response('tu no tienes permiso para ver los registros')