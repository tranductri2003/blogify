from django.db import models
from django.contrib.auth.models import User
from django.conf import settings
# Create your models here.
class Room(models.Model):
    name = models.CharField(max_length=50)
    slug = models.SlugField(max_length=100)
    description = models.TextField(default="For those who love writing")

    def __str__(self):
        return "Room : "+ self.name + " | Id : " + self.slug
    

class Message(models.Model):
    user =models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    content = models.TextField()
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    created_on = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return "Message is :- "+ self.content