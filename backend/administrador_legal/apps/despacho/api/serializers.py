from rest_framework import serializers
from django.contrib.auth.models import User
from ..models import *


class JuezSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Juez
        fields = '__all__'

class DespachoSerializer(serializers.ModelSerializer):
    juez= serializers.HyperlinkedRelatedField(
        many=False,
        read_only=True,
        view_name='juez-detail',
    )
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
        