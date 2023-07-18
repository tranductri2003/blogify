from .views import PostList, PostDetail, PostSearch, PostListDetailfilter
#from rest_framework.routers import DefaultRouter
from django.urls import path

app_name = 'blog_api'

# router = DefaultRouter()
# router.register('', PostList, basename='post')
# urlpatterns = router.urls

urlpatterns = [
    path('posts/', PostDetail.as_view(), name='detailcreate'),
    # http://127.0.0.1:8000/api/posts /?slug = django-rest-framework-series-viewsets-and -routers-with -react-front-end-example-part-4
    path('search/', PostListDetailfilter.as_view(), name='postsearch'),
    # http://127.0.0.1:8000/api/search/?search=django
    path('', PostList.as_view(), name='listcreate'),
]
