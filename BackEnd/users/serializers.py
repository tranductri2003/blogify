from rest_framework import serializers
from users.models import NewUser


class CustomUserSerializer(serializers.ModelSerializer):
    """
    Currently unused in preference of the below.
    """
    email = serializers.EmailField(required=True)
    user_name = serializers.CharField(required=True)
    password = serializers.CharField(min_length=8, write_only=True)
    # avatar = serializers.SerializerMethodField()

    class Meta:
        model = NewUser
        fields = ('email', 'user_name', 'first_name', 'avatar', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        # as long as the fields are the same, we can just use this
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    # def get_avatar(self, obj):
    #     request = self.context.get('request')
    #     if obj.avatar:
    #         return request.build_absolute_uri(obj.avatar.url)
    #     return None
