from django.shortcuts import render, HttpResponse
from portal.models import RescueTeam, Member
from django.contrib.auth.models import User
from .models import Alert
from django.db.models import Q
from .consumers import AlertConsumer 
from django.http import JsonResponse
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

def websocket_send_alert(alert):
    channel_layer = get_channel_layer()
    data = {
        "type": "send_alert",
        "description": alert.description,
        "categories": alert.categories,
        "city": alert.city,
        "state": alert.state,
        "location": alert.location
    }
    city = alert.city.replace(" ", "")
    state = alert.state.replace(" ", "")
    
    async_to_sync(channel_layer.group_send)(
        f'alert_{city}_{state}',
        data
    )

def raiseAlert(request):
    if not request.session.get('username'):
        return HttpResponse('404! Page not found!')
    
    context = {}
    context['username'] = request.session.get('username')
    context['name'] = request.session.get('name')
    context['type'] = request.session.get('type')
    
    user = User.objects.get(username=request.session.get('username'))
    member = Member.objects.get(user=user)
    team = RescueTeam.objects.get(id=member.team.id)
    context["city"] = team.city
    context["state"] = team.state
    
    return render(request, "alert/sendAlert.html", context)

def viewRaisedAlert(request):
    if not request.session.get('username'):
        return HttpResponse('404! Page not found!')
    
    context = {}
    context['username'] = request.session.get('username')
    context['name'] = request.session.get('name')
    context['type'] = request.session.get('type')
    
    user = User.objects.get(username=request.session.get('username'))
    member = Member.objects.get(user=user)
    team = RescueTeam.objects.get(id=member.team.id)
    alerts = Alert.objects.filter(city=team.city, state=team.state).values()
    alertList = []
    
    for alert in alerts:
        alertList.append(
            {
                "description": alert.description,
                "location": alert.location,
                "city": alert.city,
                "state": alert.state,
                "categories": alert.categories
            }
        )
    
    context["alertList"] = alertList
    return render(request, "alert/viewAlert.html", context)

def sendAlert(request):
    if not request.session.get('username'):
        return HttpResponse('404! Page not found!')
    
    context = {}
    context['username'] = request.session.get('username')
    context['name'] = request.session.get('name')
    context['type'] = request.session.get('type')
    
    if request.method == "POST":
        try:
            user = User.objects.get(username=request.session.get('username'))
            member = Member.objects.get(user=user)
            team = RescueTeam.objects.get(id=member.team.id)
            location = request.POST.get('gps')
            city = request.POST.get('city').upper()
            state = request.POST.get('state').upper()
            description = request.POST.get('description')
            categories = request.POST.getlist('categories')
            categories = [i.upper() for i in categories]
            
            category_matches = Q()
            for category in team.category:
                category_matches |= Q(category__contains=[category])
                
            alert = Alert.objects.create(from_employee=user, from_team=team, location=location, city=city, state=state, categories=categories, description=description)
            alert.save()
            
            websocket_send_alert(alert)
            
            context['message'] = "Successfully raised alarm!"
            return render(request, 'alert/sendAlert.html', context=context)
            
        except Exception as e:
            print(e)
            return HttpResponse('Server error!')
        
def app_login_authority(request):
    if request.method == "POST":
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = User.objects.get(username=username, password=password)
        if user is None:
            return JsonResponse({"error": "Invalid username or password!"})
        
        team = RescueTeam.objects.get(user=user)
        if team is None:
            return JsonResponse({"error": "Team does not exist!"})
        
        return JsonResponse(
            {
                "success": True,
                "username": username,
                "name": user.first_name+" "+user.last_name,
                "city": team.city,
                "state": team.state
            }
        )
    else:
        return JsonResponse({"error": "Method not allowed!"})
    
def app_login_employee(request):
    if request.method == "POST":
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = User.objects.get(username=username, password=password)
        if user is None:
            return JsonResponse({"error": "Invalid username or password!"})
        
        member = Member.objects.get(user=user)
        if member is None:
            return JsonResponse({"error": "Employee not registered under any authority!"})
        
        team = RescueTeam.objects.get(id=member.team.id)
        if team is None:
            return JsonResponse({"error": "Team does not exist!"})
        
        return JsonResponse(
            {
                "success": True,
                "username": username,
                "name": user.first_name+" "+user.last_name,
                "city": team.city,
                "state": team.state
            }
        )
    else:
        return JsonResponse({"error": "Method not allowed!"})