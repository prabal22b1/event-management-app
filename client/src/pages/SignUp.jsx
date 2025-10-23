import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SignUpForm from '../components/forms/SignUpForm';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const SignUp = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleSubmit = async (data) => {
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const response = await axios.post(
        'http://localhost:8000/api/v1/users/register/',
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      setSuccess('Registration successful! Redirecting to login...');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);

      setTimeout(() => {
        navigate('/login', { 
          replace: true,
          state: { 
            message: 'Registration successful! Please login with your credentials.'
          }
        });
      }, 2000);

    } catch (err) {
      console.error('Registration error:', err);
      
      let errorMessage = 'Registration failed. Please try again.'
      if (err.response?.data) {
        const errorData = err.response.data;
        
        if (typeof errorData === 'object') {
          if (errorData.username) {
            errorMessage = `Username: ${errorData.username[0]}`;
          } else if (errorData.email) {
            errorMessage = `Email: ${errorData.email[0]}`
          } else if (errorData.detail) {
            errorMessage = errorData.detail;
          } else {
            errorMessage = Object.values(errorData)[0]?.[0] || 'Registration failed. Please try again';
          }
        } else {
          errorMessage = errorData;
        }
      } 
      setError(errorMessage);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
    setError('');
    setSuccess(''); 
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="p-8 bg-white rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
       <SignUpForm 
          onSubmit={handleSubmit}
          loading={loading}
        />
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={4000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert 
            onClose={handleCloseSnackbar} 
            severity={snackbarSeverity} 
            sx={{ width: '100%' }}
          >
            {success || error}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default SignUp;