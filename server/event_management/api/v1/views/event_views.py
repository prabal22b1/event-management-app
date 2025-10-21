from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from event_management.models import Event
from user_management.models import User
from event_management.serializers import EventSerializer
from utils import get_user_role
from django.utils import timezone


@api_view(['POST', 'GET'])
def manageEvent(request):
    """
    Handle POST and GET requests for event creation.
    """
    
    if request.method == 'POST':
        #Check if the user is authorized
        user = request.user

        #If not authenticated send 401 error
        if not request.user.is_authenticated:
            return Response({'error': 'User is not authenticated to perform this action'}, status=status.HTTP_401_UNAUTHORIZED)

        # Check if user is Organizer, otherwise send 403 error  
        if not get_user_role(user) == 'Organizer':
            return Response({'error': 'User is not authorized to perform this action'}, 
                        status=status.HTTP_403_FORBIDDEN)
        try:
            # Create the event in the database
            event = Event.objects.create(title=request.data.get("title"), description=request.data.get("description"),
                                        date=request.data.get("date"), time=request.data.get("time"), available_seats=request.data.get("available_seats"),
                                        location=request.data.get("location"), event_type=request.data.get("event_type"), created_by=request.user)
            serializer = EventSerializer(event)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            # Send 400 error in case of any exception
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
    
    elif request.method == 'GET': #if GET request
        try:
            events = Event.objects.all()
            if not events.exists():
                return Response({'message': 'No events found'}, status=status.HTTP_200_OK) #If no events found, send message
            
            # If events found, filter them with date older than current date and time to excluse expired events
            current_date = timezone.now()
            events = events.filter(date__gte=current_date.date())

            # Return only required fields for the homepage
            events_data = []
            for event in events:
                events_data.append({
                    'event_id': event.id,
                    'title': event.title,
                    'date': event.date,
                    'location': event.location,
                    'event_type': event.event_type,
                    'available_seats': event.available_seats
                })
            return Response(events_data, status=status.HTTP_200_OK) #Send 200 OK with events data
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST) #Send 400 error in case of any exception



@api_view(['PUT', 'GET'])
def manageEventDetails(request, event_id):
    """
    Handle PUT and GET requests for event details.
    """
    
    #Check if the user is authorized
    user = request.user
    
    if request.method == 'PUT':
        if not request.user.is_authenticated:
            return Response({'error': 'User is not authenticated to perform this action'}, status=status.HTTP_401_UNAUTHORIZED)

        if not get_user_role(user) == 'Organizer':
            return Response({'error': 'User is not authorized to perform this action'}, 
                        status=status.HTTP_403_FORBIDDEN)

        try:
            event = Event.objects.get(id=event_id)
        except Event.DoesNotExist:
            return Response({'error': 'Event not found'}, status=status.HTTP_404_NOT_FOUND)

        # Deserialize and validate request data
        serializer = EventSerializer(event, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            # Ensure we're serializing the most up-to-date instance
            updated_event = Event.objects.get(id=event_id)
            serializer = EventSerializer(updated_event)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



