from django.contrib import admin
from .models import Room, Message

@admin.register(Room)
class RoomAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'description') 

@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ('user', 'room',  'content', 'created_on')