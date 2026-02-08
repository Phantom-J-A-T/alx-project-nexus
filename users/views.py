from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import UserSerializer
from .permissions import IsOwnerOrAdmin # Import your new permission
from django.contrib.auth import get_user_model

User = get_user_model()

class UserListCreateView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        # Allow anyone to POST (register)
        if self.request.method == 'POST':
            return [AllowAny()]
        # Require login to see the list of all users
        return [IsAuthenticated()]

class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'id'
    
    # Use the custom permission: 
    # Must be logged in AND (must be the owner OR an admin)
    permission_classes = [IsAuthenticated, IsOwnerOrAdmin]