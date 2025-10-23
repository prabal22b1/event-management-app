import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
// import LoginForm from '../components/forms/LoginForm';
import  LoginForm from '../components/forms/LogInForm';
import Alert from '@mui/material/Alert';

const Login = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      window.history.replaceState({}, document.title);
    }
  }, []);

  const handleSubmit = async (data) => {
    setLoading(true);
    setError('');
    setSuccessMessage('');
    
    try {
      const response = await axios.post(
        'http://localhost:8000/api/v1/users/auth/login/',
        data,
        {
          headers: {
            'Content-type': 'application/json'
          }
        }
      );

      localStorage.setItem('accessToken', response.data.access);
      localStorage.setItem('refreshToken', response.data.refresh);
      localStorage.setItem('user_role', response.data.user.role);

      if (response.data.user.role === 'Admin') {
        navigate('/admin');
      } else if (response.data.user.role === 'Organizer') {
        navigate('/dashboard');
      } else {
        navigate('/home');
      }

    } catch (err) {
      console.error('Login error:', err);
      const errorMessage = err.response?.data?.detail || 
                          err.response?.data?.message || 
                          'Login failed';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="p-8 bg-white rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {successMessage && !error && (
          <Alert severity="success" className="mb-4">
            {successMessage}
          </Alert>
        )}
        {error && (
          <Alert severity="error" className="mb-4">
            {error}
          </Alert>
        )}
        <LoginForm 
          onSubmit={handleSubmit}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default Login;