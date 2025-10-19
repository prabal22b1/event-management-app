

def get_user_role(user):
    """
    Check if the authenticated user has an 'attendee' role.
    """
    return getattr(user, 'role', None)

def is_event_sold_out(event):
    """
    Check if the event is sold out.
    Return True if sold out, otherwise False.
    """
    available_seats = event.available_seats
    return available_seats <= 0

def is_user_already_registered(user_id, event_id):
    """
    Check if the user is already registered for the event.
    Return True if registered, otherwise False.
    """
    return Registration.objects.filter(user_id=user_id, event_id=event_id).exists()

