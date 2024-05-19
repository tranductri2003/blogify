from django.urls import path
from .views import AllNotificationListView, NotificationCreateView, UnreadNotificationListView, MarkAllAsReadView

app_name = 'notifications'

urlpatterns = [
    path('', AllNotificationListView.as_view(), name='all-notification'),
    path('add/', NotificationCreateView.as_view(), name='add-notification'),
    path('unread/', UnreadNotificationListView.as_view(), name='unread-notifications'),
    path('mark-all-as-read/', MarkAllAsReadView.as_view(), name='mark-all-as-read'),
]