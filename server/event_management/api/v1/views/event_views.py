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
        if get_user_role(user) != 'Organizer':
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
            
            # Filter out events that are older than current date (exclude expired events)
            current_date = timezone.now()
            events = events.filter(date__gte=current_date.date())
            
            # If no events found after filtering, return empty list and count 0
            if not events.exists():
                return Response({'events': [], 'count': 0}, status=status.HTTP_200_OK)

            # Serialize the data
            serializer = EventSerializer(events, many=True)

            # Return only required fields for the homepage
            required_fields = ['id', 'title', 'date', 'location', 'event_type', 'available_seats']
            events_data = [
                {field: event[field] for field in required_fields} 
                for event in serializer.data
                ]

            #Send 200 OK with events data and count
            return Response({
                    'events':events_data, 
                    'count': len(events_data) 
                }, 
                status=status.HTTP_200_OK) 
        
        #Send 400 error in case of any exception
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST) 



@api_view(['PUT', 'GET'])
def manageEventDetails(request, event_id):
    """
    Handle PUT and GET requests for event details.
    """
    
    if request.method == 'PUT':
        
        #Check if the user is authorized
        user = request.user

        if not request.user.is_authenticated:
            return Response({'error': 'User is not authenticated to perform this action'}, status=status.HTTP_401_UNAUTHORIZED)

        if get_user_role(user) != 'Organizer':
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
    
    # Handle GET request for event details by event_id
    elif request.method == 'GET':
        try:
            # Validate event_id 
            try:
                event_id = int(event_id)
                if not event_id:
                    raise ValueError("Event ID cannot be zero/Invalid event ID")
            except ValueError:
                return Response({'error': 'Invalid event ID format'}, status=status.HTTP_400_BAD_REQUEST)
            
            # Attempt to retrieve the event from the database using event_id
            try:
                event = Event.objects.get(id=event_id)
            except Event.DoesNotExist:
                return Response({'error': 'Event not found'}, status=status.HTTP_404_NOT_FOUND)

            # Serialize the event data for response
            serializer = EventSerializer(event)

            return Response(serializer.data, status=status.HTTP_200_OK)
    
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getEventsForOrganizer(request):
    """
    Retrieve all events created by a specific organizer.
    """
    try:
        # Validate user_id
        try:
            user_id = request.user.id
            # user_id = int(user_id)
            if not user_id:
                raise ValueError("User ID cannot be zero/Invalid user ID")
        except ValueError:
            return Response({'error': 'Invalid user ID format'}, status=status.HTTP_400_BAD_REQUEST)

        # Check if the organizer exists
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({'error': 'User id not found'}, status=status.HTTP_404_NOT_FOUND)

        #Verify the user has organizer role
        if get_user_role(user) != 'Organizer':
            return Response({'error': 'User is not an organizer'}, status=status.HTTP_403_FORBIDDEN)
        else:
            organizer = user

        # Retrieve all the events created by the Organizer
        # Get current datetime and filter events that are upcoming
        current_datetime = timezone.now()
        events = Event.objects.filter(
            created_by=organizer,
            date__gte=current_datetime.date()
            ).order_by('-date', '-time')

        # Serialize the data
        serializer = EventSerializer(events, many=True)

        # Return only required fields for the homepage
        required_fields = ['id', 'title', 'date', 'location', 'event_type', 'available_seats']
        events_data = [
                {field: event[field] for field in required_fields} 
                for event in serializer.data
            ]

        return Response({
                'events': events_data,
                'count': len(events_data)
            },
            status=status.HTTP_200_OK)

    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
