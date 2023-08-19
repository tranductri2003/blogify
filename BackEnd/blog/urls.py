from .views import PostList, PostDetail, PostListDetailfilter, CreatePost, EditPost, UserPostDetail, DeletePost, LikeAPIView, CommentAPIView, ViewAPIView, PostRankingList
# from .views import UpdateLike, UpdateView, UpdateComment
from django.urls import path

app_name = 'blog'

urlpatterns = [
    path('ranking/', PostRankingList.as_view(), name='rankinguser'),
    path('create/', CreatePost.as_view(), name='createpost'),
    path('edit/postdetail/<int:pk>/',
         UserPostDetail.as_view(), name='admindetailpost'),
    path('edit/<int:pk>/', EditPost.as_view(), name='editpost'),
    path('delete/<int:pk>/', DeletePost.as_view(), name='deletepost'),

    path('like/create/<str:slug>', LikeAPIView.as_view(), name='likepost'),
    path('comment/create/<str:slug>',
         CommentAPIView.as_view(), name='commentpost'),
    path('view/create/<str:slug>', ViewAPIView.as_view(), name='viewpost'),
    path('search/', PostListDetailfilter.as_view(), name='searchpost'),


    # path('', PostList.as_view(), name='listpost'),
    path('', PostList.as_view(), name='listpost'),
    path('<str:slug>/', PostDetail.as_view(), name='detailpost'),



]
