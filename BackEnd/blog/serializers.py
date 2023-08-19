from rest_framework import serializers
from blog.models import Post, Comment, Category, View, Like
from django.conf import settings
from users.models import NewUser
from users.serializers import CustomUserSerializer


class CommentSerializer(serializers.ModelSerializer):
    author = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ('id', 'content', 'author', 'created_at', 'post')

    def get_author(self, obj):
        return CustomUserSerializer(obj.author).data


class ViewSerializer(serializers.ModelSerializer):
    author = serializers.SerializerMethodField()

    class Meta:
        model = View
        fields = ('id', 'author', 'created_at', 'post')

    def get_author(self, obj):
        return CustomUserSerializer(obj.author).data


class LikeSerializer(serializers.ModelSerializer):
    author = serializers.SerializerMethodField()

    class Meta:
        model = Like
        fields = ('id', 'author', 'created_at', 'post')

    def get_author(self, obj):
        return CustomUserSerializer(obj.author).data


class CreatePostSerializer(serializers.ModelSerializer):

    class Meta:
        model = Post
        fields = ['category', 'id', 'title', 'image', 'slug',
                  'author', 'excerpt', 'content', 'status', 'edited', ]



class PostSerializer(serializers.ModelSerializer):
    comments = serializers.SerializerMethodField()
    likes = serializers.SerializerMethodField()
    views = serializers.SerializerMethodField()
    author = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ['category', 'id', 'title', 'image', 'slug',
                  'author', 'excerpt', 'content', 'status', 'edited', 'num_like', 'num_view', 'num_comment', 'comments', 'likes', 'views']

    def get_comments(self, obj):
        comments = Comment.objects.filter(post=obj)
        return CommentSerializer(comments, many=True).data

    def get_views(self, obj):
        views = View.objects.filter(post=obj)
        return ViewSerializer(views, many=True).data

    def get_likes(self, obj):
        likes = Like.objects.filter(post=obj)
        return LikeSerializer(likes, many=True).data

    def get_author(self, obj):
        return CustomUserSerializer(obj.author).data

class PostRankingSerializer(serializers.ModelSerializer):
    author = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ['category', 'id', 'title', 'image', 'slug',
                  'author', 'excerpt', 'edited', 'num_like', 'num_view', 'num_comment']
    def get_author(self, obj):
        return CustomUserSerializer(obj.author).data

class UserRegisterSerializer(serializers.ModelSerializer):

    email = serializers.EmailField(required=True)
    username = serializers.CharField(required=True)
    password = serializers.CharField(min_length=8, write_only=True)

    class Meta:
        model = settings.AUTH_USER_MODEL
        fields = ('email', 'user_name', 'first_name')
        extra_kwargs = {'password': {'write_only': True}}
