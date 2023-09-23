from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer
import json
from .models import Alert

class AlertConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        await self.accept()

    async def disconnect(self, close_code):
        await self.remove_from_group()

    async def receive(self, text_data):
        try:
            data = json.loads(text_data)
            alert_id = data.get('alert_id', -1)
            alert_info = await self.get_alert_info(alert_id)

            if alert_info:
                for responder in alert_info['responders']:
                    await self.send_alert(responder, alert_info)
            else:
                await self.send_error("No alert found!")

        except json.JSONDecodeError:
            await self.send_error("Invalid JSON data.")

    async def send_alert(self, responder, alert_info):
        alert_message = {
            "type": "alert",
            "description": alert_info["description"],
            "location": alert_info["location"],
            "city": alert_info["city"],
            "state": alert_info["state"],
            "categories": alert_info["categories"],
        }
        await self.send_json(alert_message)

    async def send_error(self, error_message):
        error_message = {"type": "error", "message": error_message}
        await self.send_json(error_message)

    async def add_to_group(self, responder):
        await self.channel_layer.group_add(responder, self.channel_name)

    async def remove_from_group(self):
        await self.channel_layer.group_discard(self.user.username, self.channel_name)

    @database_sync_to_async
    def get_alert_info(self, alert_id):
        try:
            alert_obj = Alert.objects.get(id=alert_id)
            return {
                "description": alert_obj.description,
                "location": alert_obj.location,
                "city": alert_obj.city,
                "state": alert_obj.state,
                "categories": alert_obj.categories,
                "responders": alert_obj.responders,
            }
        except Alert.DoesNotExist:
            return None