import { useState, useEffect } from 'react';
import { updateTicket, getTickets } from '../../api/ticketsApi';
import styles from '../styles/Tickets/Update.module.scss';

const UpdateTicket = () => {
  const [ticketId, setTicketId] = useState('');
  const [formData, setFormData] = useState({
    booking_id: '',
    ticket_number: '',
    seat_class: '',
    seat_number: '',
    issued_date: ''
  });
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Fetch all tickets initially
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await getTickets();
        setTickets(response);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };
    fetchTickets();
  }, []);

  // Fetch ticket details based on ticketId input
  useEffect(() => {
    if (ticketId) {
      const ticketToUpdate = tickets.find(t => t.ticket_id === parseInt(ticketId));
      if (ticketToUpdate) {
        setFormData(ticketToUpdate);
        setError('');
      } else {
        setError('Ticket not found.');
      }
    }
  }, [ticketId, tickets]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setError('');

    const ticketToUpdate = tickets.find(t => t.ticket_id === parseInt(ticketId));
    if (!ticketToUpdate) {
      setError('Ticket not found.');
      return;
    }

    try {
      await updateTicket(ticketId, formData);
      setSuccess(true);
      setError('');
    } catch (error) {
      console.error('Error updating ticket:', error);
      setError('Failed to update ticket. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <h2>Update Ticket</h2>

      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>Ticket updated successfully!</p>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <label>Ticket ID:</label>
        <input
          type="text"
          value={ticketId}
          onChange={(e) => setTicketId(e.target.value)}
          placeholder="Enter Ticket ID"
          className={styles.input}
        />

        <label>Booking ID:</label>
        <input
          type="text"
          name="booking_id"
          value={formData.booking_id}
          onChange={handleChange}
          className={styles.input}
        />

        <label>Ticket Number:</label>
        <input
          type="text"
          name="ticket_number"
          value={formData.ticket_number}
          onChange={handleChange}
          className={styles.input}
        />

        <label>Seat Class:</label>
        <input
          type="text"
          name="seat_class"
          value={formData.seat_class}
          onChange={handleChange}
          className={styles.input}
        />

        <label>Seat Number:</label>
        <input
          type="text"
          name="seat_number"
          value={formData.seat_number}
          onChange={handleChange}
          className={styles.input}
        />

        <label>Issued Date:</label>
        <input
          type="datetime-local"
          name="issued_date"
          value={formData.issued_date}
          onChange={handleChange}
          className={styles.input}
        />

        <button type="submit" className={styles.submitButton}>Update Ticket</button>
      </form>
    </div>
  );
};

export default UpdateTicket;
