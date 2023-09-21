from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("register/member", views.memberReg, name="register/member"),
    path("register/service", views.serviceReg, name="register/service"),
    path("registerMember", views.registerMember, name="registerMember"),
    path("registerService", views.registerService, name="registerService"),
    path("login/member", views.memberLog, name="login/member"),
    path("login/service", views.serviceLog, name="login/service"),
    path("loginMember", views.loginMember, name="loginMember"),
    path("loginService", views.loginService, name="loginService"),
    path("logout", views.logout, name="logout"),
]