from django.urls import path
from .views import user_auth_views as views
from .views import admin_views as admin_views
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('register/', views.register_user, name='register'),
    path('auth/login/', views.custom_token_obtain_pair, name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/logout/', views.logout_user, name='logout'),
    path('getRegisteredUsers/', admin_views.get_registered_users, name='get_registered_users'),
]