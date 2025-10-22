// LandingPage.jsx
import React from 'react';
import { Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';



function LandingPage() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    // Navigate to the home page
    navigate("/home")
  };



  return (
    <div style={{ backgroundImage: 'url("eventify-background.png")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    flexDirection: 'column', 
    gap: '20px'}}>
      <Typography variant="h4" color="secondary" gutterBottom>
        Welcome to Eventify
      </Typography>
      <Typography variant="h6" color="textSecondary">
        We turn plans into experiences.
      </Typography>
      <Button 
        variant="contained" 
        color="primary" 
        size="large"
        onClick={handleButtonClick}
        style={{ backgroundColor: '#FF5733', color: '#fff' }}
      >
        Go to Home Page
      </Button>
    </div>
  );
}

export default LandingPage