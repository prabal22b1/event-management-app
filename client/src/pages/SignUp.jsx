import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SignUpForm from '../components/forms/SignUpForm';
import Alert from '@mui/material/Alert';

const SignUp = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
      
      if (err.response?.data) {
        const errorData = err.response.data;
        
        if (typeof errorData === 'object') {
          if (errorData.username) {
            setError(`Username: ${errorData.username[0]}`);
          } else if (errorData.email) {
            setError(`Email: ${errorData.email[0]}`);
          } else if (errorData.detail) {
            setError(errorData.detail);
          } else {
            setError(Object.values(errorData)[0]?.[0] || 'Registration failed');
          }
        } else {
          setError(errorData);
        }
      } else {
        setError('Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="p-8 bg-white rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        {success ? (
          <Alert severity="success" className="mb-4">
            {success}
          </Alert>
        ) : error ? (
          <Alert severity="error" className="mb-4">
            {error}
          </Alert>
        ) : null}
        <SignUpForm 
          onSubmit={handleSubmit}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default SignUp;