from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from event_management.models import Registration, Event
from user_management.models import User
from event_management.serializers import RegistrationSerializer
from utils import get_user_role, is_event_sold_out, is_user_already_registered

@api_view(['POST', 'PUT'])
@permission_classes([IsAuthenticated])
def manageRegistrationsForEvent(request, event_id):
    """
    Handle POST and PUT requests for event registrations.
    """

    #Check if the user is authorized
    user = request.user
    
    if not get_user_role(user) == 'Attendee':
        return Response({'error': 'User is not authorized to perform this action'}, 
                        status=status.HTTP_403_FORBIDDEN)

    if request.method == 'POST': 
        try:
            event = Event.objects.get(id=event_id)
        except Event.DoesNotExist:
            return Response({'error': 'Event not found'}, status=status.HTTP_404_NOT_FOUND)
            
        # Check if event has available seats  
        try: 
            if is_event_sold_out(event):
                return Response({'error': 'Event is sold out'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        # Check existing registration
        if is_user_already_registered(user, event):
            return Response({'error': 'You are already registered for the event'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            # Create a new registration record
            try:
                registration_status = 'Confirmed'
                registration = Registration.objects.create(user_id=user, event_id=event, registration_status=registration_status)
                serializer = RegistrationSerializer(registration)
                # Update event's available seats
                event.available_seats -= 1  # Decrement available seats
                event.save()
                return Response({'message': 'User has successfully registered'}, status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


    elif request.method == 'PUT':
        try:
            event = Event.objects.get(id=event_id)
        except Event.DoesNotExist:
            return Response({'error': 'Event not found'}, status=status.HTTP_404_NOT_FOUND)
        
        try:
            #Cancel existing registration
            registration = Registration.objects.get(user_id=user, event_id=event)
            event = Event.objects.get(id=event_id)
            if registration.registration_status == 'Confirmed':
                registration.registration_status = 'Cancelled'
                registration.save()
                # Update event's available seats
                event.available_seats += 1  # Increment available seats
                event.save()
            return Response({'message': 'User has successfully cancelled the registration'}, status=200)
        except Registration.DoesNotExist:
            return Response({'error': 'Registration not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getEventRegistrationsForUser(request, user_id):
    """
    Get all events a specific user is registered for.
    Returns only event title and event_type.
    """

    user = User.objects.get(id=user_id)
    try:
        # Fetch registrations for the specific user
        registrations = Registration.objects.filter(user_id=user)
        # Extract and compile event titles and types
        events_data = []
        if registrations.exists():
            for registration in registrations:
                if registration.registration_status == 'Confirmed':
                    event = registration.event_id
                    events_data.append({
                        'title': event.title,
                        'event_type': event.event_type,
                    })
        return Response({'events': events_data, 'count': len(events_data)}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def checkIfUserRegisterforEvent(request, event_id):
    """
    Check if user is registered for a particular event
    return true if registered else false
    """

    #Check if the user is authorized
    user = request.user
    
    if not get_user_role(user) == 'Attendee':
        return Response({'error': 'User is not authorized to perform this action'}, 
                        status=status.HTTP_403_FORBIDDEN)

    try:
        event = Event.objects.get(id=event_id)
    except Event.DoesNotExist:
        return Response({'error': 'Event not found'}, status=status.HTTP_404_NOT_FOUND)
        
    try:
        # check if registration exists
        registration = Registration.objects.get(user_id=user, event_id=event)
        if registration.registration_status == 'Confirmed':
            return Response({'registered': True}, status=200)
        else:
            return Response({'registered': False}, status=200)
    except Registration.DoesNotExist:
            return Response({'error': 'Registration not found'}, status=status.HTTP_404_NOT_FOUND)