import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Chip,
  CircularProgress,
  Alert,
  Box
} from "@mui/material";
import EventRegistrationsModal from "../components/EventRegistrationsModal";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    total_users: 0,
    total_events: 0,
    total_registrations: 0
  });
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      await Promise.all([
        fetchStats(),
        fetchUsers(),
        fetchEvents()
      ]);
    } catch (err) {
      setError("Failed to load dashboard data");
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/v1/events/admin/stats/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/v1/users/getRegisteredUsers/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      setUsers(response.data.users || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/v1/events/admin/events/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      setEvents(response.data.events || []);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleRegistrationClick = (event) => {
    setSelectedEvent(event);
    setModalOpen(true);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "20px" }}>
        <Alert severity="error">{error}</Alert>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", backgroundColor: "#f1deda", minHeight: "100vh" }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ color: "#333", marginBottom: 3 }}>
        Admin Dashboard
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ marginBottom: 4 }}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ backgroundColor: "#fff", boxShadow: 2 }}>
            <CardContent>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Total Users
              </Typography>
              <Typography variant="h3" component="div" sx={{ color: "#e91e63" }}>
                {stats.total_users}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ backgroundColor: "#fff", boxShadow: 2 }}>
            <CardContent>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Total Events
              </Typography>
              <Typography variant="h3" component="div" sx={{ color: "#e91e63" }}>
                {stats.total_events}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ backgroundColor: "#fff", boxShadow: 2 }}>
            <CardContent>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Total Registrations
              </Typography>
              <Typography variant="h3" component="div" sx={{ color: "#e91e63" }}>
                {stats.total_registrations}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* User Management Section */}
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom sx={{ color: "#333", marginBottom: 2 }}>
          User Management
        </Typography>
        <TableContainer component={Paper} sx={{ backgroundColor: "#fff" }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Username</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Role</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} hover>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Chip 
                      label={user.role} 
                      color={user.role === 'Admin' ? 'error' : user.role === 'Organizer' ? 'primary' : 'default'}
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Event Management Section */}
      <Box>
        <Typography variant="h5" component="h2" gutterBottom sx={{ color: "#333", marginBottom: 2 }}>
          Event Management
        </Typography>
        <TableContainer component={Paper} sx={{ backgroundColor: "#fff" }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell sx={{ fontWeight: "bold" }}>Event Title</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Location</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Type</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Organizer</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Registrations</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {events.map((event) => (
                <TableRow key={event.id} hover>
                  <TableCell>{event.title}</TableCell>
                  <TableCell>{formatDate(event.date)}</TableCell>
                  <TableCell>{event.location}</TableCell>
                  <TableCell>
                    <Chip 
                      label={event.event_type} 
                      color="secondary" 
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{event.organizer_name}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleRegistrationClick(event)}
                      sx={{
                        backgroundColor: "#e91e63",
                        '&:hover': {
                          backgroundColor: "#c2185b"
                        }
                      }}
                    >
                      {event.registration_count}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Event Registrations Modal */}
      <EventRegistrationsModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        eventId={selectedEvent?.id}
        eventTitle={selectedEvent?.title}
      />
    </div>
  );
};

export default AdminDashboard;

