from .views import PostList, PostDetail, PostListDetailfilter, CreatePost, EditPost, UserPostDetail, DeletePost, LikeAPIView, CommentAPIView, ViewAPIView
# from .views import UpdateLike, UpdateView, UpdateComment
from django.urls import path

app_name = 'blog'

urlpatterns = [
    # path('', PostList.as_view(), name='listpost'),
    path('post/', PostList.as_view(), name='listpost'),
    path('post/<str:slug>/', PostDetail.as_view(), name='detailpost'),
    # path('post/<str:slug>/updateview/<int:num>/',
    #      UpdateView.as_view(), name='updatepostview'),
    # path('post/<str:slug>/updatelike/<int:num>/',
    #      UpdateLike.as_view(), name='updatepostlike'),
    # path('post/<str:slug>/updatecomment/<int:num>/',
    #      UpdateComment.as_view(), name='updatepostcomment'),
    path('post/like/create/<str:slug>', LikeAPIView.as_view(), name='likepost'),
    path('post/comment/create/<str:slug>',
         CommentAPIView.as_view(), name='commentpost'),
    path('post/view/create/<str:slug>', ViewAPIView.as_view(), name='viewpost'),





    path('search/', PostListDetailfilter.as_view(), name='searchpost'),
    # Post Admin URLs
    path('admin/post/create/', CreatePost.as_view(), name='createpost'),
    path('admin/post/edit/postdetail/<int:pk>/',
         UserPostDetail.as_view(), name='admindetailpost'),
    path('admin/post/edit/<int:pk>/', EditPost.as_view(), name='editpost'),
    path('admin/post/delete/<int:pk>/', DeletePost.as_view(), name='deletepost'),
]
