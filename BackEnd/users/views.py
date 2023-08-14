from django.shortcuts import get_object_or_404
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import CustomUserSerializer, CustomUserEditSerializer
# from .serializers import UpdateViewSerializer, UpdateCommentSerializer, UpdateLikeSerializer, UpdateNumPostSerializer
from rest_framework import viewsets, filters, generics, permissions
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny, IsAuthenticated
from users.models import NewUser


class CustomUserCreate(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format='json'):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserList(generics.ListAPIView):

    serializer_class = CustomUserSerializer
    queryset = NewUser.objects.all()



class UserDetail(generics.RetrieveAPIView):
    serializer_class = CustomUserSerializer
    permission_classes = [AllowAny]

    def get_object(self):
        item = self.kwargs.get('user_name')
        user = get_object_or_404(NewUser, user_name=item)
        return user

class EditUser(generics.UpdateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CustomUserSerializer
    queryset = NewUser.objects.all()


class UserRankingList(generics.ListAPIView):
    
    serializer_class = CustomUserSerializer
    queryset = NewUser.objects.all()
    filter_backends = [filters.OrderingFilter]
    # ordering_fields = ['num_view', 'num_post', 'user_name']
    # ordering = ['-num_view', '-num_post', 'user_name']
    
    
class BlacklistTokenUpdateView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = ()

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)


# class UpdateView(APIView):
#     def put(self, request, user_name, num, format=None):
#         try:
#             user = NewUser.objects.get(user_name=user_name)
#         except NewUser.DoesNotExist:
#             return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

#         user.num_view += num
#         user.save()
#         # serializer = UpdateViewSerializer(user)
#         return Response({"success": "Number of views updated successfully"}, status=status.HTTP_200_OK)


# class UpdateLike(APIView):
#     def put(self, request, user_name, num, format=None):
#         try:
#             user = NewUser.objects.get(user_name=user_name)
#         except NewUser.DoesNotExist:
#             return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

#         user.num_like += num
#         user.save()
#         # serializer = UpdateLikeSerializer(user)
#         return Response({"success": "Number of likes updated successfully"}, status=status.HTTP_200_OK)


# class UpdateComment(APIView):
#     def put(self, request, user_name, num, format=None):
#         try:
#             user = NewUser.objects.get(user_name=user_name)
#         except NewUser.DoesNotExist:
#             return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

#         user.num_comment += num
#         user.save()
#         # serializer = UpdateCommentSerializer(user)
#         return Response({"success": "Number of comments updated successfully"}, status=status.HTTP_200_OK)


# class UpdateNumPost(APIView):
#     def put(self, request, user_name, num, format=None):
#         try:
#             user = NewUser.objects.get(user_name=user_name)
#         except NewUser.DoesNotExist:
#             return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
#         print(num)
#         user.num_post += num
#         user.save()
#         # serializer = UpdateNumPostSerializer(user)
#         return Response({"success": "Number of posts updated successfully"}, status=status.HTTP_200_OK)

class EditUser(generics.UpdateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CustomUserEditSerializer
    queryset = NewUser.objects.all()
    lookup_field = "user_name"
