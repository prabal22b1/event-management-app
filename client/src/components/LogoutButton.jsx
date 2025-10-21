import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';

const LogoutButton = () => {
  const navigate = useNavigate();

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

  return (
    <Button 
      onClick={handleLogout}
      variant="outlined"
      color="primary"
      startIcon={<LogoutIcon />}
      sx={{ 
        position: 'absolute',
        top: '1rem',
        right: '1rem'
      }}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;