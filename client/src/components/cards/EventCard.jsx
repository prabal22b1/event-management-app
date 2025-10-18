import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';

export default function EventCard( {eventId, eventDate, eventTitle, eventLocation, eventType, isSoldOut }) {
  // format date to show only day and month
  const eventDateFormatted = new Date(eventDate).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short'
  });

  return (
    <Card id={eventId} sx={{ maxWidth: 340 }}>
      <div className='relative w-fit'>
        <CardMedia
          component="img"
          height="194"
          image="concert.jpg"
          alt="concert image"
          className={`block ${isSoldOut ? 'filter grayscale opacity-50' : ''}`} // apply grayscale and opacity if sold out
        />
        <span className="absolute bottom-1 right-1 text-white bg-gray-500 bg-opacity-50 px-2 py-1 rounded text-xs">
          {eventDateFormatted}
        </span>
        {isSoldOut ? (
          // Show Sold Out badge if the event is sold out
          <span className="absolute top-1 right-1 text-gray-800 bg-gray-400 font-semibold px-1 py-1 rounded text-sm">
            Sold Out
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