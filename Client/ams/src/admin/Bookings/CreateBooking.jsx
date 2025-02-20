import { useState } from 'react';
import { createBooking } from '../../api/bookingsApi';
import styles from '../styles/Bookings/Create.module.scss'; // Adjust import path and structure as needed

const CreateBooking = () => {
  const [formData, setFormData] = useState({
    passenger_id: '',
    flight_id: '',
    payment_id: '',
    booking_date: '',
    seat_number: '',
    booking_status: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    const { passenger_id, flight_id, payment_id, booking_date, seat_number, booking_status } = formData;

    if (!passenger_id || !flight_id || !payment_id || !booking_date || !seat_number || !booking_status) {
      setError('All fields are required.');
      return;
    }

    try {
      const response = await createBooking(formData);
      console.log('Booking created:', response);
      setSuccess(true);

      setFormData({
        passenger_id: '',
        flight_id: '',
        payment_id: '',
        booking_date: '',
        seat_number: '',
        booking_status: ''
      });
    } catch (error) {
      console.error('Error creating booking:', error);
      setError('Failed to create booking. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Create Booking</h2>
      {error && <p className={`${styles.message} ${styles.error}`}>{error}</p>}
      {success && <p className={`${styles.message} ${styles.success}`}>Booking created successfully!</p>}

      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Passenger ID:</label>
          <input
            type="text"
            name="passenger_id"
            value={formData.passenger_id}
            onChange={handleChange}
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Flight ID:</label>
          <input
            type="text"
            name="flight_id"
            value={formData.flight_id}
            onChange={handleChange}
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Payment ID:</label>
          <input
            type="text"
            name="payment_id"
            value={formData.payment_id}
            onChange={handleChange}
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Booking Date:</label>
          <input
            type="datetime-local"
            name="booking_date"
            value={formData.booking_date}
            onChange={handleChange}
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Seat Number:</label>
          <input
            type="text"
            name="seat_number"
            value={formData.seat_number}
            onChange={handleChange}
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Booking Status:</label>
          <input
            type="text"
            name="booking_status"
            value={formData.booking_status}
            onChange={handleChange}
            className={styles.input}
          />
        </div>

        <button type="submit" className={styles.button}>Create Booking</button>
      </form>
    </div>
  );
};

export default CreateBooking;
