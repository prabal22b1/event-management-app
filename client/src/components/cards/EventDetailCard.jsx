import React from 'react';
import { Card, CardContent, Typography, Button, CardMedia } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';

function EventDetailCard({ title, description, date, time, location, available_seats, event_type }) {
    
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const handleRegister = async () => {
        try {
            const token = localStorage.getItem('accessToken'); // Retrieve token if needed
            const response = await axios.post(`http://localhost:8000/api/v1/events/${id}/register`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-type': 'application/json'
                }
            })
            alert('Registration successful!');
            setRegistrationSuccess(true);
        } catch (err) {
            setError(err);
            console.error("Error fetching event details:", err);
        }

    };
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
                    <Alert severity="success" style={{ backgroundColor: 'green', color: 'white', marginBottom: '20px' }}>
                        Registration successful!
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
                    {/* Title with a larger, bold font */}
                    <Typography variant="h4" gutterBottom style={{ fontWeight: 'bold', fontSize: '2rem', marginBottom: '16px', fontFamily: 'Arial, sans-serif' }}>
                        {title}
                    </Typography>
                    {/* Description with increased font size */}                     <Typography variant="h6" gutterBottom style={{ marginBottom: '8px', fontFamily: 'Arial, sans-serif' }}>
                        {description}
                    </Typography>
                    {/* Details with consistent styling */}
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
                        <Button
                            variant="contained"
                            color="primary"
                            width='30px'
                            onClick={handleRegister}
                            style={{ marginTop: '20px' }}
                        >
                            Register
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
export default EventDetailCard;