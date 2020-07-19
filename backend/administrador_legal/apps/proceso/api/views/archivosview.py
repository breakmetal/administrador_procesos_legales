from ...models import * 
from rest_framework import viewsets
from ..serializers import ArchivoSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from guardian.shortcuts import assign_perm, get_objects_for_user

class ArchivoViewSet(viewsets.ModelViewSet):
    queryset = Archivo.objects.all()
    serializer_class = ArchivoSerializer
    parser_classes = (MultiPartParser, FormParser)

    formatos = ("xlsx", "xlsm", "xlsb",
                "xltm", "xls", "xlt",
                "xml", "xlw", "prn", "txt",
                "ods", "pdf", "bmp", "gif",
                "jpg", "png", "doc", "psd",
                "svg", "docm", "docx", "rtf"
               )

    def get_queryset(self):
        user = self.request.user
        archivos= get_objects_for_user(user, 'ver', klass=Archivo)
        return archivos

    def list(self, request):
        pass

    def create(self, request, *args, **kwargs):
        proceso = Proceso.objects.get(id = request.data["proceso"])
        user = self.request.user
        check_permission = user.has_perm('agregar', proceso)
        if check_permission or proceso.user == user.id:
            extension = self.verificar_extension(request.FILES['archivo'].name)
            if extension != "404":
                archivos_check = self.estructurar_datos(request, extension)
                serializer = ArchivoSerializer(
                    data=archivos_check,
                    context={'request': request}
                )
                serializer.is_valid(raise_exception=True)
                archivo = serializer.save()
                return Response({'mensaje':'El registro se ha creado'})
            else:
                return Response({"mensaje":"lo siento pero el formato del archivo no esta permitido"})
        else:
            return Response({"mensaje":"no tienes permiso de agregar"})
            
    def update(self, request, pk=None):
        pass

    def partial_update(self, request, pk=None):
        instance = Archivo.objects.get(id = pk)
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
            return Response("tu no tienes permiso")

    
    def retrieve(self, request, pk=None):
        user = self.request.user
        archivo = Archivo.objects.get(id = pk)
        proceso = Proceso.objects.get(id = archivo.proceso.id)
        check_permission = user.has_perm('ver',proceso)
        if check_permission:
            serializer = self.get_serializer(archivo)
            return Response(serializer.data)
        else:
            return Response({"mensaje": "tu no tienes permiso"})      

    def destroy(self, request, pk=None):  
        try:
            instance = Archivo.objects.get(id = pk)
            user = self.request.user
            proceso = Proceso.objects.get(id = instance.proceso.id)
            check_permission = user.has_perm('eliminar',proceso)
            if check_permission:
                instance = Archivo.objects.get(id = pk)
                instance.delete()
                return Response('el archivo fue eliminado')
            else:
                return Response('tu no tienes permiso para eliminar el archivo')
        except:
            return Response(status=status.HTTP_204_NO_CONTENT)
        
        return Response('hola2')


    def verificar_extension(self, nombre: str):
        """ obtiene la extension del archivo 
        sin importar si el nombre del archivo 
        tine mas de un punto"""
        extension = nombre.split(".")[-1]
        if extension in self.formatos:
            return extension
        else:
            return "404"

    def estructurar_datos(self, request, extension):
        """ Debido a que no se puede modificar lo que hay en request
        pues estructure un nuevo directorio en el que introduje la 
        extension del archivo """
        archivos_check = {
                'proceso' : request.data.get('proceso'),
                'archivo' : request.FILES['archivo'],
                'extension': extension,
                'descripcion': request.data.get('descripcion')
            }
        return archivos_check


    @action(detail=True, methods=['get'])
    def listar_archivos(self, request, pk = None):
        user = self.request.user
        proceso = Proceso.objects.get(id = pk)
        check_permission = user.has_perm('ver',proceso)
        if check_permission:
            archivos = Archivo.objects.filter(proceso = proceso.id)
            page = self.paginate_queryset(archivos)
            serializer_context = {'request': archivos}
            serializer = self.get_serializer(
            page, many=True
        )
            return self.get_paginated_response(serializer.data)
        else:
            return Response('tu no tienes permiso para ver los registros')

    
    
    @action(detail=True, methods=['get'])
    def contar_archivos(self, request, pk = None):
        user = self.request.user
        proceso = Proceso.objects.get(id = pk)
        check_permission = user.has_perm('ver',proceso)
        if check_permission:
            archivos = Archivo.objects.filter(proceso = proceso.id).count()
            return Response(archivos)
        else:
            return Response('tu no tienes permiso para ver los registros')