from rest_framework import serializers
from blog.models import Post, Comment, Category
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


class CreatePostSerializer(serializers.ModelSerializer):

    class Meta:
        model = Post
        fields = ['category', 'id', 'title', 'image', 'slug',
                  'author', 'excerpt', 'content', 'status', 'edited']


class PostSerializer(serializers.ModelSerializer):
    comments = serializers.SerializerMethodField()
    author = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ['category', 'id', 'title', 'image', 'slug',
                  'author', 'excerpt', 'content', 'status', 'comments', 'edited']

    def get_comments(self, obj):
        comments = Comment.objects.filter(post=obj)
        return CommentSerializer(comments, many=True).data

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
