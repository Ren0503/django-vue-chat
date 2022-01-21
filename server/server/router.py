from email.mime import application
import imp
import channels
from django.urls import path
import channels.auth

from core.schema import MyGraphqlWsConsumer

application = channels.routing.ProtocolTypeRouter({
    "websocket": channels.auth.AuthMiddlewareStack(
        channels.routing.URLRouter([
            path("ws/graphql", MyGraphqlWsConsumer.as_asgi()),
        ])
    ),
})