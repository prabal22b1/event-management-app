from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from user_management.models import User
from django.utils import timezone

from user_management.serializers import UserSerializer

@api_view(['GET'])
def get_registered_users(request):
    """
    Handle GET requests to retrieve registered users for events.
    """
    
    if request.method == 'GET': #if GET request
        try:
            users = User.objects.all()
            
         
            if not users.exists():
                return Response({'users': []}, status=status.HTTP_200_OK)

            # Serialize the data
            serializer = UserSerializer(users, many=True)

            # Return only required fields for the homepage
            required_fields = ['id', 'username', 'email', 'name', 'role']
            users_data = [
                {field: user[field] for field in required_fields} 
                for user in serializer.data
                ]

            #Send 200 OK with users data and count
            return Response({
                    'users':users_data, 
                    'count': len(users_data) 
                }, 
                status=status.HTTP_200_OK) 
        
        #Send 400 error in case of any exception
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST) 

