# Event Management Frontend

A modern React application for event management built with Vite, Tailwind CSS, and Material-UI components.

## 🎯 Overview

This frontend application provides an intuitive interface for managing events, user authentication, and event registrations. It features role-based access control with different dashboards for Admins, Organizers, and Attendees.

## 🛠️ Tech Stack

- **React 19** - Latest React with modern features
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Material-UI (MUI)** - React component library
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API requests
- **React Hook Form** - Form handling and validation
- **React Toastify** - Toast notifications
- **Date-fns** - Date manipulation library

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Navigate to the client directory**
   ```bash
   cd client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
client/
├── public/                 # Static assets
│   ├── concert.jpg        # Event type images
│   ├── conference.jpg
│   ├── webinar.jpg
│   ├── workshop.jpg
│   ├── landing-image.png  # Landing page image
│   └── logo.png          # App logo
├── src/
│   ├── components/        # Reusable components
│   │   ├── bars/         # Navigation components
│   │   │   ├── NavBar.jsx
│   │   │   └── SearchBar.jsx
│   │   ├── cards/        # Event display components
│   │   │   ├── EventCard.jsx
│   │   │   └── EventDetailCard.jsx
│   │   ├── forms/        # Form components
│   │   │   ├── EventRegistrationForm.jsx
│   │   │   ├── LogInForm.jsx
│   │   │   └── SignUpForm.jsx
│   │   ├── EventRegistrationsModal.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── Spinner.jsx
│   ├── pages/            # Page components
│   │   ├── AdminDashboard.jsx
│   │   ├── Dashboard.jsx
│   │   ├── EditEvent.jsx
│   │   ├── EventDetails.jsx
│   │   ├── Home.jsx
│   │   ├── LandingPage.jsx
│   │   ├── Login.jsx
│   │   ├── NewEvent.jsx
│   │   ├── NotFound.jsx
│   │   ├── SignUp.jsx
│   │   └── Unauthorized.jsx
│   ├── routes/           # Routing configuration
│   │   └── AppRoutes.jsx
│   ├── App.jsx           # Main application component
│   ├── App.css           # Global styles
│   ├── index.css         # Tailwind CSS imports
│   └── main.jsx          # Application entry point
├── package.json          # Dependencies and scripts
├── tailwind.config.js    # Tailwind configuration
├── vite.config.js        # Vite configuration
└── eslint.config.js      # ESLint configuration
```

## 🎨 Features

### Authentication & Authorization
- **User Registration** with role selection (Admin, Organizer, Attendee)
- **Secure Login** with JWT token authentication
- **Protected Routes** based on user roles
- **Automatic token refresh** and logout handling

### Event Management
- **Event Creation** (Organizers and Admins)
- **Event Listing** with search and filter capabilities
- **Event Details** with comprehensive information
- **Event Registration** for attendees
- **Event Editing** (Organizers and Admins)
- **Event Deletion** (Admins only)

### User Interface
- **Responsive Design** for all screen sizes
- **Modern Material-UI Components**
- **Tailwind CSS** for custom styling
- **Loading States** and error handling
- **Toast Notifications** for user feedback
- **Form Validation** with React Hook Form

### Role-Based Dashboards
- **Admin Dashboard**: User management, system overview
- **Organizer Dashboard**: Event creation and management
- **Attendee Dashboard**: Event browsing and registration

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
```

## 🎨 Styling

The application uses a combination of:
- **Tailwind CSS** for utility-first styling
- **Material-UI** for consistent component design
- **Custom CSS** for specific styling needs

### Tailwind Configuration
The app is configured with custom colors and responsive breakpoints in `tailwind.config.js`.

## 🔌 API Integration

The frontend communicates with the Django backend through:
- **Base URL**: `http://localhost:8000/api/v1/`
- **Authentication**: JWT Bearer tokens
- **Error Handling**: Comprehensive error handling with user-friendly messages

### Key API Endpoints Used
- `/users/auth/login/` - User authentication
- `/users/auth/register/` - User registration
- `/events/` - Event CRUD operations
- `/events/{id}/register/` - Event registration

## 🛡️ Security Features

- **JWT Token Management** with automatic refresh
- **Protected Routes** based on authentication status
- **Role-based Access Control** for different user types
- **Input Validation** on all forms
- **XSS Protection** through React's built-in escaping

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop** (1024px and above)
- **Tablet** (768px - 1023px)
- **Mobile** (320px - 767px)

## 🧪 Development Guidelines

### Component Structure
- Use functional components with hooks
- Implement proper prop validation
- Follow React best practices
- Use custom hooks for reusable logic

### State Management
- Local state with `useState`
- Context API for global state (authentication)
- Form state with React Hook Form

### Code Quality
- ESLint for code linting
- Consistent naming conventions
- Proper error handling
- Loading states for better UX



### Build for Production
```bash
npm run build
```
.

### Environment Variables
Create a `.env` file in the client directory:
```env
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

## 🐛 Troubleshooting

### Common Issues



## 📚 Dependencies

### Core Dependencies
- `react` - UI library
- `react-dom` - React DOM bindings
- `react-router-dom` - Routing
- `axios` - HTTP client
- `react-hook-form` - Form handling

### UI Dependencies
- `@mui/material` - Material-UI components
- `@mui/icons-material` - Material-UI icons
- `@mui/x-date-pickers` - Date picker components
- `@emotion/react` - CSS-in-JS library
- `@emotion/styled` - Styled components


- `tailwindcss` - CSS framework


