// Dashboard.jsx
import { useState, useEffect } from 'react';
import EventCard from '../components/cards/EventCard';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { Button } from '@mui/material';
import { Pagination } from '@mui/material';

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 8;

  const navigate = useNavigate();

  const userRole = localStorage.getItem('user_role');
  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        let endpoint = '';

        if (userRole === 'Organizer') {
          endpoint = 'http://localhost:8000/api/v1/events/organizer/';
        } else if (userRole === 'Attendee') {
          endpoint = `http://localhost:8000//api/v1/events/registrations/user/`;
        } else {
          setError('Unauthorized access');
          navigate('/unauthorized');
          setLoading(false);
          return;
        }

        const response = await axios.get(`${endpoint}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        setEvents(response.data.events);
      } catch (err) {
        setError(err, message || 'Failed to fetch events');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const getPageHeader = () => {
    return userRole === 'Organizer' ? 'Event Manager' : 'My Registrations';
  }

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div className='error'>Error: {error}</div>;
  }

  if (error) {
    return <div>Error fetching events: {error.message}</div>;
  }

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);
  const handlePageChange = (value) => setCurrentPage(value);

  return (
    <div>
      <div className="grid grid-cols-3 items-center px-5 mt-6 mb-6">
        <div></div> {/* Left spacer */}

        <h2 className="text-2xl font-bold text-center">
          {getPageHeader()}
        </h2>

        <div className="flex justify-end">
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              navigate(userRole === 'Organizer' ? '/dashboard/new-event' : '/home')
            }
          >
            {userRole === 'Organizer' ? 'Create New Event' : 'Browse Events'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 pl-5 pr-5">
        {currentEvents.length === 0 ? (
          <p>No {userRole === 'Attendee' ? 'Registrations' : 'Events'} found.</p>
        ) : (
          currentEvents.map((event) => {
            return userRole === 'Attendee' ? (
              <Link key={event.id} to={`/events/${event.id}`}>
                <EventCard
                  eventId={event.id}
                  eventDate={event.date}
                  eventTitle={event.title}
                  eventLocation={event.location}
                  eventType={event.event_type}
                  isSoldOut={event.available_seats === 0}
                />
              </Link>
            ) : (
              <Link key={event.id} to={`/events/${event.id}`}>
                <EventCard
                  eventId={event.id}
                  eventDate={event.date}
                  eventTitle={event.title}
                  eventLocation={event.location}
                  eventType={event.event_type}
                  isSoldOut={event.available_seats === 0}
                />
              </Link>
            );
          })
        )}
      </div>
      <Pagination
        count={Math.ceil(currentEvents.length / eventsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
      />
    </div>
  )
}

export default Dashboard