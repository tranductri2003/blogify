from django.shortcuts import get_object_or_404
from blog.models import Post, Category, Like, Comment, View
from users.models import NewUser
from .serializers import PostSerializer, CommentSerializer, CreatePostSerializer, LikeSerializer, CommentSerializer, ViewSerializer
# from .serializers import  UpdateViewSerializer, UpdateLikeSerializer, UpdateCommentSerializer,
from rest_framework import viewsets, filters, generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from django_filters.rest_framework import DjangoFilterBackend
import requests
# Display Posts
from rest_framework.pagination import PageNumberPagination


class CustomPageNumberPagination(PageNumberPagination):
    page_size = 6
    page_size_query_param = 'page_size'
    max_page_size = 100

    def get_paginated_response(self, data):
        res = super().get_paginated_response(data)
        res.data['page_size'] = 6
        return res


class PostList(generics.ListAPIView):

    serializer_class = PostSerializer
    queryset = Post.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['category__slug', 'author__user_name']
    # Thêm trình xử lý phân trang vào view
    pagination_class = CustomPageNumberPagination


class PostDetail(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = PostSerializer

    def get_object(self):
        item = self.kwargs.get('slug')
        post = get_object_or_404(Post, slug=item)
        view = View.objects.create(post=post, author=self.request.user)
        post.num_view += 1
        post.author.num_view += 1
        post.save()
        post.author.save()
        return post


class LikeAPIView(APIView):
    def post(self, request, slug):
        try:
            post = Post.objects.get(slug=slug)
            # Kiểm tra xem người dùng đã Like bài viết chưa
            user = request.user
            if Like.objects.filter(post=post, author=user).exists():
                return Response({"detail": "Bạn đã Like bài viết này rồi."}, status=status.HTTP_400_BAD_REQUEST)

            like = Like.objects.create(post=post, author=user)
            serializer = LikeSerializer(like)
            post.author.num_like += 1
            post.num_like += 1
            post.save()
            post.author.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Post.DoesNotExist:
            return Response({"detail": "Bài viết không tồn tại."}, status=status.HTTP_404_NOT_FOUND)


class CommentAPIView(APIView):
    def post(self, request, slug):
        try:
            post = Post.objects.get(slug=slug)
            # Lấy dữ liệu từ request.data để tạo Comment
            author = request.user
            content = request.data.get('content', '')

            comment = Comment.objects.create(
                post=post, author=author, content=content)
            serializer = CommentSerializer(comment)
            post.num_comment += 1
            post.author.num_comment += 1
            post.save()
            post.author.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Post.DoesNotExist:
            return Response({"detail": "Bài viết không tồn tại."}, status=status.HTTP_404_NOT_FOUND)


class ViewAPIView(APIView):
    def post(self, request, slug):
        try:
            post = Post.objects.get(slug=slug)
            # Kiểm tra xem người dùng đã View bài viết chưa
            user = request.user
            view = View.objects.create(post=post, author=user)
            serializer = ViewSerializer(view)
            post.num_view += 1
            post.author.num_view += 1
            post.save()
            post.author.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Post.DoesNotExist:
            return Response({"detail": "Bài viết không tồn tại."}, status=status.HTTP_404_NOT_FOUND)


# class UpdateView(APIView):
#     permission_classes = [permissions.IsAuthenticated]

#     def put(self, request, slug, num):
#         post = Post.objects.get(slug=slug)
#         post.num_view += num
#         post.save()
#         serializer = UpdateViewSerializer(post)
#         return Response(serializer.data, status=status.HTTP_200_OK)


# class UpdateLike(APIView):
#     permission_classes = [permissions.IsAuthenticated]

#     def put(self, request, slug, num):
#         post = Post.objects.get(slug=slug)
#         post.num_like += num
#         post.save()
#         serializer = UpdateLikeSerializer(post)
#         return Response(serializer.data, status=status.HTTP_200_OK)


# class UpdateComment(APIView):
#     permission_classes = [permissions.IsAuthenticated]

#     def put(self, request, slug, num):
#         post = Post.objects.get(slug=slug)
#         post.num_comment += num
#         post.save()
#         serializer = UpdateCommentSerializer(post)
#         return Response(serializer.data, status=status.HTTP_200_OK)
# Post Search


class PostListDetailfilter(generics.ListAPIView):

    serializer_class = PostSerializer
    queryset = Post.objects.all()
    filter_backends = [filters.SearchFilter]
    # '^' Starts-with search.
    # '=' Exact matches.
    search_fields = ['^slug']

# Post Admin

# class CreatePost(generics.CreateAPIView):
#     permission_classes = [permissions.IsAuthenticated]
#     queryset = Post.objects.all()
#     serializer_class = PostSerializer


class CreatePost(APIView):
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, format=None):
        serializer = CreatePostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()

            # Lấy thông tin tác giả từ request.user
            author = request.user

            author.num_post += 1
            author.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

            # # Gọi API cập nhật số lượng bài viết của tác giả
            # author_update_url = f"http://127.0.0.1:8000/api/user/{author}/updatenumpost/1/"
            # headers = {
            #     "Content-type": "application/json",
            #     "Authorization": request.META.get("HTTP_AUTHORIZATION"),
            # }
            # response = requests.put(author_update_url, headers=headers)

            # # Kiểm tra phản hồi từ API cập nhật số lượng bài viết của tác giả
            # if response.status_code == 200:
            #     # Xử lý phản hồi nếu cần
            #     return Response(serializer.data, status=status.HTTP_200_OK)
            # else:
            #     # Xử lý lỗi nếu có
            #     return Response({"error": "Failed to update author's post count"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserPostDetail(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = PostSerializer
    queryset = Post.objects.all()


class EditPost(generics.UpdateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = PostSerializer
    queryset = Post.objects.all()


class DeletePost(generics.RetrieveDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = PostSerializer
    queryset = Post.objects.all()

    def perform_destroy(self, instance):
        # Xác định tác giả của bài viết trước khi xóa nó
        author = instance.author
        author.num_post -= 1
        author.num_comment -= instance.num_comment
        author.num_view -= instance.num_view
        author.num_like -= instance.num_like
        author.save()
        # Xóa bài viết
        instance.delete()


""" Concrete View Classes
# CreateAPIView
Used for create-only endpoints.
# ListAPIView
Used for read-only endpoints to represent a collection of model instances.
# RetrieveAPIView
Used for read-only endpoints to represent a single model instance.
# DestroyAPIView
Used for delete-only endpoints for a single model instance.
# UpdateAPIView
Used for update-only endpoints for a single model instance.
# ListCreateAPIView
Used for read-write endpoints to represent a collection of model instances.
RetrieveUpdateAPIView
Used for read or update endpoints to represent a single model instance.
# RetrieveDestroyAPIView
Used for read or delete endpoints to represent a single model instance.
# RetrieveUpdateDestroyAPIView
Used for read-write-delete endpoints to represent a single model instance.
"""
