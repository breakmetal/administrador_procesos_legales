from ...models import Proceso
from rest_framework import viewsets
from ..serializers import ProcesoSerializer
from rest_framework.response import Response
from rest_framework import status


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