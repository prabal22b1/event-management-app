from rest_framework import serializers
from django.contrib.auth import authenticate
from  django.contrib.auth.password_validation  import validate_password
from .models import User, UserRole


class UserRegistrationSerializer(serializers.ModelSerializer):
    password= serializers.CharField(write_only=True,validators=[validate_password])

    class Meta:
        model = User
        fields = ('username', 'email', 'name', 'password', 'role')
        extra_kwargs = {
            'password': {'write_only': True},
        }
    def validate_role(self, value):    
        if value=='Admin':
            raise serializers.ValidationError("Cannot register with Admin role")
        return value
    
    
    
    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("Username is already taken.")
        return value
    
    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email is already registered.")
        return value
    
    def create(self, validated_data):
        
        password = validated_data.pop('password')

        user = User.objects.create_user(**validated_data)
        user.set_password(password)
       
        user.save() 
        return user

class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        if email and password:
            user = authenticate(email=email, password=password)
            if not user:
                raise serializers.ValidationError("Invalid email or password.")
            if not user.is_active:
                raise serializers.ValidationError("User account is disabled.")  
            attrs['user'] = user
            return attrs
        else:
            raise serializers.ValidationError("Both email and password are required.")

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'name', 'role']