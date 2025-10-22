import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../contexts/AuthContext';


const LogoutButton = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
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