from channels.generic.websocket import AsyncWebsocketConsumer
import json

class AlertConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        self.alertCity = self.scope['url_route']['kwargs']['city']
        self.alertState = self.scope['url_route']['kwargs']['state']
        self.alertGroup = f'alert_{self.alertCity}_{self.alertState}'
        
        await self.channel_layer.group_add(
            self.alertGroup,
            self.channel_name
        )
        
        await self.accept()

    async def disconnect(self, close_code):
        
        await self.channel_layer.group_discard(
            self.alertGroup,
            self.channel_name
        )

    async def receive(self, text_data):
        alert_info = json.loads(text_data)
        
        await self.channel_layer.group_send(
            self.alertGroup,
            {
                "type": "send_alert",
                "description": alert_info["description"],
                "location": alert_info["location"],
                "city": alert_info["city"],
                "state": alert_info["state"],
                "categories": alert_info["categories"]
            }
        )

    async def send_alert(self, alert_info):
        alert_message = {
            "description": alert_info["description"],
            "location": alert_info["location"],
            "city": alert_info["city"],
            "state": alert_info["state"],
            "categories": alert_info["categories"],
        }
        
        await self.send(text_data=json.dumps(alert_message))
