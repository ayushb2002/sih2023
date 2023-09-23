from django.shortcuts import render, HttpResponse
from portal.models import RescueTeam, Member
from django.contrib.auth.models import User
from .models import Alert
from django.db.models import Q
from .consumers import AlertConsumer 

def raiseAlert(request):
    if not request.session.get('username'):
        return HttpResponse('404! Page not found!')
    
    context = {}
    context['username'] = request.session.get('username')
    context['name'] = request.session.get('name')
    context['type'] = request.session.get('type')
    
    return render(request, "alert/sendAlert.html", context)

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
            team = RescueTeam.objects.get(id=member.team_id)
            location = request.POST.get('location')
            city = request.POST.get('city')
            state = request.POST.get('state')
            description = request.POST.get('description')
            categories = request.POST.getList('categories')
            categories = [i.upper() for i in categories]
            
            category_matches = Q()
            for category in team.category:
                category_matches |= Q(category__contains=[category])

            available = RescueTeam.objects.filter(
                category_matches, answered=False, completed=False
            ).values()
            
            responders = []
            for data in available:
                responders.append(data.user)
                
            alert = Alert.objects.create(from_employee=user, from_team=team, location=location, city=city, state=state, categories=categories, description=description, responders=responders)
            alert.save()
            
            consumer = AlertConsumer()
            data = {
                "location": location,
                "city": city,
                "state": state,
                "description": description,
                "categories": categories
            }
            for responder in responders:
                consumer.send_alert(responder, data)
            
            context['message'] = "Successfully raised alarm!"
            return render(request, 'alert/sendAlert.html', context=context)
            
        except Exception as e:
            print(e)
            return HttpResponse('Server error!')