from django.urls import path
from .views.event_views import manageEvent, manageEventDetails, getEventsForOrganizer
from .views.registration_views import manageRegistrationsForEvent, getEventRegistrationsForUser, checkIfUserRegisterforEvent

urlpatterns = [
    path('', manageEvent, name='manageEvent'),
    path('<int:event_id>/', manageEventDetails, name='manageEventDetails'),
    path('<int:event_id>/register/', manageRegistrationsForEvent, name='manageRegistrationsForEvent'),
    path('registrations/user/', getEventRegistrationsForUser, name='getEventRegistrationsForUser'),
    path('organizer/', getEventsForOrganizer, name='getEventsForOrganizer'),
    path('<int:event_id>/check-registration/', checkIfUserRegisterforEvent, name='checkIfUserRegisterforEvent'),
]