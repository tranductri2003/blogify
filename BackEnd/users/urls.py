from django.urls import path
from .views import UserList,  UserDetail, CustomUserCreate, BlacklistTokenUpdateView, EditUser, UserRankingList, activate
# from .views import UpdateLike, UpdateView, UpdateComment, UpdateNumPost
from django.urls import re_path

app_name = 'users'

urlpatterns = [
    path('activate/<uidb64>/<token>/',
        activate, name='activate'),
    path('ranking/', UserRankingList.as_view(), name='rankinguser'),
    path('edit/<str:user_name>/', EditUser.as_view(), name='edituser'),
    path('register/', CustomUserCreate.as_view(), name="create_user"),
    path('logout/blacklist/', BlacklistTokenUpdateView.as_view(),
         name='blacklist'),
    path('<str:user_name>/', UserDetail.as_view(), name='detailuser'),
    path('', UserList.as_view(), name='listusers'),
    
]
