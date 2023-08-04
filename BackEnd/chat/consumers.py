import json
from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import sync_to_async

from .models import Room,Message
from users.models import NewUser

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_slug']
        self.roomGroupName = 'chat_%s' % self.room_name
        
        await self.channel_layer.group_add(
            self.roomGroupName,
            self.channel_name
        )
        await self.accept()
        
    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.roomGroupName,
            self.channel_name
        )
        
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json["message"]
        user_name = text_data_json["user_name"]
        room_name = text_data_json["room_name"]
        
        await self.save_message(message, user_name, room_name)     

        await self.channel_layer.group_send(
            self.roomGroupName, {
                "type": "sendMessage",
                "message": message,
                "user_name": user_name,
                "room_name": room_name,
            }
        )
        
    async def sendMessage(self, event):
        message = event["message"]
        user_name = event["user_name"]
        await self.send(text_data=json.dumps({"message": message, "user_name": user_name}))
    
    @sync_to_async
    def save_message(self, message, user_name, room_name):
        print(user_name,room_name,"----------------------")
        user=NewUser.objects.get(user_name=user_name)
        room=Room.objects.get(name=room_name)
        
        Message.objects.create(user=user,room=room,content=message)
