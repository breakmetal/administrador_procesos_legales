from ..models import *
from rest_framework import serializers
from ...abogado.models import Abogado, Persona, Empresa
    
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

class PersonaNaturalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Persona
        fields = [
                    'documento', 
                    'nombre',
                    'apellido',
                ]

class PersonaJuridicaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Empresa
        fields = [
                    'documento',
                    'nombre'
        ]

class PartesNSerializer(serializers.ModelSerializer):
    class Meta:
        model = Partesn
        fields = '__all__'
    

class PartesJSerializer(serializers.ModelSerializer):
    class Meta:
        model = Partesj
        fields = '__all__'



class PartesNDatosSerializer(serializers.ModelSerializer):
    persona = PersonaNaturalSerializer(many=False, read_only=True)
    class Meta:
        model = Partesn
        fields = '__all__'
    
        def create(self, validated_data):
            parte = Partesn.objects.create(**validated_data)
            assign_perm("asignar_permisos", request.user, parte)
            assign_perm("ver", request.user, parte)
            assign_perm("agregar", request.user, parte)
            assign_perm("eliminar", request.user, parte)
            assign_perm("modificar", request.user, parte)
            return parte

class PartesJDatosSerializer(serializers.ModelSerializer):
    empresa = PersonaJuridicaSerializer(many=False, read_only=True)
    class Meta:
        model = Partesj
        fields = '__all__'



class ProcesoSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    partesNaturales = PartesNDatosSerializer(many=True, read_only=True)
    partesJuridicas = PartesJDatosSerializer(many=True, read_only=True)
    class Meta:
        model = Proceso
        fields = '__all__'

class PersonasDatosNotificadasSerializer(serializers.ModelSerializer):
    persona = PersonaNaturalSerializer(many=False, read_only=True)
    class Meta:
        model = PersonasNotificadas
        fields = '__all__'

class EmpresasDatosNotificadasSerializer(serializers.ModelSerializer):
    empresa = PersonaJuridicaSerializer(many=False, read_only=True)
    class Meta:
        model = EmpresasNotificadas
        fields = '__all__'

class PersonasNotificadasSerializer(serializers.ModelSerializer):
    class Meta:
        model = PersonasNotificadas
        fields = '__all__'

class EmpresasNotificadasSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmpresasNotificadas
        fields = '__all__'

class NotificacionSerializer(serializers.ModelSerializer):
    personasNotificadas = PersonasDatosNotificadasSerializer(many=True, read_only=True)
    empresasNotificadas = EmpresasDatosNotificadasSerializer(many=True, read_only=True) 
    class Meta:
        model = Notificacion
        fields = '__all__'

