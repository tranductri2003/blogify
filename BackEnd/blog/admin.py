from django.contrib import admin
from . import models
# Register your models here.


@admin.register(models.Post)
class AuthorAdmin (admin.ModelAdmin):
    list_display = ('title', 'id', 'status', 'slug', 'author')
    prepopulated_fields = {'slug': ('title',), }


"""
list_display xác định các trường cần hiển thị trong danh sách các bài viết trên trang admin, bao gồm title, id, status, slug, author.
prepopulated_fields cho phép tạo giá trị tự động cho trường slug dựa trên trường title.
"""
admin.site.register(models.Category)
admin.site.register(models.Comment)
