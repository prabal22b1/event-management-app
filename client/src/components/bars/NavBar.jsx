import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Navigate, useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate()
  const handleLogin = () => {
    navigate('/login')
  };

  const handleRegister = () => {
    navigate('/signup')
  };

  return (
    <AppBar position="static" style={{ backgroundColor: '#FF5733' }}>
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Eventify
        </Typography>
        <Button color="inherit" onClick={handleLogin}>Login</Button>
        <Button color="inherit" onClick={handleRegister}>Register</Button>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;