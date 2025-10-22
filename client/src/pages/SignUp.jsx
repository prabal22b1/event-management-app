import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {useAuth} from '../contexts/AuthContext';   
import axios from 'axios';
import SignUpForm from '../components/forms/SignUpForm';

import Alert from '@mui/material/Alert';

const SignUp = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {register}= useAuth();

  const handleSubmit = async (data) => {
    setLoading(true);
    setError('');
    setSuccess('');
    
    const result= await register(data);

        if(result.success){
          setSuccess('Registration successful! Redirecting to login...');

          setTimeout(() => {
            navigate('/login', { 
              replace: true,
              state: { 
                  message: 'Registration successful! Please login with your credentials.'
                  }});
                }, 2000);}
        else{

        if(typeof result.error === 'object'){
            if(result.error.username){
              setError(`Username: ${result.error.username[0]}`);
            }else if(result.error.email){
              setError(`Email: ${result.error.email[0]}`);
            }else if(result.error.detail){
              setError(result.error.detail);
            }else{
              setError(Object.values(result.error)[0]?.[0] || 'Registration failed');
            }
          }else{
           setError(result.error);
          }}

    setLoading(false);
    };

  return (
    <div className="flex justify-center items-center p-16">
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