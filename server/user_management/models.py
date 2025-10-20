from django.db import models
from django.contrib.auth.hashers import make_password,check_password
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager,PermissionsMixin

from django.utils import timezone 
# Create your models here.

class UserManager(BaseUserManager):
     
    def create_user(self,email, username, password=None, **extra_fields):
        if not email:
            raise ValueError("The email must be set")
        if not username:
            raise ValueError("The username must be set")

        user = self.model(
            email=email,
            username=username,
            
            password=make_password(password),  # hash password
            **extra_fields
        )
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('role', UserRole.ADMIN)


        if extra_fields.get('role') != UserRole.ADMIN:
            raise ValueError('Superuser must have role= Admin.')
        
        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, username, password, **extra_fields)
    def get_by_natural_key(self, email):
        return self.get(email=email)
    
    
class UserRole(models.TextChoices):
    ORGANIZER = 'Organizer', 'Organizer'
    ATTENDEE = 'Attendee', 'Attendee'
    ADMIN = 'Admin', 'Admin'

class User(AbstractBaseUser,PermissionsMixin):
    name = models.CharField(max_length=30)
    email = models.EmailField(max_length=50, unique=True)
    username = models.CharField(max_length=30, unique=True)
    password = models.CharField(max_length=255)

    role = models.CharField(        
        max_length=15,
        choices=UserRole.choices,
        default=UserRole.ATTENDEE)
   
    registered_on = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)   
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']


    def __str__(self):
        return f"{self.name} - {self.role}"

    def set_password(self, raw_password):
        self.password = make_password(raw_password)
        self.save()

    def check_password(self, raw_password):    
        return check_password(raw_password, self.password)

    def has_perm(self, perm, obj = None):
        return True
    def has_module_perms(self, app_label):
        return True
    

    @property
    def is_admin(self):
        return self.role == UserRole.ADMIN
    
    @property
    def is_organizer(self):
        return self.role == UserRole.ORGANIZER
    @property
    def is_attendee(self):
        return self.role == UserRole.ATTENDEE

        
    
   