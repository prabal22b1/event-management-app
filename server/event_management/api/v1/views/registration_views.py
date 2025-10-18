from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from ..models import Registration, Event
from user_management.models import User
from ..serializers import RegistrationSerializer
from ...utils import get_user_role


def is_event_sold_out(event):
    """
    Check if the event is sold out.
    Return True if sold out, otherwise False.
    """
    available_seats = event.available_seats
    return available_seats <= 0

def is_user_already_registered(user_id, event_id):
    """
    Check if the user is already registered for the event.
    Return True if registered, otherwise False.
    """
    return Registration.objects.filter(user_id=user_id, event_id=event_id).exists()



@api_view(['POST', 'PUT'])
@permission_classes([IsAuthenticated])
def registerForEvent(request, event_id):
    """
    Handle POST and PUT requests for event registrations.
    """

    #Check if the user is authorized
    user_id = request.data.get('user_id')
    user = User.objects.get(id=user_id)
    if not get_user_role(user) == 'Attendee':
        return Response({'error': 'User is not authorized to perform this action'}, 
                        status=status.HTTP_403_FORBIDDEN)

    if request.method == 'POST': 
        try:
            event = Event.objects.get(id=event_id)
        except Event.DoesNotExist:
            return Response({'error': 'Event not found'}, status=status.HTTP_404_NOT_FOUND)
            
        # Check if event has available seats
        available_seats = event.available_seats 
        if available_seats <= 0:
            return Response({'error': 'Event is sold out'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Check existing registration
            existing_registration = Registration.objects.get(user_id=user_id, event_id=event_id)
            return Response({'error': 'You are already registered for the event'}, status=status.HTTP_400_BAD_REQUEST)
        except Registration.DoesNotExist:
            # Create a new registration record
            registration_status = 'Confirmed'
            registration = Registration.objects.create(user_id=user_id, event_id=event_id, registration_status=registration_status)
            serializer = RegistrationSerializer(registration)
            # Update event's available seats
            event.available_seats -= 1  # Decrement available seats
            event.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

    elif request.method == 'PUT':
        try:
            #Cancel existing registration
            registration = Registration.objects.get(user_id=user_id, event_id=event_id)
            event = Event.objects.get(id=event_id)
            registration.registration_status = 'Cancelled'
            registration.save()
            # Update event's available seats
            event.available_seats += 1  # Increment available seats
            event.save()
            serializer = RegistrationSerializer(registration)
            return Response(serializer.data, status=200)
        except Registration.DoesNotExist:
            return Response({'error': 'Registration not found'}, status=status.HTTP_404_NOT_FOUND)