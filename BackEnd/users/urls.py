from django.urls import path
from .views import UserList,  UserDetail, CustomUserCreate, BlacklistTokenUpdateView, EditUser, UserRankingList
# from .views import UpdateLike, UpdateView, UpdateComment, UpdateNumPost

app_name = 'users'

urlpatterns = [
    path('ranking/', UserRankingList.as_view(), name='rankinguser'),
    path('edit/<str:user_name>/', EditUser.as_view(), name='edituser'),
    path('register/', CustomUserCreate.as_view(), name="create_user"),
    path('logout/blacklist/', BlacklistTokenUpdateView.as_view(),
         name='blacklist'),
    path('<str:user_name>/', UserDetail.as_view(), name='detailuser'),
    path('', UserList.as_view(), name='listusers'),

    # path('<str:user_name>/updateview/<int:num>/',
    #      UpdateView.as_view(), name='updateuserview'),
    # path('<str:user_name>/updatelike/<int:num>/',
    #      UpdateLike.as_view(), name='updateuserlike'),
    # path('<str:user_name>/updatecomment/<int:num>/',
    #      UpdateComment.as_view(), name='updateusercomment'),
    # path('<str:user_name>/updatenumpost/<int:num>/',
    #      UpdateNumPost.as_view(), name='updateusernumpost'),
]
