from django.urls import path
from .views.event_views import manageEvent, manageEventDetails
from .views.registration_views import manageRegistrationsForEvent, getEventRegistrationsForUser

urlpatterns = [
    path('', manageEvent, name='manageEvent'),
    path('<int:event_id>/', manageEventDetails, name='manageEventDetails'),
    path('<int:event_id>/register/', manageRegistrationsForEvent, name='manageRegistrationsForEvent'),
    path('registrations/user/<int:user_id>/', getEventRegistrationsForUser, name='getEventRegistrationsForUser')
]