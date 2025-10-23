import React from "react";
import EventDetailCard from "../components/cards/EventDetailCard";
import { Grid, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';



function EventDetails() {
  const { id } = useParams(); // Extract the `id` parameter from URL
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;


  return (
    <div>
      <Grid container spacing={2} justifyContent="center" alignContent='center'>
        <Grid>
          <EventDetailCard {...eventData} />
        </Grid>
      </Grid>
    </div>
  );
}


export default EventDetails;