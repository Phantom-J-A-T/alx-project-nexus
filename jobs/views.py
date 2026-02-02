from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Job, Category
from .serializers import JobSerializer, CategorySerializer
from .permissions import IsAdminOrReadOnly

class CategoryViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows categories to be viewed or edited.
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAdminOrReadOnly]

class JobViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows jobs to be viewed or edited.
    """
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [IsAdminOrReadOnly]

    def perform_create(self, serializer):
        """
        Set the creator as the user posting the job.
        """
        serializer.save(posted_by=self.request.user)

    @action(detail=False, methods=['get'], url_path='search')
    def search(self, request):
        """
        Custom action for advanced job search with filtering.
        Example: /api/jobs/search/?location=Remote&job_type=FULL_TIME
        """
        queryset = self.queryset
        
        # Filter by location if provided
        location = request.query_params.get('location', None)
        if location:
            queryset = queryset.filter(location__icontains=location)
            
        # Filter by job type if provided
        job_type = request.query_params.get('job_type', None)
        if job_type:
            queryset = queryset.filter(job_type=job_type)
            
        # Filter by category if provided
        category = request.query_params.get('category', None)
        if category:
            queryset = queryset.filter(category__name=category)
            
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
