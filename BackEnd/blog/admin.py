from django.contrib import admin
from . import models
# Register your models here.


@admin.register(models.Post)
class AuthorAdmin (admin.ModelAdmin):
    list_display = ('title', 'id', 'status', 'slug', 'author',
                    'edited', 'num_like', 'num_view', 'num_comment')
    prepopulated_fields = {'slug': ('title',), }


"""
list_display xác định các trường cần hiển thị trong danh sách các bài viết trên trang admin, bao gồm title, id, status, slug, author.
prepopulated_fields cho phép tạo giá trị tự động cho trường slug dựa trên trường title.
"""


@admin.register(models.Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('id', 'content', 'author', 'post', 'created_at')


@admin.register(models.Like)
class LikeAdmin(admin.ModelAdmin):
    list_display = ('id', 'author', 'post', 'created_at')


@admin.register(models.View)
class ViewAdmin(admin.ModelAdmin):
    list_display = ('id', 'author', 'post', 'created_at')


@admin.register(models.Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'slug')
    prepopulated_fields = {'slug': ('name',), }
