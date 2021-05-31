from django.contrib import admin
from .models import Inspection


@admin.register(Inspection)
class InspectionAdmin(admin.ModelAdmin):
    pass
