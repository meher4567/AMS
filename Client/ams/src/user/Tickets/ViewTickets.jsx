import { useLocation } from 'react-router-dom';
import styles from '../../styles/ViewTicket.module.scss';

const ViewTicket = () => {
    const location = useLocation();
    const booking = location.state?.booking;

    if (!booking) {
        return <div className={styles.error}>No ticket data found.</div>;
    }

    const {
        flight: { flight_number, origin, destination },
        booking_date,
        ticket: { seat_class, seat_number, ticket_number },
    } = booking;

    return (
        <div className={styles.ticketContainer}>
            <div className={styles.ticket}>
               
                <div className={styles.header}>
                    <h2>Meher Airlines</h2>
                    <p className={styles.ticketNumber}>Ticket #{ticket_number}</p>
                </div>
                <div className={styles.flightDetails}>
                    <div className={styles.flightInfo}>
                        <p><strong>Flight:</strong> {flight_number}</p>
                        <p><strong>Date:</strong> {new Date(booking_date).toLocaleDateString()}</p>
                    </div>
                    <div className={styles.routeInfo}>
                        <p><strong>From:</strong> {origin}</p>
                        <p><strong>To:</strong> {destination}</p>
                    </div>
                </div>
                <div className={styles.seatDetails}>
                    <p><strong>Seat Class:</strong> {seat_class}</p>
                    <p><strong>Seat Number:</strong> {seat_number}</p>
                </div>
            </div>
        </div>
    );
};

export default ViewTicket;
