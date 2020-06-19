from ...models import Proceso
from ....despacho.models import Despacho, Juez
from rest_framework import generics
from rest_framework import viewsets
from ..serializers import ProcesoSerializer, DespachoSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.pagination import PageNumberPagination
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from guardian.shortcuts import assign_perm, get_objects_for_user

class ProcesoViewSet(viewsets.ModelViewSet):
    queryset = Proceso.objects.all()
    serializer_class = ProcesoSerializer
    

    def get_queryset(self):
        user = self.request.user.id
        procesos = Proceso.objects.filter(user = user)
        return procesos

        
    def list(self, request):
        queryset = self.get_queryset() 
        page = self.paginate_queryset(queryset)
        serializer_context = {'request': request}
        serializer = self.serializer_class(
            page, context=serializer_context, many=True
        )
        return self.get_paginated_response(serializer.data)

    def create(self, request, *args, **kwargs):
        instance = request.data
        serializer = ProcesoSerializer(
                data=request.data,
                context={'request': request}
            )
        serializer.is_valid(raise_exception=True)
        proceso = serializer.save()
        assign_perm("asignar_permisos", request.user, proceso)
        assign_perm("ver", request.user, proceso)
        assign_perm("agregar", request.user, proceso)
        assign_perm("modificar", request.user, proceso)
        assign_perm("eliminar", request.user, proceso)
        return Response({"mensaje": "el proceso fue creado"})

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        user = self.request.user
        check_permission = user.has_perm('modificar',instance)
        if  check_permission:
            serializer = ProcesoSerializer(
                instance=instance,
                data=request.data,
                context={'request': request}
            )
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)
        else:
            return Response("tu no tienes permiso")

    def destroy(self, request, pk=None):
        try:
            instance = Proceso.objects.get(id=pk)
            user = self.request.user
            check_permission = user.has_perm('eliminar',instance)
            if check_permission:
                instance.delete()
                return Response('el proceso fue eliminado')
            else:
                return Response('tu no tienes permiso para eliminar el proceso')
        except Exception as e:
            return Response(e.message, type(e))
        

    def retrieve(self, request, pk=None):
        queryset = self.get_queryset()
        proceso= get_object_or_404(queryset, pk=pk)
        serializer = ProcesoSerializer(proceso)
        return Response(serializer.data)
 
    def obtener_procesos_compartidos(self):
        user = self.request.user
        procesos = get_objects_for_user(user, 'ver', klass=Proceso)
        return procesos
    
    @action(detail=True, methods=['get'])
    def listar_procesos(self, request, pk = None):
        user = self.request.user
        queryset = get_objects_for_user(user, 'ver', klass=Proceso)
        procesos = queryset.filter(id=pk)
        page = self.paginate_queryset(procesos)
        serializer_context = {'request': procesos}
        serializer = self.get_serializer(
            page, many=True
        )
        return self.get_paginated_response(serializer.data)
    
    @action(detail=True, methods=['get'])
    def obtener_proceso(self, request, pk=None):
        queryset = self.obtener_procesos_compartidos()
        proceso= get_object_or_404(queryset, pk=pk)
        serializer = ProcesoSerializer(proceso)
        return Response(serializer.data)


class DespachoViewSet(viewsets.ModelViewSet):
    serializer_class = DespachoSerializer
    #paginate_by = None
    queryset = Despacho.objects.all()
        
    def get_queryset(self):
        queryset = Despacho.objects.all()
        return queryset

    def list(self, request):
        queryset = self.get_queryset()
        nombre = self.request.query_params.get('despacho', None)
        queryset = queryset.filter(despacho__contains = nombre)
        serializer = DespachoSerializer(queryset, many = True)
        return  Response(serializer.data)

#http://localhost:4200/dashboard/proceso/listar-procesos