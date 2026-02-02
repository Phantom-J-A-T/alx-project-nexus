from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(AbstractUser):
    class role(models.TextChoices):
        ADMIN = 'admin'
        EMPLOYER = 'employer'
        JOB_SEEKER = 'job_seeker'
    
    role = models.CharField(max_length=20, choices=role.choices, default=role.JOB_SEEKER)
    
    bio = models.TextField(blank=True, null=True)

    def __str__(self):
        return (f"{self.username} - {self.role}")

class JobSeekerProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='job_seeker_profile')
    resume = models.FileField(upload_to='resumes/', blank=True, null=True)
    cover_letter = models.TextField(blank=True, null=True)

    def __str__(self):
        return (f"{self.user.username} - Job Seeker Profile")

class EmployerProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='employer_profile')
    company_name = models.CharField(max_length=100)
    company_description = models.TextField(blank=True, null=True)

    def __str__(self):
        return (f"{self.user.username} - Employer Profile") 