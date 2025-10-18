from django.urls import path
from .event_views import event_list
from .registration_views import registerForEvent

urlpatterns = [
    path('', manageEvent, name='manageEvent'),
    path('<int:event_id>/', manageEventDetails, name='manageEventDetails'),
    path('<int:event_id>/register/', registerForEvent, name='registerForEvent'),
]