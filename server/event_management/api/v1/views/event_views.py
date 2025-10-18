from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from ..models import Event
from user_management.models import User
from ..serializers import EventSerializer
from ...utils import get_user_role


@api_view(['POST', 'GET'])
@permission_classes([IsAuthenticated])
def manageEvent(request):
    """
    Handle POST and GET requests for event creation.
    """

    #Check if the user is authorized
    user_id = request.data.get('user_id')
    user = User.objects.get(id=user_id)
    
    if request.method == 'POST':
        if not get_user_role(user) == 'Organizer':
        return Response({'error': 'User is not authorized to perform this action'}, 
                        status=status.HTTP_403_FORBIDDEN)
        try:
            event = Event.objects.create(title=request.data.title, description=request.data.description,
                                        date=request.data.date, time=request.data.time, available_seats=request.data.available_seats,
                                        event_type=request.data.event_type)
            serializer = EventSerializer(event)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT', 'GET'])
@permission_classes([IsAuthenticated])
def manageEventDetails(request, event_id):
    """
    Handle PUT and GET requests for event details.
    """

    #Check if the user is authorized
    user_id = request.user_id
    user = User.objects.get(id=user_id)
    
    if request.method == 'PUT':
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
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



