import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import LoginForm from '../components/forms/LogInForm';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import React from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';


const Login = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message);

      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleClose = () => {
    setError(null);
    navigate('/home');
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );



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

      setSuccessMessage('Login successful!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);

      setTimeout(() => {
        if (response.data.user.role === 'Admin') {
          navigate('/admin');
        } else if (response.data.user.role === 'Organizer') {
          navigate('/dashboard');
        } else if (response.data.user.role === 'Attendee') {
          navigate('/home');
        }
      }, 1500);

    } catch (err) {
      console.error('Login error:', err);
      const errorMessage = err.response?.data?.detail ||
        err.response?.data?.message ||
        'Login failed, Please try again!';
      setError(errorMessage);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="p-8 bg-white rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <LoginForm
          onSubmit={handleSubmit}
          loading={loading}
        />
      </div>
      <Snackbar
        open={loading}
        autoHideDuration={3000}
        onClose={handleClose}
        message="Signing In...."
        action={action}
      />
      <Snackbar
        open={!!error}
        autoHideDuration={3000}
        onClose={handleClose}
        message={error}
        action={action}
      />
    </div>
  );
};

export default Login;