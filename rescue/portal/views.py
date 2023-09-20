from django.shortcuts import render, HttpResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

def index(request):
    context = {}
    if request.session.get('username'):
        context['username'] = request.session.get('username')
        context['name'] = request.session.get('name')
    return render(request, 'index.html', context)

def member(request):
    if request.session.get('username'):
        context = {}
        context['username'] = request.session.get('username')
        context['name'] = request.session.get('name')
        return render(request, 'welcome.html', context)
    
    return render(request, 'member.html')

def service(request):
    if request.session.get('username'):
        context = {}
        context['username'] = request.session.get('username')
        context['name'] = request.session.get('name')
        return render(request, 'welcome.html', context)
    
    return render(request, 'service.html')

def login(request):
    if request.session.get('username'):
        context = {}
        context['username'] = request.session.get('username')
        context['name'] = request.session.get('name')
        return render(request, 'welcome.html', context)
    
    return render(request, 'login.html')

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
            email = request.POST.get('email')
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
        
def loginUser(request):
    if request.session.get('username'):
        context = {}
        context['username'] = request.session.get('username')
        context['name'] = request.session.get('name')
        return render(request, 'welcome.html', context)
    
    if request.method == 'POST':
        try:
            email = request.POST.get('email')
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

def logout(request):
    del request.session['username']
    del request.session['name']
    return render(request, "index.html", {})