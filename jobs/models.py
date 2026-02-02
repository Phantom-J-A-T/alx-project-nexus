from django.db import models
from django.conf import settings

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name

class Job(models.Model):
    JOB_TYPE_CHOICES = [
        ('FULL_TIME', 'Full Time'),
        ('PART_TIME', 'Part Time'),
        ('CONTRACT', 'Contract'),
        ('REMOTE', 'Remote'),
    ]

    title = models.CharField(max_length=255)
    description = models.TextField()
    location = models.CharField(max_length=255)
    company_name = models.CharField(max_length=255)
    salary_range = models.CharField(max_length=100, blank=True, null=True)
    job_type = models.CharField(max_length=20, choices=JOB_TYPE_CHOICES)
    
    # Relationships
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='jobs')
    posted_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        # Optimization: Adding indexes for high-traffic search fields
        indexes = [
            models.Index(fields=['location']),
            models.Index(fields=['job_type']),
            models.Index(fields=['created_at']),
        ]
        ordering = ['-created_at']

    def __str__(self):
        return self.title

class Application(models.Model):
    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name='applications')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='my_applications')
    resume_attachment = models.FileField(upload_to='resumes/', blank=True, null=True)
    cover_letter = models.TextField()
    applied_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        # Prevent a user from applying to the same job more than once
        unique_together = ('job', 'user')
        ordering = ['-applied_at']

    def __str__(self):
        return f"{self.user.username} - {self.job.title}"