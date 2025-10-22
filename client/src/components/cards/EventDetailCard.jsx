import React from 'react';
import { Card, CardContent, Typography, Button, Grid, CardMedia } from '@mui/material';
import { useParams } from 'react-router-dom';

function EventDetailCard({ title, description, date, time, location, available_seats, event_type }) {
   

    

    const handleRegister = () => {
        alert('Registration successful!');
        // Add registration logic here
    };

    const eventDateFormatted = new Date(date).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short'
    });
    const imageMap = {
        Concert: 'concert.jpg',
        Webinar: 'webinar.jpg',
        Conference: 'conference.jpg',
        Workshop: 'workshop.jpg'
    };

    const image = imageMap[event_type];

    

    return (
        <div className='relative w-fit'>
            <Card style={{ margin: '20px', padding: '20px' }}>
                <CardContent>
                    <div>
                        <CardMedia
                            component="img"
                            image={image}
                            alt={`${event_type} image`}
                            sx={{ height: 194, width: '100%', objectFit: 'cover' }}
                        />
                        <span className="relative bottom-1 left-1 text-white font-semibold bg-gray-500 bg-opacity-50 px-2 py-1 rounded text-xs">{event_type}</span>
                        <span className="relative bottom-1 right-1 text-white bg-gray-500 bg-opacity-50 px-2 py-1 rounded text-xs">
                            {eventDateFormatted}
                        </span>
                    </div>
                    <Typography variant="h4" gutterBottom>
                        {title}
                    </Typography>

                    <Typography variant="body1" gutterBottom>
                        {description}
                    </Typography>
                    <br></br>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                        Date: {eventDateFormatted}
                    </Typography>
                    <br></br>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                        Time: {time}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                        Location: {location}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                        Available Seats: {available_seats}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                        Type: {event_type}
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
        </div >
    );
}

export default EventDetailCard