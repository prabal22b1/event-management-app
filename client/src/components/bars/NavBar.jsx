import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from '../../contexts/AuthContext';

function NavBar() {
  const navigate = useNavigate()
  // const { logout } = useAuth();
  
    const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      
      if (refreshToken) {
        await fetch('http://localhost:8000/api/v1/users/auth/logout/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          },
          body: JSON.stringify({ refresh_token: refreshToken })
        });
      }

      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Logout error:', error);

      localStorage.clear();
      navigate('/login', { replace: true });
    }
  };


  const navigateToDashboard = () => {
    navigate('/dashboard')
  };

  return (
    <AppBar position="static" style={{ backgroundColor: '#FF5733' }}>
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Eventify
        </Typography>
        <Button color="inherit" onClick={navigateToDashboard}>My Registrations</Button>
        <Button color="inherit" onClick={handleLogout}>Logout</Button>   
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;