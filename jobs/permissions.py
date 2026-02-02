from rest_framework import permissions

class IsAdminOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow admins to edit/delete jobs.
    """
    def has_permission(self, request, view):
        # Read permissions are allowed to any request (GET, HEAD, OPTIONS)
        if request.method in permissions.SAFE_METHODS:
            return True

        # Write permissions are only allowed to users with the ADMIN role
        return bool(request.user and request.user.is_authenticated and request.user.role == 'ADMIN')