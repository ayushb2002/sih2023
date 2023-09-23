from channels.routing import ProtocolTypeRouter , URLRouter
from channels.security.websocket import AllowedHostsOriginValidator
from django.urls import path
from alert.consumers import AlertConsumer 



application = ProtocolTypeRouter({
    'websocket' : AllowedHostsOriginValidator(
        URLRouter([
                path('alerts/' , AlertConsumer)
        ])
    )
})