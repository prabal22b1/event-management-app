import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button, CardMedia } from '@mui/material';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import { useParams } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';



function EventDetailCard({ title, description, date, time, location, available_seats, event_type }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [toast, setToast] = useState(false);
    const [isRegistered, setRegistrationStatus] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const user_role = localStorage.getItem("user_role")

    if (user_role === 'Attendee') {
        useEffect(() => {
            const fetchRegistrationStatus = async () => {
                try {
                    const token = localStorage.getItem('accessToken');
                    const response = await axios.get(`http://localhost:8000/api/v1/events/${id}/check-registration/`, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-type': 'application/json'
                        }
                    });
                    setRegistrationStatus(response.data.registered);
                } catch (err) {
                }
            };
            fetchRegistrationStatus();
        }, [id]);
    }

    const handleClose = () => {
        setError(null);
        navigate('/home');
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
    const handleRegister = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            const response = await axios.post(`http://localhost:8000/api/v1/events/${id}/register/`, null, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-type': 'application/json'
                }
            });
            setRegistrationSuccess(true);
            setRegistrationStatus(true);
            setSuccessMessage('Registered successfully! Redirecting to home page!');
            setToast(true);
        } catch (err) {
            setError("You are already registered!");
            console.error("Error registering for event:", err);
        }
    };
    const handleRegistrationCancellation = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            const response = await axios.put(`http://localhost:8000/api/v1/events/${id}/register/`, null, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-type': 'application/json'
                }
            });
            setRegistrationStatus(false);
            setSuccessMessage('Registration successfully cancelled! Redirecting to home page!');
            setToast(true);
        } catch (err) {
            setError("Error cancelling registration!");
            console.error("Error cancelling registration for event:", err);
        }
    };

    const handleEditEvent = () => {
        navigate(`/dashboard/edit-event/${id}`);
    }

    const eventDateFormatted = new Date(date).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
    const imageMap = {
        concert: '/concert.jpg',
        webinar: '/webinar.jpg',
        conference: '/conference.jpg',
        workshop: '/workshop.jpg'
    };
    const image = imageMap[(event_type || '').toLowerCase()] || 'default.jpg';
    return (
        <div className='relative w-fit'>
            <Card style={{ margin: '20px', padding: '20px', width: '500px' }}>
                {registrationSuccess && (
                    <Alert severity="success" className="mb-4">
                        Registration successful!
                    </Alert>
                )}
                {error && (
                    <Alert severity="error" className="mb-4">
                        {error}
                    </Alert>
                )}
                <CardContent>
                    <div>
                        <CardMedia
                            component="img"
                            image={image}
                            alt={`${event_type} image`}
                            sx={{ height: '200px', width: '100%', objectFit: 'cover' }}
                        />
                        <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', bottom: '25px' }}>
                            <span className="text-white font-semibold bg-gray-500 bg-opacity-50 px-2 py-1 rounded text-xs">{event_type}</span>
                            <span className="text-white bg-gray-500 bg-opacity-50 px-2 py-1 rounded text-xs">
                                {eventDateFormatted}
                            </span>
                        </div>
                    </div>
                    <Typography variant="h4" gutterBottom style={{ fontWeight: 'bold', fontSize: '2rem', marginBottom: '16px', fontFamily: 'Arial, sans-serif' }}>
                        {title}
                    </Typography>
                    <Typography variant="h6" gutterBottom style={{ marginBottom: '8px', fontFamily: 'Arial, sans-serif' }}>
                        {description}
                    </Typography>
                    <Typography variant="h6" color="textSecondary" gutterBottom style={{ marginBottom: '8px', fontFamily: 'Arial, sans-serif' }}>
                        Date: {eventDateFormatted}
                    </Typography>
                    <Typography variant="h6" color="textSecondary" gutterBottom style={{ marginBottom: '8px', fontFamily: 'Arial, sans-serif' }}>
                        Time: {time}
                    </Typography>
                    <Typography variant="h6" color="textSecondary" gutterBottom style={{ marginBottom: '8px', fontFamily: 'Arial, sans-serif' }}>
                        Location: {location}
                    </Typography>
                    <Typography variant="h6" color="textSecondary" gutterBottom style={{ marginBottom: '8px', fontFamily: 'Arial, sans-serif' }}>
                        Available Seats: {available_seats}
                    </Typography>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        {user_role === 'Organizer' ? (<Button
                            variant="contained"
                            color="primary"
                            width='30px'
                            onClick={handleEditEvent}
                            style={{ marginTop: '20px' }}
                        >
                            Edit event details
                        </Button>
                        ) : (
                            isRegistered ? (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    width='30px'
                                    onClick={handleRegistrationCancellation}
                                    style={{ marginTop: '20px' }}
                                >
                                    Cancel Registration
                                </Button>
                            ) : (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    width='30px'
                                    onClick={handleRegister}
                                    style={{ marginTop: '20px' }}
                                >
                                    Register
                                </Button>
                            )
                        )}
                        <Snackbar
                            open={toast}
                            autoHideDuration={3000}
                            onClose={handleClose}
                            message={successMessage}
                            action={action}
                        />
                        <Snackbar
                            open={!!error}
                            autoHideDuration={3000}
                            onClose={handleClose}
                            message={error}
                            action={action}
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
export default EventDetailCard;