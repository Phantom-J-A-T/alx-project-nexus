from rest_framework import viewsets, status, filters
from rest_framework.response import Response
from rest_framework.decorators import action
from django_filters.rest_framework import DjangoFilterBackend

from .models import Job, Category, Application
from .serializers import JobSerializer, CategorySerializer, ApplicationSerializer
from .permissions import IsAdminOrReadOnly

class CategoryViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows categories to be viewed or edited.
    Only Admins can Create/Update/Delete; others can only Read.
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAdminOrReadOnly]

class JobViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows jobs to be viewed or edited.
    Includes built-in filtering and a custom advanced search action.
    """
    # select_related performs a SQL JOIN to optimize database hits
    queryset = Job.objects.all().select_related('category', 'posted_by')
    serializer_class = JobSerializer
    permission_classes = [IsAdminOrReadOnly]

    # Standard filtering configuration
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['job_type', 'category__name']
    search_fields = ['title', 'description', 'company_name']
    ordering_fields = ['created_at']

    def perform_create(self, serializer):
        """
        Automatically set the user posting the job as the 'posted_by' user.
        """
        serializer.save(posted_by=self.request.user)

    @action(detail=False, methods=['get'], url_path='search')
    def search(self, request):
        """
        Custom action for advanced job search.
        Example: /api/jobs/search/?location=Lagos&job_type=REMOTE
        """
        queryset = self.get_queryset()
        
        # Performance Tip: Use istartswith for better index utilization than icontains
        location = request.query_params.get('location', None)
        if location:
            queryset = queryset.filter(location__istartswith=location)
            
        job_type = request.query_params.get('job_type', None)
        if job_type:
            queryset = queryset.filter(job_type=job_type)
            
        category = request.query_params.get('category', None)
        if category:
            queryset = queryset.filter(category__name__icontains=category)
            
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

class ApplicationViewSet(viewsets.ModelViewSet):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer

    def get_queryset(self):
        user = self.request.user
        if user.role == 'ADMIN':
            # Admins see applications for jobs they created
            return Application.objects.filter(job__posted_by=user)
        # Candidates see only their own applications
        return Application.objects.filter(user=user)

    def perform_create(self, serializer):
        # Ensure only candidates can apply
        if self.request.user.role != 'CANDIDATE':
            raise serializers.ValidationError("Only candidates can apply for jobs.")
        serializer.save(user=self.request.user)