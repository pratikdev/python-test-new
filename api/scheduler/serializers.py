from .models import Inspection
from rest_framework import serializers


class InspectionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Inspection
        fields = ["title", "start_date", "end_date"]
