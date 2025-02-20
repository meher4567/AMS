import { useState, useEffect } from 'react';
import { updateBooking, getBookings } from '../../api/bookingsApi'; // Path for bookings API
import styles from '../styles/Bookings/Update.module.scss'; // Import the specific SCSS for Update

const UpdateBooking = () => {
  const [bookingId, setBookingId] = useState('');
  const [formData, setFormData] = useState({
    passenger_id: '',
    flight_id: '',
    payment_id: '',
    booking_date: '',
    seat_number: '',
    booking_status: ''
  });
  const [bookings, setBookings] = useState([]); // Store bookings to map booking_id to id

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await getBookings();
        setBookings(response);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };
    fetchBookings();
  }, []);

  useEffect(() => {
    if (bookingId) {
      const bookingToUpdate = bookings.find(b => b.booking_id === parseInt(bookingId));

      if (bookingToUpdate) {
        setFormData(bookingToUpdate); // Populate form with booking details
      } else {
        console.error('Booking not found');
      }
    }
  }, [bookingId, bookings]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Updating booking:', formData);

    const bookingToUpdate = bookings.find(b => b.booking_id === parseInt(bookingId));

    if (!bookingToUpdate) {
      console.error('Booking not found');
      return;
    }

    try {
      const response = await updateBooking(bookingId, formData);
      console.log('Booking updated:', response);
    } catch (error) {
      console.error('Error updating booking:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label className={styles.label}>Booking ID:</label>
      <input
        type="text"
        value={bookingId}
        onChange={(e) => setBookingId(e.target.value)}
        placeholder="Enter Booking ID"
        className={styles.input}
      />
      <label className={styles.label}>Passenger ID:</label>
      <input
        type="text"
        name="passenger_id"
        value={formData.passenger_id}
        onChange={handleChange}
        className={styles.input}
      />
      <label className={styles.label}>Flight ID:</label>
      <input
        type="text"
        name="flight_id"
        value={formData.flight_id}
        onChange={handleChange}
        className={styles.input}
      />
      <label className={styles.label}>Payment ID:</label>
      <input
        type="text"
        name="payment_id"
        value={formData.payment_id}
        onChange={handleChange}
        className={styles.input}
      />
      <label className={styles.label}>Booking Date:</label>
      <input
        type="datetime-local"
        name="booking_date"
        value={formData.booking_date}
        onChange={handleChange}
        className={styles.input}
      />
      <label className={styles.label}>Seat Number:</label>
      <input
        type="text"
        name="seat_number"
        value={formData.seat_number}
        onChange={handleChange}
        className={styles.input}
      />
      <label className={styles.label}>Booking Status:</label>
      <input
        type="text"
        name="booking_status"
        value={formData.booking_status}
        onChange={handleChange}
        className={styles.input}
      />
      <button type="submit" className={styles.button}>Update Booking</button>
    </form>
  );
};

export default UpdateBooking;
