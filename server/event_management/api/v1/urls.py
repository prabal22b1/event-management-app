from django.urls import path
from .views.event_views import manageEvent, manageEventDetails, getEventsForOrganizer
from .views.registration_views import manageRegistrationsForEvent, getEventRegistrationsForUser, checkIfUserRegisterforEvent
from .views.admin_views import get_admin_stats, get_all_events_admin, get_event_registrations

urlpatterns = [
    path('', manageEvent, name='manageEvent'),
    path('<int:event_id>/', manageEventDetails, name='manageEventDetails'),
    path('<int:event_id>/register/', manageRegistrationsForEvent, name='manageRegistrationsForEvent'),
    path('registrations/user/', getEventRegistrationsForUser, name='getEventRegistrationsForUser'),
    path('organizer/', getEventsForOrganizer, name='getEventsForOrganizer'),
    path('<int:event_id>/check-registration/', checkIfUserRegisterforEvent, name='checkIfUserRegisterforEvent'),
   
    path('admin/stats/', get_admin_stats, name='admin_stats'),
    path('admin/events/', get_all_events_admin, name='admin_events'),
    path('admin/events/<int:event_id>/registrations/', get_event_registrations, name='event_registrations'),
]
