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
    path("welcome", views.welcome, name="welcome"),
    path("addMember", views.addMember, name="addMember"),
    path("addMemberResponse", views.addMemberResponse, name="addMemberResponse"),
    path("viewMembers", views.viewMembers, name="viewMembers"),
    path("updateMembers", views.findAndDeleteTeamMember, name="updateMembers"),
    path("requestItems", views.requestItems, name="requestItems"),
    path("recordRequestedItems", views.recordRequestedItems, name="recordRequestedItems"),
    path("trackItems", views.trackItemRequests, name="trackItems"),
    path("grantItems", views.grantItems, name="grantItems"),
    path("acceptRequest", views.acceptRequestForItems, name="acceptRequest"),
    path("viewAcceptedRequest", views.viewAcceptedItemRequests, name="viewAcceptedRequest"),
]