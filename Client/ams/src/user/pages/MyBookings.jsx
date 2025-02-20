import { useEffect, useState } from 'react';
import { useUser } from '../../components/UserContext';
import { getAllBookings } from '../../api/bookingsApi';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/MyBookings.module.scss';

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const { username } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const data = await getAllBookings(username);
                setBookings(data.bookings);
            } catch (error) {
                console.error("Error fetching bookings:", error);
            }
        };

        if (username) {
            fetchBookings();
        }
    }, [username]);

    const handleViewTicket = (booking) => {
        navigate('/user-home/view-ticket', { state: { booking } });
    };

    return (
        <div className={styles.bookingsContainer}>
            <h1 className={styles.heading}>My Bookings</h1>
            <table className={styles.bookingTable}>
                <thead>
                    <tr>
                        <th>Flight</th>
                        <th>Flight Number</th>
                        <th>Date</th>
                        <th>Origin</th>
                        <th>Destination</th>
                        <th>Seat Class</th>
                        <th>Seat Number</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.length > 0 ? (
                        bookings.map((booking) => (
                            <tr key={booking.booking_id}>
                                <td>{booking.booking_id}</td>
                                <td>{booking.flight.flight_number}</td>
                                <td>{new Date(booking.booking_date).toLocaleDateString()}</td>
                                <td>{booking.flight.origin}</td>
                                <td>{booking.flight.destination}</td>
                                <td>{booking.ticket.seat_class}</td>
                                <td>{booking.ticket.seat_number}</td>
                                <td>
                                    <button
                                        className={styles.downloadButton}
                                        onClick={() => handleViewTicket(booking)}
                                    >
                                        View Ticket
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" className={styles.noBookings}>No bookings available.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default MyBookings;
