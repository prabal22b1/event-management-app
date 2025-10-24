# Event Management Application

A full-stack event management system built with React (Frontend) and Django REST Framework (Backend). This application allows users to create, manage, and register for events with role-based access control.

## 🚀 Features

### User Management
- **User Registration & Authentication** with JWT tokens
- **Role-based Access Control** (Admin, Organizer, Attendee)
- **Secure Password Management**

### Event Management
- **Create, Read, Update, Delete Events**
- **Event Types**: Webinar, Conference, Workshop, Concert
- **Event Registration System**
- **Available Seats Management**
- **Event Search and Filtering**

### Admin Features
- **Admin Dashboard** for system management
- **User Management**
- **Event Oversight**

## 🏗️ Architecture

```
event-management-app/
├── client/          # React Frontend (Vite + Tailwind CSS)
├── server/          # Django Backend (DRF + JWT)
└── env/            # Python Virtual Environment
```

## 🛠️ Tech Stack

### Frontend
- **React 19** with Vite
- **Tailwind CSS** for styling
- **Material-UI** components
- **React Router** for navigation
- **Axios** for API calls
- **React Hook Form** for form handling

### Backend
- **Django 5.2.7** with Django REST Framework
- **JWT Authentication** (Simple JWT)
- **SQLite Database** (development)
- **CORS Headers** for cross-origin requests
- **Swagger/OpenAPI** documentation

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v16 or higher)
- **Python** (v3.8 or higher)
- **Git**

### 1. Clone the Repository
```bash
git clone <repository-url>
cd event-management-app
```

### 2. Backend Setup
```bash
# Navigate to server directory
cd server

# Create and activate virtual environment
python -m venv ../env
# On Windows:
../env/Scripts/activate
# On macOS/Linux:
source ../env/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Start development server
python manage.py runserver
```

The backend will be available at `http://localhost:8000`

### 3. Frontend Setup
```bash
# Navigate to client directory (in a new terminal)
cd client

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:5173`

## 📚 API Documentation

Once the backend is running, you can access:
- **Swagger UI**: `http://localhost:8000/swagger/`
- **ReDoc**: `http://localhost:8000/redoc/`

## 🔐 Default User Roles

1. **Admin**: Full system access, user management
2. **Organizer**: Can create and manage events
3. **Attendee**: Can view and register for events

## 📁 Project Structure

### Backend (`/server`)
```
server/
├── api/                    # Django project settings
├── event_management/       # Event app
│   ├── api/v1/            # Event API endpoints
│   ├── models.py          # Event & Registration models
│   └── serializers.py     # Event serializers
├── user_management/       # User app
│   ├── api/v1/            # User API endpoints
│   ├── models.py          # User model
│   └── serializers.py     # User serializers
└── manage.py              # Django management script
```

### Frontend (`/client`)
```
client/
├── src/
│   ├── components/        # Reusable components
│   │   ├── bars/         # Navigation components
│   │   ├── cards/        # Event cards
│   │   └── forms/        # Form components
│   ├── pages/            # Page components
│   ├── routes/           # Routing configuration
│   └── App.jsx           # Main app component
├── public/               # Static assets
└── package.json          # Dependencies
```



### Backend Deployment
1. Set `DEBUG = False` in settings
2. Configure production database
3. Set up environment variables
4. Deploy to your preferred platform

### Frontend Deployment
```bash
cd client
npm run build
```



