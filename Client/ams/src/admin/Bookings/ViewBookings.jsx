import { useEffect, useState } from 'react';
import { getBookings } from '../../api/bookingsApi'; // Path for bookings API
import styles from '../styles/Bookings/Read.module.scss'; // Import the specific SCSS for Read

const ReadBooking = () => {
  const [bookings, setBookings] = useState([]);

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

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Bookings List</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Passenger ID</th>
            <th>Flight ID</th>
            <th>Booking Date</th>
            <th>Seat Number</th>
            <th>Booking Status</th>
            <th>Payment ID</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.booking_id}>
              <td>{booking.booking_id}</td>
              <td>{booking.passenger}</td>
              <td>{booking.flight}</td>
              <td>{new Date(booking.booking_date).toLocaleString()}</td>
              <td>{booking.seat_number || 'N/A'}</td>
              <td>{booking.booking_status || 'N/A'}</td>
              <td>{booking.payment || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReadBooking;
