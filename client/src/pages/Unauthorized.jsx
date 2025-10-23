// Unauthorized.jsx
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

const Unauthorized = () => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem('user_role');

  const handleRedirect = () => {
    if (userRole === 'Attendee') {
      navigate('/home');
    } else if (userRole === 'Organizer') {
      navigate('/dashboard');
    } else if (userRole === 'Admin') {
      navigate('/admin');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen text-center px-4">
      <h1 className="text-3xl font-bold mb-4">🚫 Unauthorized Access</h1>
      <p className="text-lg mb-6">
        You don’t have permission to view this page. 😕<br />
        Let’s get you back to safety! 🏠
      </p>
      <Button variant="contained" color="primary" onClick={handleRedirect}>
        Go Back
      </Button>
    </div>
  );
};

export default Unauthorized;
