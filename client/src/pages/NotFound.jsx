// NotFound.jsx
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

const NotFound = () => {
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
      <h1 className="text-4xl font-bold mb-4">😵 404 - Page Not Found</h1>
      <p className="text-lg mb-6">
        Oops! The page you're looking for doesn't exist. 🕵️‍♂️<br />
        Let’s get you back on track! 🚀
      </p>
      <Button variant="contained" color="primary" onClick={handleRedirect}>
        Go Home
      </Button>
    </div>
  );
};

export default NotFound;
