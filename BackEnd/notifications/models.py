from django.db import models
from django.contrib.auth.models import User
from django.conf import settings
from django.utils import timezone

class Notification(models.Model):
    sender = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='sent_notifications')
    receiver = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='received_notifications')
    ACTION_CHOICES = (
        ('like', 'Like'),
        ('comment', 'Comment'),
    )   
    action = models.CharField(max_length=10, choices=ACTION_CHOICES)
    post = models.ForeignKey('blog.Post', on_delete=models.CASCADE)
    timestamp = models.DateTimeField(default=timezone.now)
    is_read = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.sender.username} - {self.action} - {self.post.title}"