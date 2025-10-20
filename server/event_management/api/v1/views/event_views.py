from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from event_management.models import Event
from user_management.models import User
from event_management.serializers import EventSerializer
from utils import get_user_role


@api_view(['POST', 'GET'])
def manageEvent(request):
    """
    Handle POST and GET requests for event creation.
    """

    #Check if the user is authorized
    user = request.user
    
    if request.method == 'POST':
        if not request.user.is_authenticated:
            return Response({'error': 'User is not authenticated to perform this action'}, status=status.HTTP_401_UNAUTHORIZED)

        if not get_user_role(user) == 'Organizer':
            return Response({'error': 'User is not authorized to perform this action'}, 
                        status=status.HTTP_403_FORBIDDEN)
        try:
            event = Event.objects.create(title=request.data.get("title"), description=request.data.get("description"),
                                        date=request.data.get("date"), time=request.data.get("time"), available_seats=request.data.get("available_seats"),
                                        location=request.data.get("location"), event_type=request.data.get("event_type"), created_by=request.user)
            serializer = EventSerializer(event)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


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



