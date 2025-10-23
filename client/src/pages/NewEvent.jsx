import React from "react"
import EventRegistrationForm from "../components/forms/EventRegistrationForm"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';


const NewEvent = () => {

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const response = await axios.post(
        'http://localhost:8000/api/v1/events/',
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          }
        }
      );

      setSuccessMessage('Event created successfully!');
      setToast(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);
    } catch (err) {
      console.error('Event creation error:', err);
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError('Failed to create event. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClose = (
  ) => {
    setLoading(false);
    setToast(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div className="flex justify-center items-center p-16">
      <div className="p-8 bg-white rounded-lg shadow-md w-[500px]">
        <h2 className="text-2xl font-bold mb-6 text-center">New Event Registration</h2>
        {/* {successMessage && !error && (
          <Alert severity="success" className="mb-4">
            {successMessage}
          </Alert>
        )}
        {error && (
          <Alert severity="error" className="mb-4">
            {error}
          </Alert>
        )} */}
        <EventRegistrationForm
          onSubmit={handleSubmit}
          loading={loading}
        />
      </div>

      <Snackbar
        open={loading}
        autoHideDuration={3000}
        onClose={handleClose}
        message="Creating Event..."
        action={action}
      />
      <Snackbar
        open={toast}
        autoHideDuration={3000}
        onClose={handleClose}
        message={successMessage +" Redirecting to Dashboard..."}
        action={action}
      />
      <Snackbar
        open={error !== ''}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default NewEvent