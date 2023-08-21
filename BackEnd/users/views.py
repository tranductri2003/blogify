from django.shortcuts import get_object_or_404
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import viewsets, filters, generics, permissions
from rest_framework_simplejwt.tokens import RefreshToken
from users.models import NewUser
from django.contrib.sites.shortcuts import get_current_site
from django.utils.encoding import force_bytes, force_str
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.template.loader import render_to_string
from .tokens import account_activation_token
from django.core.mail import EmailMessage
from .serializers import CustomUserSerializer, CustomUserEditSerializer
from rest_framework.decorators import api_view, permission_classes
from django.urls import reverse
import environ


env = environ.Env()
environ.Env.read_env()


class CustomUserCreate(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, format='json'):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                current_site = get_current_site(request)
                mail_subject = 'Activate your account'
                # message = render_to_string('acc_active_email.html', {
                #     'user': user,
                #     'domain': current_site.domain,
                #     'uid':force_str(urlsafe_base64_encode(force_bytes(user.pk))),
                #     'token':account_activation_token.make_token(user),
                # })

                message = f"Hi {user.user_name},\n\n" \
                        f"Please click on the link to confirm your registration:\n" \
                        f"{current_site.domain}activate/{urlsafe_base64_encode(force_bytes(user.pk))}/{account_activation_token.make_token(user)}/\n\n" \
                        f"Best regards,\n" \
                        f"tranductri2003"


                to_email = user.email
                email = EmailMessage(
                    mail_subject, message, to=[to_email]
                )
                email.send()

                return Response({'success': 'please check your mail!'}, status=status.HTTP_201_CREATED)
        else:
            return Response({
    'error': 'An account with this email or username already exists.'
}, status=status.HTTP_400_BAD_REQUEST)
            

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def send_password_reset_email (request):
    email= request.data.get("email")
    user = get_object_or_404(NewUser, email = email)
    if user:
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        token = account_activation_token.make_token(user)
        
        mail_subject = 'Reset your password'
        reset_url = f"{env('FRONTEND_IP')}resetpassword/{uid}/{token}/"


        message = f"Hi {user.user_name},\n\n" \
                f"You're receiving this email because you requested a password reset for your account.\n" \
                f"Please click the following link to reset your password:\n\n" \
                f"{reset_url}\n\n" \
                f"If you didn't request a password reset, please ignore this email.\n\n" \
                f"Best regards,\n" \
                f"tranductri2003"
        
        to_email = user.email
        email = EmailMessage(
            mail_subject, message, to=[to_email]
        )
        email.send()

        return Response({'success': 'please enter new password!'}, status=status.HTTP_201_CREATED)
    else:
        # Trả về cùng một thông báo cho mọi trường hợp lỗi để ẩn thông tin về sự tồn tại của tài khoản
        return Response({
            'error': 'An error occurred while processing your request'
        }, status=status.HTTP_400_BAD_REQUEST)
        


@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def confirm_and_update_password(request, uidb64, token):
    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = NewUser.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, NewUser.DoesNotExist):
        user = None
    
    if user is not None and account_activation_token.check_token(user, token):
        password = request.data.get("password")

        user.set_password(password)
        user.save()

        return Response({'message': 'Password updated successfully.'}, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Invalid token.'}, status=status.HTTP_400_BAD_REQUEST)





@api_view(['GET','POST'])
@permission_classes([permissions.AllowAny])
def activate(request, uidb64, token):
    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = NewUser.objects.get(pk=uid)
    except(TypeError, ValueError, OverflowError, NewUser.DoesNotExist):
        user = None
    if user is not None and account_activation_token.check_token(user, token):
        user.is_active = True
        user.save()
        # return redirect('home')
        return Response({'message':'Thank you for your email confirmation. Now you can login your account.'}, status=200)
    else:
        return Response({'error':'Activation link is invalid!'}, status=400)







class UserList(generics.ListAPIView):
    permission_classes = [permissions.IsAdminUser]

    serializer_class = CustomUserSerializer
    queryset = NewUser.objects.all()



class UserDetail(generics.RetrieveAPIView):
    serializer_class = CustomUserSerializer
    permission_classes = [permissions.IsAuthenticated]

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
    permission_classes = [permissions.AllowAny]
    authentication_classes = ()

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class EditUser(generics.UpdateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CustomUserEditSerializer
    queryset = NewUser.objects.all()
    lookup_field = "user_name"

    def update(self, request, *arg, **kwargs):
        user = self.get_object()
        serializer = self.get_serializer(user, data = request.data)
        if serializer.is_valid():
            new_password = request.data.get('password')
            if new_password:
                user.set_password(new_password)
                user.save()
            # serializer.save() nếu sử dụng db sẽ lưu mật khẩu đã mã hóa
            return Response({'message': 'Profile updated successfully.', 'password': f'{new_password}'}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

