import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EventCard from '../components/cards/EventCard';
import NavBar from '../components/bars/NavBar';
import SearchBar from '../components/bars/SearchBar';
import { Pagination } from '@mui/material';
import axios from 'axios';
const Home = () => {
  const [nameSearchTerm, setNameSearchTerm] = useState('');
  const [dateSearchTerm, setDateSearchTerm] = useState(null);
  const [locationSearchTerm, setLocationSearchTerm] = useState('');
  const [events, setEvents] = useState([]); // Initialize events as an empty array
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const eventsPerPage = 8;


  const getAuthToken = () => localStorage.getItem('accessToken');
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = getAuthToken();
        const response = await axios.get("http://localhost:8000/api/v1/events/", {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        if (Array.isArray(response.data.events)) {
          setEvents(response.data.events); // Validate the response data type
        } else {
          throw new Error('Response data is not an array');
        }
      } catch (error) {
        setError(error);
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  const handleNameSearch = (event) => {
    setNameSearchTerm(event.target.value);
  };

  const handleDateSearch = (date) => {
    setDateSearchTerm(date);
  };

  const handleLocationSearch = (event) => {
    setLocationSearchTerm(event.target.value);
  };

  const filteredEvents = Array.isArray(events) ? events.filter(e => {
    const eventDate = new Date(e.date).toISOString().slice(0, 10);
    const searchDate = dateSearchTerm ? new Date(dateSearchTerm.getTime() - (dateSearchTerm.getTimezoneOffset() * 60000)).toISOString().slice(0, 10) : null;
    
    return (
      e.title.toLowerCase().includes(nameSearchTerm.toLowerCase()) &&
      (!dateSearchTerm || eventDate === searchDate) &&
      e.location.toLowerCase().includes(locationSearchTerm.toLowerCase())
    );
  }) : [];

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);
  const handlePageChange = (event, value) => setCurrentPage(value);
  if (error) {
    return <div>Error fetching events: {error.message}</div>;
  }
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-start', gap: '10px', padding: '0 20px', marginBottom: '20px' }}>
        <SearchBar label="Search Name" searchTerm={nameSearchTerm} onSearch={handleNameSearch} type="text" />
        <SearchBar label="Search Date" searchTerm={dateSearchTerm} onSearch={handleDateSearch} type="date" />
        <SearchBar label="Search Location" searchTerm={locationSearchTerm} onSearch={handleLocationSearch} type="text" />
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 pl-5 pr-5'>
        {currentEvents.map((event) => (
          event.available_seats > 0 ? (
            <Link key={event.id} to={`/events/${event.id}`}>
              <EventCard
                eventId={event.id}
                eventTitle={event.title}
                eventLocation={event.location}
                eventDate={event.date}
                eventType={event.event_type}
                isSoldOut={false}
              />
            </Link>
          ) : (
            <Link key={event.id} to={`/events/${event.id}`}>
            <EventCard
              key={event.id}
              eventId={event.id}
              eventTitle={event.title}
              eventLocation={event.location}
              eventDate={event.date}
              eventType={event.event_type}
              isSoldOut={true}
            />
            </Link>
          )
        ))}
      </div>
      <Pagination
        count={Math.ceil(filteredEvents.length / eventsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
      />
    </div>
  );
}
export default Home;