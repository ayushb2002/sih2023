from django.urls import path
from . import views

urlpatterns = [
    path("raiseAlert", views.raiseAlert, name="raiseAlert"),
    path("sendAlert", views.sendAlert, name="sendAlert"),
    path("viewRaisedAlert", views.viewRaisedAlert, name="viewRaisedAlert"),
]