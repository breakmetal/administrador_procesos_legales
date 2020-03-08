from ..models import *
from rest_framework import serializers
    
class ActuacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Actuacion
        fields = '__all__'

class ArchivoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Archivo
        fields = '__all__'

class CautelarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cautelar
        fields = '__all__'
    
class EjecutivoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ejecutivo
        fields = '__all__'

class NotificacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notificacion
        fields = '__all__'

class PartesNSerializer(serializers.ModelSerializer):
    class Meta:
        model = Partesn
        fields = '__all__'

class PartesJSerializer(serializers.ModelSerializer):
    class Meta:
        model = Partesj
        fields = '__all__'

class ProcesoSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    class Meta:
        model = Proceso
        fields = '__all__'