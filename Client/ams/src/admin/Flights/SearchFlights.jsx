import { useState, useEffect, useMemo } from 'react';
import { searchFlights } from '../../api/flightsApi';
import styles from '../styles/Flights/SearchFlights.module.scss';

const SearchFlights = () => {
    const [flights, setFlights] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchField, setSearchField] = useState('flight_number');  // New state for search field
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [sortOrder, setSortOrder] = useState('asc');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFlights = async () => {
            setLoading(true);
            try {
                const response = await searchFlights();
                setFlights(response);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchFlights();
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    // Handle changes to the search field
    const handleFieldChange = (e) => {
        setSearchField(e.target.value);
        setSearchTerm('');
        setCurrentPage(1);
    };

    const filteredFlights = useMemo(() => {
        const sortedFlights = [...flights].sort((a, b) => {
            const comparison = a.flight_number.localeCompare(b.flight_number);
            return sortOrder === 'asc' ? comparison : -comparison;
        });

        return sortedFlights.filter((flight) => 
            flight[searchField].toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [flights, searchTerm, searchField, sortOrder]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentFlights = filteredFlights.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredFlights.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className={styles.container}>
            <h2>Search Flights</h2>

            {/* Search field selector */}
            <select onChange={handleFieldChange} value={searchField} className={styles.fieldSelect}>
                <option value="flight_number">Flight Number</option>
                <option value="origin">Origin</option>
                <option value="destination">Destination</option>
                <option value="status">Status</option>
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
                Sort by Flight Number ({sortOrder === 'asc' ? 'Descending' : 'Ascending'})
            </button>

            {/* Loading and error messages */}
            {loading && <p>Loading flights...</p>}
            {error && <p className={styles.error}>{error}</p>}
            {!loading && !error && currentFlights.length === 0 && <p className={styles.noResults}>No flights found.</p>}

            {/* Flight data table */}
            <table className={styles.flightTable}>
                <thead>
                    <tr>
                        <th>Flight No</th>
                        <th>Origin</th>
                        <th>Destination</th>
                        <th>Departure</th>
                        <th>Arrival</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {currentFlights.map((flight) => (
                        <tr key={flight.flight_id}>
                            <td>{flight.flight_number}</td>
                            <td>{flight.origin}</td>
                            <td>{flight.destination}</td>
                            <td>{flight.departure_time}</td>
                            <td>{flight.arrival_time}</td>
                            <td>{flight.status}</td>
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

export default SearchFlights;
