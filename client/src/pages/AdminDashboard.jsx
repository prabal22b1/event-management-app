import React, { useState, useEffect } from "react";
import UsersTable from "../components/tables/UsersTable";
import EventsTable from "../components/tables/EventsTable";
import axios from "axios";
import {
  Tabs,
  Tab,
  Box,
  Typography,
  Grid,
  CircularProgress,
  Alert,
  Card,
  CardContent,
} from "@mui/material";
const AdminDashboard = () => {
  const [stats, setStats] = useState({
    total_users: 0,
    total_events: 0,
    total_registrations: 0,
  });
const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);
  const token = localStorage.getItem("accessToken");
useEffect(() => {
    fetchAllData();
  }, []);
const fetchAllData = async () => {
    setLoading(true);
    setError(null);
    try {
      await Promise.all([fetchStats(), fetchUsers(), fetchEvents()]);
    } catch (err) {
      setError("Failed to load dashboard data");
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };
const fetchStats = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/events/admin/stats/",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };
const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/users/getRegisteredUsers/",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers(response.data.users || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
const fetchEvents = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/events/admin/events/",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEvents(response.data.events || []);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };
const handleChangeTab = (event, newIndex) => {
    setTabIndex(newIndex);
  };
if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}
      >
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
      <div className="min-h-screen">
        <br />
      <div style={{ padding: "20px" }}>

      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: "bold", color: "#333", marginBottom: 3 }}>
        Admin Dashboard
      </Typography>
      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ marginBottom: 4 }}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ backgroundColor: "#ffffff", boxShadow: 3, borderRadius: 2, padding: 2 }}>
            <CardContent>
              <Typography variant="h6" color="text.secondary" gutterBottom sx={{ fontWeight: "bold" }}>
                Total Users
              </Typography>
              <Typography variant="h3" component="div" sx={{ color: "#0e6edcff" }}>
                {stats.total_users}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ backgroundColor: "#ffffff", boxShadow: 3, borderRadius: 2, padding: 2 }}>
            <CardContent>
              <Typography variant="h6" color="text.secondary" gutterBottom sx={{ fontWeight: "bold" }}>
                Total Events
              </Typography>
              <Typography variant="h3" component="div" sx={{ color: "#0e6edcff" }}>
                {stats.total_events}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ backgroundColor: "#ffffff", boxShadow: 3, borderRadius: 2, padding: 2 }}>
            <CardContent>
              <Typography variant="h6" color="text.secondary" gutterBottom sx={{ fontWeight: "bold" }}>
                Total Registrations
              </Typography>
              <Typography variant="h3" component="div" sx={{ color: "#0e6edcff" }}>
                {stats.total_registrations}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
{/* Tabs */}       <Box sx={{ borderBottom: 1, borderColor: 'divider', backgroundColor: "#ffffff", borderRadius: '4px', boxShadow: 2 }}>
        <Tabs value={tabIndex} onChange={handleChangeTab} aria-label="Admin Dashboard Tabs" indicatorColor="primary" textColor="primary">
          <Tab label="Users" sx={{ fontWeight: "bold" }} />
          <Tab label="Events" sx={{ fontWeight: "bold" }} />
        </Tabs>
      </Box>
      {/* Tab content */}
      <Box sx={{ padding: 3, backgroundColor: "#ffffff", boxShadow: 2, borderRadius: 2 }}>
        {tabIndex === 0 && <UsersTable users={users} />}
        {tabIndex === 1 && <EventsTable events={events} />}
      </Box>
      </div>
    </div>
  );
};
export default AdminDashboard;