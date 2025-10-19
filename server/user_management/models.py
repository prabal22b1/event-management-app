from django.db import models
from django.contrib.auth.hashers import make_password
# Create your models here.

class UserManager(models.Manager):
     def create_user(self, username, email, password=None, **extra_fields):
        if not username:
            raise ValueError("The Username must be set")
        if not email:
            raise ValueError("The Email must be set")

        user = self.model(
            username=username,
            email=email,
            password=make_password(password),  # hash password
            **extra_fields
        )
        user.save(using=self._db)
        return user


class UserRole(models.TextChoices):
    ORGANIZER = 'Organizer', 'Organizer'
    ATTENDEE = 'Attendee', 'Attendee'
    ADMIN = 'Admin', 'Admin'

class User(models.Model):
    name = models.CharField(max_length=30)
    email = models.EmailField(max_length=50, unique=True)
    username = models.CharField(max_length=30, unique=True)
    password = models.CharField(max_length=255)
    role = models.CharField(        
        max_length=15,
        choices=UserRole.choices,
        default=UserRole.ATTENDEE)
    registered_on = models.DateTimeField(auto_now_add=True)
    objects = UserManager()

    def __str__(self):
        return f"{self.name} - {self.role}"

    def set_password(self, raw_password):
        self.password = make_password(raw_password)