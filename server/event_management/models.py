from django.db import models
from user_management.models import User

class EventType(models.TextChoices):
    WEBINAR = 'Webinar', 'Webinar'
    CONFERENCE = 'Conference', 'Conference'
    WORKSHOP = 'Workshop', 'Workshop'
    CONCERT = 'Concert', 'Concert'


class Event(models.Model):
    title = models.CharField(max_length=30)
    description = models.EmailField(max_length=50, unique=True)
    date = models.DateField(max_length=30)
    time = models.TimeField()
    location = models.CharField(max_length=30)
    available_seats = models.IntegerField()
    event_type = models.CharField(        
        max_length=15,
        choices=EventType.choices,
        default=EventType.WEBINAR)
    created_on = models.DateTimeField(auto_now_add=True)
    last_updated_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class RegistrationStatus(models.TextChoices):
    CONFIRMED = 'Confirmed', 'Confirmed'
    CANCELLED = 'Cancelled', 'Cancelled'


class Registration(models.Model):
    event_id = models.ForeignKey(
        Event,
        on_delete=models.CASCADE,
        related_name="event"
    )
    user_id = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="user"
    )
    registration_status = models.CharField(        
        max_length=15,
        choices=RegistrationStatus.choices)
    last_updated_on = models.DateTimeField(auto_now_add=True)