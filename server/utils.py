

def get_user_role(user):
    """
    Check if the authenticated user has an 'attendee' role.
    """
    return getattr(user, 'role', None)