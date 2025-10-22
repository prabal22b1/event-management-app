import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Navigate, useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate()
  const { logout } = useAuth();
  
    const handleLogout = async () => {
      await logout();
      navigate('/', { replace: true });
    };

  const handleRegister = () => {
    navigate('/dashboard')
  };

  return (
    <AppBar position="static" style={{ backgroundColor: '#FF5733' }}>
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Eventify
        </Typography>
        <Button color="inherit" onClick={handleLogout}>Logout</Button>
        <Button color="inherit" onClick={handleRegister}>My Registrations</Button>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;