from rest_framework import serializers
from .models import Job, Category

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