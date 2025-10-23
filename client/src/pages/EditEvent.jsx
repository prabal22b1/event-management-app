import React from 'react'
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import EventRegistrationForm from '../components/forms/EventRegistrationForm';
import { Snackbar, IconButton, Alert } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const EditEvent = () => {
    const { id } = useParams();
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState(false);
    const [eventData, setEventData] = useState(null);
    const navigate = useNavigate();

    const token = localStorage.getItem('accessToken');

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const token = localStorage.getItem('accessToken'); // Retrieve token if needed
                const response = await axios.get(`http://localhost:8000/api/v1/events/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-type': 'application/json'
                    }
                });
                setEventData(response.data);
            } catch (err) {
                setError(err);
                console.error("Error fetching event details:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchEvent();
    }, [id]);

    const handleSubmit = async (data) => {
        setLoading(true);
        setError('');
        setSuccessMessage('');

        try {
            const response = await axios.put(
                `http://localhost:8000/api/v1/events/${id}/`,
                data,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            setSuccessMessage('Event updated successfully!');
            setToast(true);
            setTimeout(() => {
                navigate('/dashboard');
            }, 3000);
        } catch (err) {
            console.error('Event updation error:', err);
            if (err.response?.data?.error) {
                setError(err.response.data.error);
            } else {
                setError('Failed to updated event. Please try again.');
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
                <h2 className="text-2xl font-bold mb-6 text-center">Edit Event Registration</h2>
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
                {eventData ? (
                    <EventRegistrationForm
                        onSubmit={handleSubmit}
                        loading={loading}
                        {...eventData}
                    />
                ) : (
                    <div className="text-center">Loading event details...</div>
                )}
            </div>

            <Snackbar
                open={loading}
                autoHideDuration={3000}
                onClose={handleClose}
                message="Updating Event..."
                action={action}
            />
            <Snackbar
                open={toast}
                autoHideDuration={3000}
                onClose={handleClose}
                message={successMessage + " Redirecting to Dashboard..."}
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

export default EditEvent