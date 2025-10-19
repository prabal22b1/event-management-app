import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';

export default function EventCard( {eventId, eventDate, eventTitle, eventLocation, eventType, isSoldOut }) {
  // format date to show only day and month
  const eventDateFormatted = new Date(eventDate).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short'
  });

  const imageMap = {
    concert: 'concert.jpg',
    webinar: 'webinar.jpg',
    conference: 'conference.jpg',
    workshop: 'workshop.jpg'
  };

  const image = imageMap[(eventType || '').toLowerCase()] || 'default.jpg';

  return (
    <Card id={eventId} sx={{ maxWidth: 340 }}>
      <div className='relative w-fit'>
        <CardMedia
          component="img"
          image={image}
          alt={`${eventType} image`}
          className={`block ${isSoldOut ? 'filter grayscale opacity-50' : ''}`}
          sx={{ height: 194, width: '100%', objectFit: 'cover' }}
        />
        <span className="absolute bottom-1 left-1 text-white font-semibold bg-gray-500 bg-opacity-50 px-2 py-1 rounded text-xs">{eventType}</span>
        <span className="absolute bottom-1 right-1 text-white bg-gray-500 bg-opacity-50 px-2 py-1 rounded text-xs">
          {eventDateFormatted}
        </span>
        {isSoldOut ? (
          <span className="absolute top-1 right-1 text-red-500 bg-gray-500 bg-opacity-50 font-semibold px-1 py-1 rounded text-xs">
            Sold Out!
          </span>
        ) : null}
      </div>

      <div className='p-2 flex-col items-center'>
        <h3 className="text-black font-bold">{eventTitle}</h3>
        <p className="text-gray-500 text-xs">{eventLocation}</p>
      </div>
    </Card>
  );
}