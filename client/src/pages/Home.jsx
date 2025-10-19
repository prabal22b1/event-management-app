// Home.jsx

import { Link } from 'react-router-dom';
import EventCard from '../components/cards/EventCard'

const events = [
  // hard coded list of events
  {
    id: 1,
    title: 'Sunset Indie Concert',
    location: 'Harborfront Pavilion',
    date: '2025-07-18',
    type: 'concert',
    seatsLeft: 42
  },
  {
    id: 2,
    title: 'Laughs & Lager',
    location: 'The Back Alley Comedy Club',
    date: '2025-08-02',
    type: 'stand up comedy',
    seatsLeft: 12
  },
  {
    id: 3,
    title: 'Modern Perspectives: Art Show',
    location: 'Northside Gallery',
    date: '2025-09-12',
    type: 'art show',
    seatsLeft: 5
  },
  {
    id: 4,
    title: 'Sunday Jazz Brunch',
    location: 'Olive Tree Cafe',
    date: '2025-07-27',
    type: 'concert',
    seatsLeft: 30
  },
  {
    id: 5,
    title: 'Open Mic Night',
    location: 'Downtown Coffee House',
    date: '2025-08-15',
    type: 'stand up comedy',
    seatsLeft: 0
  },
  {
    id: 6,
    title: 'Community Theater: Hamlet',
    location: 'Riverside Playhouse',
    date: '2025-10-03',
    type: 'theater',
    seatsLeft: 20
  },
  {
    id: 7,
    title: 'Street Arts Festival',
    location: 'Market Square',
    date: '2025-09-20',
    type: 'festival',
    seatsLeft: 100
  },
  {
    id: 8,
    title: 'Creative Coding Workshop',
    location: 'Tech Hub Studio',
    date: '2025-08-29',
    type: 'workshop',
    seatsLeft: 8
  }
];


const Home = () => {
  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'>
      {events.map((event) => // mapping through events list
        event.seatsLeft > 0 ? (
          // Link to event details page if it's not sold out
          <Link key={event.id} to={`/events/${event.id}`}> 
              <EventCard
                key={event.id}
                eventId={event.id}
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
            key={event.id}
            eventId={event.id}
            eventTitle={event.title}
            eventLocation={event.location}
            eventDate={event.date}
            eventType={event.type}
            isSoldOut={true}
          />
        )
      )}
    </div>
  )
}

export default Home;