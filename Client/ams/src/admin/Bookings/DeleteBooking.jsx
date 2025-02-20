import { useState, useEffect } from 'react';
import { getBookings, deleteBooking } from '../../api/bookingsApi'; // Keep path relevant for bookings
import styles from '../styles/Bookings/Delete.module.scss'; // Change folder to 'Bookings' and operation to 'Delete'

const DeleteBooking = () => {
  const [bookingId, setBookingId] = useState('');
  const [bookings, setBookings] = useState([]);

  // Fetch all bookings initially to have a mapping between bookingId and id
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await getBookings(); // Fetch bookings from API
        setBookings(response); // Store bookings in the state
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };
    fetchBookings();
  }, []);

  const handleDelete = async () => {
    console.log('Deleting booking with bookingId:', bookingId);
    
    // Find the booking by bookingId
    const bookingToDelete = bookings.find((booking) => booking.booking_id === parseInt(bookingId));

    if (!bookingToDelete) {
      console.error('Booking not found');
      return;
    }

    try {
      // Delete using the unique `id` field, mapped from the `booking_id`
      await deleteBooking(bookingId);
      console.log('Booking deleted:', bookingToDelete);
      setBookingId(''); // Reset input after deletion

      // Optionally, remove the deleted booking from the state
      setBookings(bookings.filter((booking) => booking.id !== bookingToDelete.id));
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  };

  return (
    <div className={styles.container}>
      <label className={styles.label}>Booking ID:</label>
      <input 
        type="text" 
        value={bookingId} 
        onChange={(e) => setBookingId(e.target.value)} 
        placeholder="Enter Booking ID" 
        className={styles.input}
      />
      <button onClick={handleDelete} className={styles.button}>Delete Booking</button>
    </div>
  );
};

export default DeleteBooking;
