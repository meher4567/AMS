import { useState, useEffect } from 'react';
import { getTickets, deleteTicket } from '../../api/ticketsApi'; // Adjust the import based on your file structure
import styles from '../styles/Tickets/Delete.module.scss';

const DeleteTicket = () => {
  const [ticketId, setTicketId] = useState('');
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await getTickets(); // Fetch tickets from API
        setTickets(response); // Store tickets in the state
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };
    fetchTickets();
  }, []);

  const handleDelete = async () => {
    const ticketToDelete = tickets.find((ticket) => ticket.ticket_id === parseInt(ticketId));

    if (!ticketToDelete) {
      console.error('Ticket not found');
      return;
    }

    try {
      await deleteTicket(ticketId);
      setTicketId('');
      setTickets(tickets.filter((ticket) => ticket.ticket_id !== parseInt(ticketId)));
    } catch (error) {
      console.error('Error deleting ticket:', error);
    }
  };

  return (
    <div className={styles.container}>
      <label className={styles.label}>Ticket ID:</label>
      <input 
        type="text" 
        value={ticketId} 
        onChange={(e) => setTicketId(e.target.value)} 
        placeholder="Enter Ticket ID" 
        className={styles.input} 
      />
      <button onClick={handleDelete} className={styles.button}>Delete Ticket</button>
    </div>
  );
};

export default DeleteTicket;
