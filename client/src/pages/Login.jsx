import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// import LoginForm from '../components/forms/LoginForm';
import  LoginForm from '../components/forms/LogInForm';
import Alert from '@mui/material/Alert';
import { useAuth } from  '../contexts/AuthContext';

const Login = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      window.history.replaceState({}, document.title);
    }}, []);

  const handleSubmit = async (data) => {
    setLoading(true);
    setError('');
    setSuccessMessage('');
    

    const result= await login(data);
    
    if(result.success){
      sessionStorage.setItem("user_role", result.user.role)
      sessionStorage.setItem("user_id", result.user.id)
      if (result.user.role === 'Admin') {
        navigate('/admin');
      } else if (result.user.role === 'Organizer') {
        navigate('/dashboard');
      } else {
        navigate('/home');
      }
    }else{
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
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