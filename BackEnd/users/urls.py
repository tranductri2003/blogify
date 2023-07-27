from django.urls import path
from .views import UserList,  UserDetail, CustomUserCreate, BlacklistTokenUpdateView

app_name = 'users'

urlpatterns = [
    path('', UserList.as_view(), name='listusers'),
    path('<str:pk>/', UserDetail.as_view(), name='detailuser'),
    path('register/', CustomUserCreate.as_view(), name="create_user"),
    path('logout/blacklist/', BlacklistTokenUpdateView.as_view(),
         name='blacklist')
]
