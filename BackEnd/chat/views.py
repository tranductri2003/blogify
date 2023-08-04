from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Room, Message
from .serializers import MessageSerializer, RoomSerializer
from django.shortcuts import render


class RoomListView(APIView):
    def get(self, request):
        rooms = Room.objects.all()
        serializer = RoomSerializer(rooms, many = True)
        return Response({ "user_name": request.user.user_name,"rooms": serializer.data})

class RoomView(APIView):
    def get(self, request, slug):
        room = Room.objects.get(slug=slug)
        messages = Message.objects.filter(room=room)
        serializer = MessageSerializer(messages, many=True)
        return Response({ "user_name": request.user.user_name,"room_name": room.name, "slug": slug, "messages": serializer.data})