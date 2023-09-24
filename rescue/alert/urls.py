from django.urls import path
from . import views

urlpatterns = [
    path("raiseAlert", views.raiseAlert, name="raiseAlert"),
    path("sendAlert", views.sendAlert, name="sendAlert"),
    path("viewRaisedAlert", views.viewRaisedAlert, name="viewRaisedAlert"),
    path("loginAuthority", views.app_login_authority, name="loginAuthority"),
    path("loginEmployee", views.app_login_employee, name="loginEmploy"),
    path("registerAlert", views.register_app_alert, name="registerAlert"),
]