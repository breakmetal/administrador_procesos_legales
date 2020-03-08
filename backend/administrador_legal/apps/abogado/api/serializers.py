from rest_framework import serializers
from django.contrib.auth.models import User
from ..models import *

class AbogadoSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Abogado
        fields = ('documento', 'telefono', 'especialidad', 'nacimiento')


class UserSerializer(serializers.ModelSerializer):
    abogado = AbogadoSerializer(many = False)
    password = serializers.CharField(write_only=True)
    last_login = serializers.DateTimeField(read_only=True)

    class Meta:
        model = User
        fields = ('last_login' , 'username', 'first_name', 'last_name', 'email', 'password', 'abogado')

    def create(self, validated_data):
        abogado_data = validated_data.pop('abogado')
        user = User.objects.create(**validated_data)
        Abogado.objects.create(user = user, **abogado_data)
        return user 

class EmpresaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Empresa
        fields = ('abogado','documento', 'nombre', 'actividad', 'contact_info')

class PersonaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Persona
        fields = ('abogado''documento', 'nombre', 'actividad', 'contact_info')
