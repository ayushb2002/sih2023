import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter , URLRouter
from channels.security.websocket import AllowedHostsOriginValidator
from django.urls import re_path
from alert.consumers import AlertConsumer 

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myproject.settings.base')
django_asgi_app = get_asgi_application()

application = ProtocolTypeRouter({
    "http": django_asgi_app,
    'websocket' : AllowedHostsOriginValidator(
        URLRouter([
                re_path(r'ws/alert/(?P<city>\w+)/(?P<state>\w+)/$', AlertConsumer.as_asgi())
        ])
    )
})