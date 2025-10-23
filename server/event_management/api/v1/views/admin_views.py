from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from event_management.models import Event, Registration
from user_management.models import User
from utils import get_user_role
from django.db.models import Count, Q


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_admin_stats(request):
    """
    Get admin dashboard statistics.
    Returns total users, events, and registrations.
    """
    # Check if user is admin
    if get_user_role(request.user) != 'Admin':
        return Response({'error': 'User is not authorized to perform this action'}, 
                        status=status.HTTP_403_FORBIDDEN)
    
    try:
        total_users = User.objects.count()
        total_events = Event.objects.count()
        total_registrations = Registration.objects.filter(registration_status='Confirmed').count()
        
        return Response({
            'total_users': total_users,
            'total_events': total_events,
            'total_registrations': total_registrations
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_events_admin(request):
    """
    Get all events with organizer info and registration counts for admin dashboard.
    """
    # Check if user is admin
    if get_user_role(request.user) != 'Admin':
        return Response({'error': 'User is not authorized to perform this action'}, 
                        status=status.HTTP_403_FORBIDDEN)
    
    try:
        # Get all events with organizer name
        events = Event.objects.select_related('created_by').all()
        
        events_data = []
        for event in events:
            # Count confirmed registrations for this event
            registration_count = Registration.objects.filter(
                event_id=event,
                registration_status='Confirmed'
            ).count()
            
            events_data.append({
                'id': event.id,
                'title': event.title,
                'date': event.date,
                'location': event.location,
                'event_type': event.event_type,
                'organizer_name': event.created_by.name if event.created_by else 'Unknown',
                'organizer_username': event.created_by.username if event.created_by else 'Unknown',
                'registration_count': registration_count,
                'available_seats': event.available_seats,
                'created_on': event.created_on
            })
        
        return Response({
            'events': events_data,
            'count': len(events_data)
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_event_registrations(request, event_id):
    """
    Get all registrations for a specific event.
    Returns user details for each registration.
    """
    # Check if user is admin
    if get_user_role(request.user) != 'Admin':
        return Response({'error': 'User is not authorized to perform this action'}, 
                        status=status.HTTP_403_FORBIDDEN)
    
    try:
        # Get the event
        event = Event.objects.get(id=event_id)
        
        # Get all confirmed registrations for this event
        registrations = Registration.objects.filter(
            event_id=event,
            registration_status='Confirmed'
        ).select_related('user_id')
        
        registrations_data = []
        for registration in registrations:
            registrations_data.append({
                'user_name': registration.user_id.name,
                'user_email': registration.user_id.email,
                'user_username': registration.user_id.username,
                'registration_status': registration.registration_status,
                'registered_on': registration.last_updated_on
            })
        
        return Response({
            'event_title': event.title,
            'event_id': event.id,
            'registrations': registrations_data,
            'count': len(registrations_data)
        }, status=status.HTTP_200_OK)
        
    except Event.DoesNotExist:
        return Response({'error': 'Event not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

