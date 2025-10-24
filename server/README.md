# Event Management Backend

A robust Django REST Framework API for event management with JWT authentication, role-based access control, and comprehensive event management features.

## 🎯 Overview

This backend API provides a complete event management system with user authentication, event CRUD operations, registration management, and role-based permissions. Built with Django 5.2.7 and Django REST Framework.

## 🛠️ Tech Stack

- **Django 5.2.7** - Web framework
- **Django REST Framework 3.16.1** - API framework
- **Simple JWT 5.5.1** - JWT authentication
- **Django CORS Headers 4.9.0** - Cross-origin resource sharing
- **SQLite** - Database (development)
- **DRF YASG** - API documentation (Swagger/OpenAPI)
- **Python 3.8+** - Programming language

## 🚀 Getting Started

### Prerequisites
- Python 3.8 or higher
- pip (Python package installer)
- Virtual environment (recommended)

### Installation

1. **Navigate to the server directory**
   ```bash
   cd server
   ```

2. **Create and activate virtual environment**
   ```bash
   # Create virtual environment
   python -m venv ../env

   # Activate virtual environment
   # On Windows:
   ../env/Scripts/activate
   # On macOS/Linux:
   source ../env/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run database migrations**
   ```bash
   python manage.py migrate
   ```

5. **Create superuser**
   ```bash
   python manage.py createsuperuser
   ```

6. **Start development server**
   ```bash
   python manage.py runserver
   ```

The API will be available at `http://localhost:8000`

## 📁 Project Structure

```
server/
├── api/                           # Django project settings
│   ├── __init__.py
│   ├── settings.py               # Django settings
│   ├── urls.py                   # Main URL configuration
│   ├── wsgi.py                   # WSGI configuration
│   └── asgi.py                   # ASGI configuration
├── event_management/             # Event management app
│   ├── api/v1/                   # Event API endpoints
│   │   ├── urls.py              # Event URL patterns
│   │   └── views.py             # Event view functions
│   ├── models.py                 # Event and Registration models
│   ├── serializers.py           # Event serializers
│   ├── admin.py                  # Django admin configuration
│   ├── apps.py                   # App configuration
│   └── migrations/               # Database migrations
├── user_management/              # User management app
│   ├── api/v1/                   # User API endpoints
│   │   ├── urls.py              # User URL patterns
│   │   └── views.py             # User view functions
│   ├── models.py                 # Custom User model
│   ├── serializers.py           # User serializers
│   ├── admin.py                  # Django admin configuration
│   ├── apps.py                   # App configuration
│   └── migrations/               # Database migrations
├── manage.py                     # Django management script
├── requirements.txt              # Python dependencies
├── db.sqlite3                    # SQLite database
└── utils.py                      # Utility functions
```

## 🔐 Authentication & Authorization

### JWT Authentication
The API uses JWT (JSON Web Tokens) for authentication with the following configuration:

- **Access Token Lifetime**: 5 hours (300 minutes)
- **Refresh Token Lifetime**: 7 days
- **Token Rotation**: Enabled
- **Blacklist After Rotation**: Enabled
- **Algorithm**: HS256

### User Roles
1. **Admin**: Full system access, user management
2. **Organizer**: Can create and manage events
3. **Attendee**: Can view and register for events

### Custom User Model
The application uses a custom User model with the following fields:
- `name` - User's full name
- `email` - Unique email address (used as username)
- `username` - Unique username
- `password` - Hashed password
- `role` - User role (Admin, Organizer, Attendee)
- `is_active` - Account status
- `is_staff` - Staff status
- `registered_on` - Registration timestamp

## 📊 Data Models

### Event Model
```python
class Event(models.Model):
    title = models.CharField(max_length=30)
    description = models.CharField(max_length=50)
    date = models.DateField()
    time = models.TimeField()
    location = models.CharField(max_length=30)
    available_seats = models.IntegerField()
    event_type = models.CharField(choices=EventType.choices)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL)
    created_on = models.DateTimeField(auto_now_add=True)
    last_updated_on = models.DateTimeField(auto_now=True)
```

### Registration Model
```python
class Registration(models.Model):
    event_id = models.ForeignKey(Event, on_delete=models.CASCADE)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    registration_status = models.CharField(choices=RegistrationStatus.choices)
    last_updated_on = models.DateTimeField(auto_now=True)
```

## 🔌 API Endpoints

### Authentication Endpoints
```
POST /api/v1/users/auth/register/     # User registration
POST /api/v1/users/auth/login/        # User login
POST /api/v1/users/auth/logout/       # User logout
POST /api/v1/users/auth/refresh/      # Token refresh
```

### User Management Endpoints
```
GET  /api/v1/users/                   # List users (Admin only)
GET  /api/v1/users/{id}/              # Get user details
PUT  /api/v1/users/{id}/              # Update user
DELETE /api/v1/users/{id}/            # Delete user (Admin only)
```

### Event Management Endpoints
```
GET  /api/v1/events/                  # List events
POST /api/v1/events/                  # Create event (Organizer/Admin)
GET  /api/v1/events/{id}/             # Get event details
PUT  /api/v1/events/{id}/             # Update event (Organizer/Admin)
DELETE /api/v1/events/{id}/           # Delete event (Admin only)
```

### Registration Endpoints
```
POST /api/v1/events/{id}/register/    # Register for event
GET  /api/v1/events/{id}/registrations/  # Get event registrations
PUT  /api/v1/registrations/{id}/     # Update registration status
```

## 📚 API Documentation

The API includes comprehensive documentation using Swagger/OpenAPI:

- **Swagger UI**: `http://localhost:8000/swagger/`
- **ReDoc**: `http://localhost:8000/redoc/`

## 🛡️ Security Features

### CORS Configuration
```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]
CORS_ALLOW_CREDENTIALS = True
```

### Security Settings
- **CSRF Protection**: Enabled
- **Session Security**: Configured for production
- **Password Validation**: Django's built-in validators
- **JWT Token Security**: Secure token handling

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the server directory:
```env
DJANGO_SECRET_KEY=your-secret-key-here
DEBUG=True
DATABASE_URL=sqlite:///db.sqlite3
```

### Database Configuration
Currently configured for SQLite (development):
```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
```




### Environment Variables for Production
```env
DJANGO_SECRET_KEY=your-production-secret-key
DEBUG=False
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com
DATABASE_URL=postgresql://user:password@localhost/dbname
```

## 📦 Dependencies

### Core Dependencies
- `Django==5.2.7` - Web framework
- `djangorestframework==3.16.1` - API framework
- `djangorestframework_simplejwt==5.5.1` - JWT authentication
- `django-cors-headers==4.9.0` - CORS handling

### Development Dependencies
- `pytest==8.4.2` - Testing framework
- `pytest-django==4.11.1` - Django testing utilities
- `python-dotenv==1.1.1` - Environment variable management

### Documentation
- `drf-yasg==1.21.11` - API documentation

## 🔧 Management Commands

### Database Operations
```bash
# Create migrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Collect static files
python manage.py collectstatic
```

### Development Commands
```bash
# Start development server
python manage.py runserver

# Start with custom port
python manage.py runserver 8001

# Django shell
python manage.py shell

# Check project
python manage.py check
```

#

