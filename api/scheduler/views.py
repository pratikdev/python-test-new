from scheduler.models import Inspection
from rest_framework import viewsets
from rest_framework import permissions
from scheduler.serializers import InspectionSerializer


class InspectionViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows inspections to be viewed or edited.
    """

    queryset = Inspection.objects.all().order_by("-end_date")
    serializer_class = InspectionSerializer
    # permission_classes = [permissions.IsAuthenticated]
