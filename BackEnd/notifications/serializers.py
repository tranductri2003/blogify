from rest_framework import serializers
from .models import Notification

class NotificationSerializer(serializers.ModelSerializer):
    sender_username = serializers.SerializerMethodField()
    receiver_username = serializers.SerializerMethodField()

    class Meta:
        model = Notification
        fields = ['id', 'sender', 'sender_username', 'receiver', 'receiver_username', 'action', 'post', 'timestamp', 'is_read']

    def get_sender_username(self, obj):
        return obj.sender.user_name

    def get_receiver_username(self, obj):
        return obj.receiver.user_name
