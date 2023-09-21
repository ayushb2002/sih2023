from django.shortcuts import render, HttpResponse, redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import RescueTeam, RequestHelp, RequestItems, Member

def index(request):
    if request.session.get('username'):
        context = {}
        context['username'] = request.session.get('username')
        context['name'] = request.session.get('name')
        context['type'] = request.session.get('type')
        return render(request, "auth/welcome.html", context)
        
    return render(request, 'index.html')

def memberReg(request):
    if request.session.get('username'):
        context = {}
        context['username'] = request.session.get('username')
        context['name'] = request.session.get('name')
        context['type'] = request.session.get('type')
        return render(request, 'auth/welcome.html', context)
    
    return render(request, 'register/member.html')

def serviceReg(request):
    if request.session.get('username'):
        context = {}
        context['username'] = request.session.get('username')
        context['name'] = request.session.get('name')
        context['type'] = request.session.get('type')
        return render(request, 'auth/welcome.html', context)
    
    return render(request, 'register/service.html')

def memberLog(request):
    if request.session.get('username'):
        context = {}
        context['username'] = request.session.get('username')
        context['name'] = request.session.get('name')
        context['type'] = request.session.get('type')
        return render(request, 'auth/welcome.html', context)
    
    return render(request, 'login/member.html')

def serviceLog(request):
    if request.session.get('username'):
        context = {}
        context['username'] = request.session.get('username')
        context['name'] = request.session.get('name')
        context['type'] = request.session.get('type')
        return render(request, 'auth/welcome.html', context)
    
    return render(request, 'login/service.html')

def registerMember(request):
    if request.session.get('username'):
        context = {}
        context['username'] = request.session.get('username')
        context['name'] = request.session.get('name')
        context['type'] = request.session.get('type')
        return render(request, 'auth/welcome.html', context)
    
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
            request.session['type'] = "member"
            
            return render(request, 'auth/welcome.html', {'username': request.session['username'], 'name': request.session['name'], "type": request.session['type']})
        except:
            return HttpResponse('Could not create user')
    else:
        if request.session.get('username'):
            return render(request, 'auth/welcome.html', {'username': request.session['username'], 'name': request.session['name']})
        else:
            return HttpResponse('Method not allowed!')

def login(request):
    if request.session.get('username'):
        context = {}
        context['username'] = request.session.get('username')
        context['name'] = request.session.get('name')
        context['type'] = request.session.get('type')
        return render(request, 'auth/welcome.html', context)
    
    return render(request, 'login.html')

def registerService(request):
    if request.session.get('username'):
        context = {}
        context['username'] = request.session.get('username')
        context['name'] = request.session.get('name')
        context['type'] = request.session.get('type')
        return render(request, 'auth/welcome.html', context)
    
    if request.method == 'POST':
        try:
            team_name = request.POST.get('name')
            category = request.POST.get('category').split(',')
            email = request.POST.get('email')+"@suraksha.com"
            password = request.POST.get('password')
            addr_line_1 = request.POST.get('line1')
            addr_line_2 = request.POST.get('line2')
            city = request.POST.get('city')
            state = request.POST.get('state')
            pincode = request.POST.get('pincode')
            gps = request.POST.get('gps')
            contact = request.POST.get('contact')
            
            if User.objects.filter(email=email):
                return HttpResponse('Team already registered!')
            
            user = User.objects.create_user(username=email, email=email, password=password)
            user.first_name = team_name
            user.save()
            
            rescue_team = RescueTeam(team_name=team_name, category=category, contact=contact, address_line_1=addr_line_1, address_line_2=addr_line_2, city=city, state=state, pincode=pincode, gps_coordinate=gps, user=user)
            rescue_team.save()
            
            request.session['username'] = email
            request.session['name'] = team_name
            request.session['type'] = 'service'
            
            return render(request, 'auth/welcome.html', {'username': request.session['username'], 'name': request.session['name'], 'type': request.session['type']})
        except Exception as e:
            print(e)
            user = User.objects.get(username=email)
            if user is not None:
                user.delete()
            
            return HttpResponse('Could not create user')
    else:
        if request.session.get('username'):
            return render(request, 'auth/welcome.html', {'username': request.session['username'], 'name': request.session['name'], 'type': request.session['type']})
        else:
            return HttpResponse('Method not allowed!')
        
