from rest_framework import serializers
from .models import Job, Category, Application

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class JobSerializer(serializers.ModelSerializer):
    category_name = serializers.ReadOnlyField(source='category.name')
    posted_by_username = serializers.ReadOnlyField(source='posted_by.username')

    class Meta:
        model = Job
        fields = [
            'id', 'title', 'description', 'location', 'company_name', 
            'salary_range', 'job_type', 'category', 'category_name', 
            'posted_by_username', 'created_at'
        ]

class ApplicationSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    job_title = serializers.ReadOnlyField(source='job.title')

    class Meta:
        model = Application
        fields = ['id', 'job', 'job_title', 'user', 'resume_attachment', 
                  'cover_letter', 'applied_at']