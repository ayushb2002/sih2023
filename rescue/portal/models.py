from django.db import models
from django.contrib.auth.models import User
from django.contrib.postgres.fields import ArrayField

class RescueTeam(models.Model):
    team_id = models.ForeignKey(User, on_delete=models.CASCADE, null=False, blank=False)
    team_size = models.IntegerField(null=False, blank=False)
    address_line_1 = models.CharField(max_length=30, null=False, blank=False)
    address_line_2 = models.CharField(max_length=30, null=True, blank=True)
    city = models.CharField(max_length=30, null=False, blank=False)
    state = models.CharField(max_length=30, null=False, blank=False)
    gps_coordinate = models.CharField(max_length=50, null=False, blank=False)
    contact = models.CharField(max_length=100, null=False, blank=False)
    category = ArrayField(models.CharField(max_length=100, null=False, blank=False))
    
    def __str__(self):
        return self.category

class RequestItems(models.Model):
    _from = models.ForeignKey(RescueTeam, on_delete=models.CASCADE, null=False, blank=False)
    requested_category = models.CharField(max_length=100, null=False, blank=False)
    requested_items = ArrayField(models.CharField(max_length=100))
    requested_quantity = ArrayField(models.IntegerField())
    requested_items_desc = ArrayField(models.CharField(max_length=100))
    deadline = models.DateField(null=False, blank=False)
    priority_call = models.BooleanField(null=False, blank=False, default=False)
    completed = models.BooleanField(null=False, blank=False, default=False)    
    
class RequestHelp(models.Model):
    _from = models.ForeignKey(RescueTeam, on_delete=models.CASCADE, blank=False)
    description = models.CharField(max_length=200, null=False, blank=False)
    categories_requested = ArrayField(models.CharField(max_length=50), null=False, blank=False)
    deadline = models.DateField(null=False, blank=False)
    completed = models.BooleanField(null=False, blank=False, default=False)   
    priority_call = models.BooleanField(null=False, blank=False, default=False)