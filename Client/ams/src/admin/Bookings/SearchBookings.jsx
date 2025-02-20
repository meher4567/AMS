import { useState, useEffect, useMemo } from 'react';
import { searchBookings } from '../../api/bookingsApi'; // Adjust based on your API setup
import styles from '../styles/Bookings/SearchBookings.module.scss';

const SearchBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchField, setSearchField] = useState('passenger');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [sortOrder, setSortOrder] = useState('asc');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            setLoading(true);
            try {
                const response = await searchBookings();
                setBookings(response);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const handleFieldChange = (e) => {
        setSearchField(e.target.value);
        setSearchTerm('');
        setCurrentPage(1);
    };

    const filteredBookings = useMemo(() => {
        const sortedBookings = [...bookings].sort((a, b) => {
            const comparison = a[searchField].toString().localeCompare(b[searchField].toString());
            return sortOrder === 'asc' ? comparison : -comparison;
        });

        return sortedBookings.filter((booking) =>
            booking[searchField]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [bookings, searchTerm, searchField, sortOrder]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentBookings = filteredBookings.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className={styles.container}>
            <h2>Search Bookings</h2>

            {/* Search field selector */}
            <select onChange={handleFieldChange} value={searchField} className={styles.fieldSelect}>
                <option value="passenger">Passenger</option>
                <option value="flight">Flight</option>
                <option value="booking_date">Booking Date</option>
                <option value="payment">Payment ID</option>
                <option value="seat_number">Seat Number</option>
                <option value="booking_status">Booking Status</option>
            </select>

            {/* Search input */}
            <input
                type="text"
                placeholder={`Search by ${searchField.replace('_', ' ')}`}
                value={searchTerm}
                onChange={handleSearchChange}
                className={styles.searchInput}
            />

            {/* Sort button */}
            <button 
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className={styles.sortButton}
            >
                Sort by {searchField.replace('_', ' ')} ({sortOrder === 'asc' ? 'Descending' : 'Ascending'})
            </button>

            {/* Loading and error messages */}
            {loading && <p>Loading bookings...</p>}
            {error && <p className={styles.error}>{error}</p>}
            {!loading && !error && currentBookings.length === 0 && <p className={styles.noResults}>No bookings found.</p>}

            {/* Bookings data table */}
            <table className={styles.bookingTable}>
                <thead>
                    <tr>
                        <th>Booking ID</th>
                        <th>Passenger</th>
                        <th>Flight</th>
                        <th>Booking Date</th>
                        <th>Payment ID</th>
                        <th>Seat Number</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {currentBookings.map((booking) => (
                        <tr key={booking.booking_id}>
                            <td>{booking.booking_id}</td>
                            <td>{booking.passenger}</td>
                            <td>{booking.flight}</td>
                            <td>{new Date(booking.booking_date).toLocaleDateString()}</td>
                            <td>{booking.payment || 'N/A'}</td>
                            <td>{booking.seat_number}</td>
                            <td>{booking.booking_status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className={styles.pagination}>
                <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={styles.pageButton}
                >
                    Previous
                </button>

                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => paginate(index + 1)}
                        className={`${styles.pageButton} ${currentPage === index + 1 ? styles.active : ''}`}
                    >
                        {index + 1}
                    </button>
                ))}

                <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={styles.pageButton}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default SearchBookings;
