from django.contrib import admin
from .models import RequestHelp, RequestItems, RescueTeam, Member
# Register your models here.
admin.site.register(RequestHelp)
admin.site.register(RequestItems)
admin.site.register(RescueTeam)
admin.site.register(Member)