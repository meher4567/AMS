import { useEffect, useState } from 'react';
import { getTickets } from '../../api/ticketsApi'; // Adjust the import based on your file structure
import styles from '../styles/Tickets/Update.module.scss';

const ReadTicket = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await getTickets(); // Use the API to fetch data
        setTickets(response); // Set airlines from the response
      } catch (error) {
        console.error('Error fetching tickets:', error); // Handle any errors
      }
    };
    fetchTicket();
  }, []);

  return (
    <div className={styles.tableContainer}>
      <h2>Ticket List</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.tableHeader}>Ticket Number</th>
            <th className={styles.tableHeader}>Seat Class</th>
            <th className={styles.tableHeader}>Seat Number</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map(ticket => (
            <tr key={ticket.ticket_id} className={styles.tableRow}>
              <td className={styles.tableData}>{ticket.ticket_number}</td>
              <td className={styles.tableData}>{ticket.seat_class}</td>
              <td className={styles.tableData}>{ticket.seat_number}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReadTicket;
