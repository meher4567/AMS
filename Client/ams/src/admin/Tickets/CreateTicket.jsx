import { useState } from 'react';
import { createTicket } from '../../api/ticketsApi'; // Adjust the import based on your API structure
import styles from '../styles/Tickets/Create.module.scss';

const CreateTicket = () => {
  const [formData, setFormData] = useState({
    booking_id: '',
    ticket_number: '',
    seat_class: '',
    seat_number: '',
    issued_date: ''
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

    const { booking_id, ticket_number, seat_class, seat_number, issued_date } = formData;

    if (!booking_id || !ticket_number || !seat_class || !seat_number || !issued_date) {
      setError('All fields are required.');
      return;
    }

    try {
      const response = await createTicket(formData);
      console.log(response);
      setSuccess(true);
      setFormData({
        booking_id: '',
        ticket_number: '',
        seat_class: '',
        seat_number: '',
        issued_date: ''
      });
    } catch (error) {
      setError('Failed to create ticket. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Create Ticket</h2>
      {error && <p className={`${styles.message} ${styles.error}`}>{error}</p>}
      {success && <p className={`${styles.message} ${styles.success}`}>Ticket created successfully!</p>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>Booking ID:</label>
        <input
          type="text"
          name="booking_id"
          value={formData.booking_id}
          onChange={handleChange}
          className={styles.input}
        />

        <label className={styles.label}>Ticket Number:</label>
        <input
          type="text"
          name="ticket_number"
          value={formData.ticket_number}
          onChange={handleChange}
          className={styles.input}
        />

        <label className={styles.label}>Seat Class:</label>
        <input
          type="text"
          name="seat_class"
          value={formData.seat_class}
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

        <label className={styles.label}>Issued Date:</label>
        <input
          type="datetime-local"
          name="issued_date"
          value={formData.issued_date}
          onChange={handleChange}
          className={styles.input}
        />

        <button type="submit" className={styles.button}>Create Ticket</button>
      </form>
    </div>
  );
};

export default CreateTicket;
