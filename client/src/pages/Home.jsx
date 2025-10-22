// Home.jsx

import { Link } from 'react-router-dom';
import EventCard from '../components/cards/EventCard'
import NavBar from '../components/bars/NavBar';
import SearchBar from '../components/bars/SearchBar';
import { useState } from 'react';




const Home = () => {
  const events = [
    // hard coded list of events
    {
      id: 1,
      title: 'Sunset Indie Concert',
      location: 'Harborfront Pavilion',
      date: '2025-07-18',
      type: 'Concert',
      seatsLeft: 42
    },
    {
      id: 2,
      title: 'Laughs & Lager',
      location: 'The Back Alley Comedy Club',
      date: '2025-08-02',
      type: 'Concert',
      seatsLeft: 12
    },
    {
      id: 3,
      title: 'Modern Perspectives: Art Show',
      location: 'Northside Gallery',
      date: '2025-09-12',
      type: 'Conference',
      seatsLeft: 5
    },
    {
      id: 4,
      title: 'Sunday Jazz Brunch',
      location: 'Olive Tree Cafe',
      date: '2025-07-27',
      type: 'Concert',
      seatsLeft: 30
    },
    {
      id: 5,
      title: 'Open Mic Night',
      location: 'Downtown Coffee House',
      date: '2025-08-15',
      type: 'Concert',
      seatsLeft: 0
    },
    {
      id: 6,
      title: 'Community Theater: Hamlet',
      location: 'Riverside Playhouse',
      date: '2025-10-03',
      type: 'Conference',
      seatsLeft: 20
    },
    {
      id: 7,
      title: 'Street Arts Festival',
      location: 'Market Square',
      date: '2025-09-20',
      type: 'Workshop',
      seatsLeft: 100
    },
    {
      id: 8,
      title: 'Creative Coding Workshop',
      location: 'Tech Hub Studio',
      date: '2025-08-29',
      type: 'Webinar',
      seatsLeft: 8
    }
  ];

  const [nameSearchTerm, setNameSearchTerm] = useState('');
  const [dateSearchTerm, setDateSearchTerm] = useState(null);
  const [locationSearchTerm, setLocationSearchTerm] = useState('');
  const [eventList, setEvents] = useState(events);

  const handleNameSearch = (event) => {
    setNameSearchTerm(event.target.value);
  };

  const handleDateSearch = (date) => {
    setDateSearchTerm(date);
  };

  const handleLocationSearch = (event) => {
    setLocationSearchTerm(event.target.value);
  };

  const filteredEvents = events.filter(e => {
    const eventDate = new Date(e.date).toISOString().slice(0, 10);
    const searchDate = dateSearchTerm ? new Date(dateSearchTerm.getTime() - (dateSearchTerm.getTimezoneOffset() * 60000)).toISOString().slice(0, 10) : null;
    return (
      e.title.toLowerCase().includes(nameSearchTerm.toLowerCase()) &&
      (!dateSearchTerm || eventDate === searchDate) &&
      e.location.toLowerCase().includes(locationSearchTerm.toLowerCase())
    );
  });



  return (
    <div>
      <div style={{ paddingBottom: '20px' }}>
        <NavBar />
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-start', gap: '10px', padding: '0 20px', marginBottom: '20px' }}>
        <SearchBar label="Search Name" searchTerm={nameSearchTerm} onSearch={handleNameSearch} type="text" />
        <SearchBar label="Search Date" searchTerm={dateSearchTerm} onSearch={handleDateSearch} type="date" />
        <SearchBar label="Search Location" searchTerm={locationSearchTerm} onSearch={handleLocationSearch} type="text" />
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 pl-5'>
        {filteredEvents.map((event, index) => // mapping through events list
          event.seatsLeft > 0 ? (
            // Link to event details page if it's not sold out
            <Link key={index} to={`/events/${index}`}>
              <EventCard
                key={index}
                eventId={index}
                eventTitle={event.title}
                eventLocation={event.location}
                eventDate={event.date}
                eventType={event.type}
                isSoldOut={false}
              />
            </Link>
          ) : (
            // Show EventCard without link if sold out
            <EventCard
              key={index}
              eventId={index}
              eventTitle={event.title}
              eventLocation={event.location}
              eventDate={event.date}
              eventType={event.type}
              isSoldOut={true}
            />
          )
        )}
      </div>
    </div>
  )
}

export default Home;