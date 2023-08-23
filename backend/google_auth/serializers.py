from rest_framework import serializers

class UserSerializer(serializers.Serializer):
  email = serializers.EmailField()
  first_name = serializers.CharField()
  last_name = serializers.CharField()


class UserDetailsSerializer(serializers.Serializer):
  user = UserSerializer()
  age = serializers.IntegerField()
  gender = serializers.CharField()
  location = serializers.CharField()