from rest_framework import permissions

class IsOwnerOrAdmin(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit or delete it.
    Admins (is_staff) are granted full access.
    """
    def has_object_permission(self, request, view, obj):
        # Allow any 'safe' methods (GET, HEAD, OPTIONS) if you want 
        # users to be able to view profiles, otherwise remove the next two lines.
        if request.method in permissions.SAFE_METHODS:
            return True

        # Check if the user is an admin OR the owner of the profile
        return request.user.is_staff or obj == request.user