# serializers.py

from rest_framework import serializers
from .models import Room, Message
from users.models import NewUser
from users.serializers import CustomUserSerializer, CustomUserChatSerializer

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = '__all__'
class MessageSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    class Meta:
        model = Message
        fields = ('id', 'content', 'created_on', 'user', 'room')
    def get_user(self, obj):
        # return {'user_name': obj.user.user_name, 'avatar': obj.user.user_name}
        return CustomUserChatSerializer(obj.user).data

