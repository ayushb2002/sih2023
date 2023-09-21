from django.shortcuts import render, HttpResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import RescueTeam, RequestHelp, RequestItems, Member

def index(request):
    context = {}
    if request.session.get('username'):
        context['username'] = request.session.get('username')
        context['name'] = request.session.get('name')
    return render(request, 'index.html', context)

def memberReg(request):
    if request.session.get('username'):
        context = {}
        context['username'] = request.session.get('username')
        context['name'] = request.session.get('name')
        return render(request, 'welcome.html', context)
    
    return render(request, 'register/member.html')

def serviceReg(request):
    if request.session.get('username'):
        context = {}
        context['username'] = request.session.get('username')
        context['name'] = request.session.get('name')
        return render(request, 'welcome.html', context)
    
    return render(request, 'register/service.html')

def memberLog(request):
    if request.session.get('username'):
        context = {}
        context['username'] = request.session.get('username')
        context['name'] = request.session.get('name')
        return render(request, 'welcome.html', context)
    
    return render(request, 'login/member.html')

def serviceLog(request):
    if request.session.get('username'):
        context = {}
        context['username'] = request.session.get('username')
        context['name'] = request.session.get('name')
        return render(request, 'welcome.html', context)
    
    return render(request, 'login/service.html')

def registerMember(request):
    if request.session.get('username'):
        context = {}
        context['username'] = request.session.get('username')
        context['name'] = request.session.get('name')
        return render(request, 'welcome.html', context)
    
    if request.method == 'POST':
        try:
            fname = request.POST.get('fname')
            lname = request.POST.get('lname')
            email = request.POST.get('email')+"@suraksha.com"
            password = request.POST.get('password')
            
            if User.objects.filter(username=email):
                return HttpResponse('User already exists!')
            
            user = User.objects.create_user(username=email, email=email, password=password)
            user.first_name = fname
            user.last_name = lname
            user.save()
            
            request.session['username'] = email
            request.session['name'] = fname + ' ' + lname
            
            return render(request, 'welcome.html', {'username': request.session['username'], 'name': request.session['name']})
        except:
            return HttpResponse('Could not create user')
    else:
        if request.session.get('username'):
            return render(request, 'welcome.html', {'username': request.session['username'], 'name': request.session['name']})
        else:
            return HttpResponse('Method not allowed!')

def login(request):
    if request.session.get('username'):
        context = {}
        context['username'] = request.session.get('username')
        context['name'] = request.session.get('name')
        return render(request, 'welcome.html', context)
    
    return render(request, 'login.html')

def registerService(request):
    if request.session.get('username'):
        context = {}
        context['username'] = request.session.get('username')
        context['name'] = request.session.get('name')
        return render(request, 'welcome.html', context)
    
    if request.method == 'POST':
        try:
            team_name = request.POST.get('name')
            category = request.POST.get('category')
            email = request.POST.get('email')+"@suraksha.com"
            password = request.POST.get('password')
            addr_line_1 = request.POST.get('line1')
            addr_line_2 = request.POST.get('line2')
            city = request.POST.get('city')
            state = request.POST.get('state')
            pincode = request.POST.get('pincode')
            gps = request.POST.get('gps')
            contact = request.POST.get('contact')
            
            if RescueTeam.objects.filter(email=email):
                return HttpResponse('User already exists!')
            
            rescue_team = RescueTeam.objects.create(team_name=team_name, category=category, email=email, password=password, contact=contact, address_line_1=addr_line_1, address_line_2=addr_line_2, city=city, state=state, pincode=pincode, gps_coordinate=gps)
            rescue_team.save()
            
            request.session['username'] = email
            request.session['name'] = team_name
            
            return render(request, 'welcome.html', {'username': request.session['username'], 'name': request.session['name']})
        except Exception as e:
            print(e)
            return HttpResponse('Could not create user')
    else:
        if request.session.get('username'):
            return render(request, 'welcome.html', {'username': request.session['username'], 'name': request.session['name']})
        else:
            return HttpResponse('Method not allowed!')
        
def loginMember(request):
    if request.session.get('username'):
        context = {}
        context['username'] = request.session.get('username')
        context['name'] = request.session.get('name')
        return render(request, 'welcome.html', context)
    
    if request.method == 'POST':
        try:
            email = request.POST.get('email')+"@suraksha.com"
            password = request.POST.get('password')     
            
            user = authenticate(username=email, password=password)
            if user is not None:
                request.session['username'] = email
                request.session['name'] = user.first_name + ' ' + user.last_name
                context = {
                    "username": email,
                    "name": user.first_name + ' ' + user.last_name
                }
                return render(request, "welcome.html", context)
            else:
                return HttpResponse('Invalid username or password!')
        except Exception as e:
            return HttpResponse(e)
    else:
        return HttpResponse('Method not allowed!')

def loginService(request):
    if request.session.get('username'):
        context = {}
        context['username'] = request.session.get('username')
        context['name'] = request.session.get('name')
        return render(request, 'welcome.html', context)
    
    if request.method == 'POST':
        try:
            email = request.POST.get('email')+"@suraksha.com"
            password = request.POST.get('password')     
            
            team = RescueTeam.objects.get(email=email, password=password)
            if team is not None:
                request.session['username'] = team.email
                request.session['name'] = team.team_name
                context = {
                    "username": team.email,
                    "name": team.team_name
                }
                return render(request, "welcome.html", context)
            else:
                return HttpResponse('Invalid username or password!')
        except Exception as e:
            return HttpResponse(e)
    else:
        return HttpResponse('Method not allowed!')

def logout(request):
    del request.session['username']
    del request.session['name']
    return render(request, "index.html", {})