from django.shortcuts import render
from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.tokens import RefreshToken
from user_management.models import User
from user_management.serializers import UserRegistrationSerializer, UserLoginSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import authenticate
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.utils import timezone
from django.conf import settings
import json
from django.conf import settings

# API endpoint for user login and JWT token generation
@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def custom_token_obtain_pair(request):

    """
    POST:
    Authenticate user and return JWT access and refresh tokens.

    Request body:
    - username: string
    - password: string

    Response:
    - access: JWT access token
    - refresh: JWT refresh token
    - user: user details
    """


    serializer = UserLoginSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.validated_data['user']  # Get the authenticated user object
        refresh = RefreshToken.for_user(user)  # Generate JWT refresh token for the user
        return Response({
            'access': str(refresh.access_token),
            'refresh': str(refresh),
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'name': user.name,
                'role': user.role,
            }
        },status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_401_UNAUTHORIZED)

# API endpoint for user registration
@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def register_user(request):
    """
    POST:
    Register a new user.

    Request body:
    - username: string
    - name: string
    - email: string
    - password: string
    - role: string

    Response:
    - message: success message
    - user: user details
    """

    serializer = UserRegistrationSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        
        return Response({
            'message': 'User registered successfully',
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'name': user.name,
                'role': user.role,
            },
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# API endpoint for user logout (JWT token blacklist)
@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def logout_user(request):
    """
    POST:
    Logout user by blacklisting the refresh token.

    Request body:
    - refresh: JWT refresh token

    Response:
    - message: success or error message
    """
    try:
        refresh_token = request.data["refresh"]
        token = RefreshToken(refresh_token)
        token.blacklist()
        return Response({"message": "User logged out successfully."}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": "Invalid token."}, status=status.HTTP_400_BAD_REQUEST)
      