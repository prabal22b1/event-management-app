import React from 'react';
import { AppBar, Toolbar, Typography, Button, Divider } from '@mui/material';
import { Navigate, useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate()
  const user_role = localStorage.getItem('user_role')

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
          body: JSON.stringify({ refresh: refreshToken })
        });
      }

      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user_role');

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
        <Typography variant="h6" style={{ flexGrow: 1 }} className='hover:text-black'>
          <a href="/home" style={{ textDecoration: 'none', color: 'inherit' }}>
            Eventify
          </a>
        </Typography>
        {(user_role === 'Attendee' || user_role === 'Organizer') && (
          <Button color="inherit" onClick={navigateToDashboard} className='hover:text-black'>
            Dashboard
          </Button>
        )}
        <Divider orientation="vertical" flexItem style={{ margin: '0 10px'}} />
        <Button color="inherit" onClick={handleLogout} className='hover:text-black'>Logout</Button>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;