import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Alert
} from '@mui/material';
import axios from 'axios';

const EventRegistrationsModal = ({ open, onClose, eventId, eventTitle }) => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (open && eventId) {
      fetchRegistrations();
    }
  }, [open, eventId]);

  const fetchRegistrations = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get(
        `http://localhost:8000/api/v1/events/admin/events/${eventId}/registrations/`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      setRegistrations(response.data.registrations || []);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch registrations');
      console.error('Error fetching registrations:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: '#f1deda',
          borderRadius: 2
        }
      }}
    >
      <DialogTitle sx={{ backgroundColor: '#f1deda', color: '#333' }}>
        <Typography variant="h6" component="div">
          Registrations for: {eventTitle}
        </Typography>
      </DialogTitle>
      
      <DialogContent sx={{ backgroundColor: '#f1deda' }}>
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
            <CircularProgress />
          </div>
        )}
        
        {error && (
          <Alert severity="error" sx={{ marginBottom: 2 }}>
            {error}
          </Alert>
        )}
        
        {!loading && !error && (
          <>
            {registrations.length === 0 ? (
              <Typography variant="body1" color="text.secondary" align="center" sx={{ padding: 2 }}>
                No registrations found for this event.
              </Typography>
            ) : (
              <TableContainer component={Paper} sx={{ marginTop: 1 }}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                      <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Username</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Registered On</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {registrations.map((registration, index) => (
                      <TableRow key={index} hover>
                        <TableCell>{registration.user_name}</TableCell>
                        <TableCell>{registration.user_email}</TableCell>
                        <TableCell>{registration.user_username}</TableCell>
                        <TableCell>
                          <span 
                            style={{
                              padding: '4px 8px',
                              borderRadius: '4px',
                              backgroundColor: registration.registration_status === 'Confirmed' ? '#4caf50' : '#f44336',
                              color: 'white',
                              fontSize: '12px',
                              fontWeight: 'bold'
                            }}
                          >
                            {registration.registration_status}
                          </span>
                        </TableCell>
                        <TableCell>{formatDate(registration.registered_on)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </>
        )}
      </DialogContent>
      
      <DialogActions sx={{ backgroundColor: '#f1deda', padding: 2 }}>
        <Button 
          onClick={onClose} 
          variant="contained" 
          color="primary"
          sx={{ 
            backgroundColor: '#e91e63',
            '&:hover': {
              backgroundColor: '#c2185b'
            }
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EventRegistrationsModal;

