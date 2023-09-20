from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("member", views.member, name="member"),
    path("registerMember", views.registerMember, name="registerMember"),
    path("login", views.login, name="login"),
    path("loginUser", views.loginUser, name="loginUser"),
    path("logout", views.logout, name="logout"),
]