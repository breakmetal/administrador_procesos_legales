from ..models import * 
from rest_framework import viewsets
from .serializers import *
from rest_framework.response import Response
from rest_framework import status

class ActuacionViewSet(viewsets.ModelViewSet):
    queryset = Actuacion.objects.all()
    serializer_class = ActuacionSerializer

class ArchivoViewSet(viewsets.ModelViewSet):
    queryset = Archivo.objects.all()
    serializer_class = ArchivoSerializer

class CautelarViewSet(viewsets.ModelViewSet):
    queryset = Cautelar.objects.all()
    serializer_class = CautelarSerializer

class EjecutivoViewSet(viewsets.ModelViewSet):
    queryset = Ejecutivo.objects.all()
    serializer_class = EjecutivoSerializer

class NotificacionViewSet(viewsets.ModelViewSet):
    queryset = Notificacion.objects.all()
    serializer_class = NotificacionSerializer

class ParteNViewSet(viewsets.ModelViewSet):
    queryset = Partesn.objects.all()
    serializer_class = PartesNSerializer

class ParteJViewSet(viewsets.ModelViewSet):
    queryset = Partesj.objects.all()
    serializer_class = PartesJSerializer

class ProcesoViewSet(viewsets.ModelViewSet):
    queryset = Proceso.objects.all()
    serializer_class = ProcesoSerializer

    def get_queryset(self):
        user = self.request.user.id
        return Proceso.objects.filter(user = user)

        
    def list(self, request):
        queryset = self.get_queryset() 
        serializer = ProcesoSerializer(queryset, many = True)
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        user = self.request.user.id
        if user == instance.user_id:
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
        instance = self.get_object()
        try:
            instance = self.get_object()
            user = self.request.user.id
            if user == instance.user_id:
                instance.delete()
                return Response('el proceso fue eliminado')
            else:
                return Response('tu no tienes permiso para eliminar el proceso')
        except:
            return Response(status=status.HTTP_204_NO_CONTENT)
        
        return Response('hola2')
        
        