def loginMember(request):
    if request.session.get('username'):
        context = {}
        context['username'] = request.session.get('username')
        context['name'] = request.session.get('name')
        context['type'] = request.session.get('type')
        return render(request, 'auth/welcome.html', context)
    
    if request.method == 'POST':
        try:
            email = request.POST.get('email')+"@suraksha.com"
            password = request.POST.get('password')     
            
            user = authenticate(username=email, password=password)
            if user is not None:
                request.session['username'] = email
                request.session['name'] = user.first_name + ' ' + user.last_name
                request.session['type'] = 'member'
                context = {
                    "username": email,
                    "name": user.first_name + ' ' + user.last_name,
                    "type": 'member'
                }
                return render(request, "auth/welcome.html", context)
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
        context['type'] = request.session.get('type')
        return render(request, 'auth/welcome.html', context)
    
    if request.method == 'POST':
        try:
            email = request.POST.get('email')+"@suraksha.com"
            password = request.POST.get('password')     
            
            user = authenticate(username=email, password=password)
            if user is None:
                return HttpResponse('Invalid username or password!')
            
            team = RescueTeam.objects.get(user=user)
            if team is not None:
                request.session['username'] = user.email
                request.session['name'] = team.team_name
                request.session['type'] = 'service'
                context = {
                    "username": user.email,
                    "name": team.team_name,
                    "type": "service"
                }
                return render(request, "auth/welcome.html", context)
            else:
                return HttpResponse('Invalid username or password!')
        except Exception as e:
            print(e)
            return HttpResponse('Server Error! Please try again later.')
    else:
        return HttpResponse('Method not allowed!')

def logout(request):
    del request.session['username']
    del request.session['name']
    del request.session['type']
    return render(request, "index.html")

def welcome(request):
    if not request.session.get('username'):
        return HttpResponse('404! Page not found!')
    
    context = {}
    context['username'] = request.session.get('username')
    context['name'] = request.session.get('name')
    context['type'] = request.session.get('type')
    return render(request, "auth/welcome.html", context)

def addMember(request):
    if not request.session.get('username'):
        return HttpResponse('404! Page not found!')
    
    context = {}
    context['username'] = request.session.get('username')
    context['name'] = request.session.get('name')
    context['type'] = request.session.get('type')
    
    return render(request, "auth/addMember.html", context)

def addMemberResponse(request):
    if not request.session.get('username'):
        return HttpResponse('Bad Request')
    
    if request.method == "POST":
        try:
            member_email = request.POST.get("email")+"@suraksha.com"
            team_email = request.session.get('username')
            
            user = User.objects.get(username=member_email)
            team = RescueTeam.objects.get(user=User.objects.get(username=team_email))
            
            context = {}
            context['username'] = request.session.get('username')
            context['name'] = request.session.get('name')
            context['type'] = request.session.get('type')
            
            try:
                member = Member.objects.get(user=user)
                context['message'] = "Member already added in a team!"
                return render(request, "auth/addMember.html", context)
            except Member.DoesNotExist:    
                member = Member.objects.create(user=user, team=team)
                member.save()
                context['message'] = 'Member added successfully'
                return render(request, "auth/addMember.html", context)
        except Exception as e:
            print(e)
            return HttpResponse('Server Error! Please try again later!')
    else:
        return HttpResponse('Method not allowed!')
    
def viewMembers(request):
    if not request.session.get('username'):
        return HttpResponse('404! Page not found!')
    
    context = {}
    context['username'] = request.session.get('username')
    context['name'] = request.session.get('name')
    context['type'] = request.session.get('type')
    
    user = User.objects.get(username=request.session.get('username'))
    team = RescueTeam.objects.get(user=user)
    members = Member.objects.filter(team=team)
    
    userData = []
    for member in members:
        member = str(member)
        username, name = member.split(',')
        userData.append({
            "name": name,
            "username": username,
            "email": username.split('@')[0]
        })
    
    context['members'] = userData
    return render(request, "auth/updateMember.html", context)

def findAndDeleteTeamMember(request):
    if not request.session.get('username'):
        return HttpResponse('404! Page not found!')
    
    if request.method == "POST":
        try:
            context = {}
            context['username'] = request.session.get('username')
            context['name'] = request.session.get('name')
            context['type'] = request.session.get('type')
            
            team_user = User.objects.get(username=request.session.get('username'))
            team = RescueTeam.objects.get(user=team_user)
            email = request.POST.get('email')+"@suraksha.com"
            user = User.objects.get(username=email)
            if user is not None:
                member = Member.objects.get(user=user, team=team)
                member.delete()
                return redirect(viewMembers)
            else:
                context['message'] = "User does not exist!"
                return render(request, "auth/updateMember.html", context)
        except Exception as e:
            print(e)
            return HttpResponse('Server error! Please try again later!')
    else:
        return HttpResponse("Method not allowed!")

def requestItems(request):
    if not request.session.get('username'):
        return HttpResponse('404! Page not found!')
    
    context = {}
    context['username'] = request.session.get('username')
    context['name'] = request.session.get('name')
    context['type'] = request.session.get('type')
    
    return render(request, "request/itemRequest.html", context)