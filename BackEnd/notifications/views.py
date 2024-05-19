from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Notification
from .serializers import NotificationSerializer
from rest_framework.permissions import IsAuthenticated, IsAdminUser

# Lấy toàn bộ notifications
class AllNotificationListView(generics.ListAPIView):
    permission_classes = [IsAdminUser]
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    


# Lấy toàn bộ notifications chưa đọc của 1 người
class UnreadNotificationListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = NotificationSerializer

    def get_queryset(self):
        user= self.request.user
        return Notification.objects.filter(receiver=user, is_read=False)


class NotificationCreateView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = NotificationSerializer

    def perform_create(self, serializer):
        serializer.save(sender=self.request.user)

class MarkAllAsReadView(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, *args, **kwargs):
        user = request.user
        # Cập nhật trạng thái của tất cả các thông báo chưa đọc của người dùng thành đã đọc
        Notification.objects.filter(receiver=user, is_read=False).update(is_read=True)
        return Response({"status": "success", "message": "All notifications marked as read."}, status=status.HTTP_200_OK)


