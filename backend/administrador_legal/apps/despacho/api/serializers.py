from rest_framework import serializers
from django.contrib.auth.models import User
from ..models import *


class JuezSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Juez
        fields = '__all__'

class DespachoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Despacho
        fields = [
            'departamento',
            'ciudad',
            'corporacion',
            'especialidad',
            'despacho',
            'direccion',
            'telefono',
            'juez',
            ]
        