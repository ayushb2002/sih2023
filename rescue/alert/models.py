from django.db import models
from portal.models import RescueTeam
from django.contrib.auth.models import User
from django.contrib.postgres.fields import ArrayField

class Alert(models.Model):
    from_employee = models.ForeignKey(User, on_delete=models.CASCADE, null=False, blank=False)
    from_team = models.ForeignKey(RescueTeam, on_delete=models.CASCADE, null=False, blank=False)
    location = models.CharField(max_length=100, null=False, blank=False)
    city = models.CharField(max_length=100, null=False, blank=False)
    state = models.CharField(max_length=100, null=False, blank=False)
    categories = ArrayField(models.CharField(max_length=50, null=False, blank=False))
    description = models.CharField(max_length=400, null=False, blank=True)