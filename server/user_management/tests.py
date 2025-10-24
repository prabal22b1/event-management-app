from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from user_management.models import User
class UserRegistrationLoginTest(APITestCase):
    def setUp(self):
        # URLs with correct path prefixes
        self.register_url = '/api/v1/users/register/'
        self.login_url = '/api/v1/users/auth/login/'
# User data for methods that require an existing user
        self.user_data = {
            "username": "existinguser",
            "email": "existinguser@example.com",
            "password": "Existing1234!",
            "name": "existinguser",
            "role": "Attendee"
        }
# Create an existing user for authentication tests
        self.user = User.objects.create_user(
            username=self.user_data['username'],
            email=self.user_data['email'],
            password=self.user_data['password'],
            name=self.user_data['name'],
            role=self.user_data['role']
        )

    def test_user_registration(self):
            """Test user registration."""
            # Use different user data to avoid conflicts
            registration_data = {
                "username": "newuser",
                "email": "newuser@example.com",
                "password": "NewUser1234!",
                "name": "newuser",
                "role": "Attendee"
            }
            response = self.client.post(self.register_url, registration_data, format='json')
            self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_user_authentication(self):
            """Test user login."""
            login_data = {
                "email": self.user_data["email"],
                "password": self.user_data["password"]
            }
            response = self.client.post(self.login_url, login_data, format='json')
            self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_user_authentication_wrong_password(self):
            """Test user login with incorrect password."""
            login_data = {
                "email": self.user_data["email"],
                "password": "WrongPassword123"
            }
            response = self.client.post(self.login_url, login_data, format='json')
            self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)