import { useState, useEffect, useMemo } from 'react';
import { searchTickets } from '../../api/ticketsApi'; // Adjust based on your API setup
import styles from '../styles/Tickets/Search.module.scss';

const SearchTickets = () => {
    const [tickets, setTickets] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchField, setSearchField] = useState('ticket_number');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [sortOrder, setSortOrder] = useState('asc');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTickets = async () => {
            setLoading(true);
            try {
                const response = await searchTickets();
                setTickets(response);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchTickets();
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

    const filteredTickets = useMemo(() => {
        const sortedTickets = [...tickets].sort((a, b) => {
            const comparison = a[searchField].toString().localeCompare(b[searchField].toString());
            return sortOrder === 'asc' ? comparison : -comparison;
        });

        return sortedTickets.filter((ticket) =>
            ticket[searchField]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [tickets, searchTerm, searchField, sortOrder]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentTickets = filteredTickets.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredTickets.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className={styles.container}>
            <h2>Search Tickets</h2>

            {/* Search field selector */}
            <select onChange={handleFieldChange} value={searchField} className={styles.fieldSelect}>
                <option value="ticket_number">Ticket Number</option>
                <option value="seat_class">Seat Class</option>
                <option value="seat_number">Seat Number</option>
                <option value="issued_date">Issued Date</option>
                <option value="booking">Booking ID</option>
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
            {loading && <p>Loading tickets...</p>}
            {error && <p className={styles.error}>{error}</p>}
            {!loading && !error && currentTickets.length === 0 && <p className={styles.noResults}>No tickets found.</p>}

            {/* Tickets data table */}
            <table className={styles.ticketTable}>
                <thead>
                    <tr>
                        <th>Ticket ID</th>
                        <th>Booking ID</th>
                        <th>Ticket Number</th>
                        <th>Seat Class</th>
                        <th>Seat Number</th>
                        <th>Issued Date</th>
                    </tr>
                </thead>
                <tbody>
                    {currentTickets.map((ticket) => (
                        <tr key={ticket.ticket_id}>
                            <td>{ticket.ticket_id}</td>
                            <td>{ticket.booking}</td>
                            <td>{ticket.ticket_number}</td>
                            <td>{ticket.seat_class}</td>
                            <td>{ticket.seat_number}</td>
                            <td>{ticket.issued_date}</td>
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

export default SearchTickets;
