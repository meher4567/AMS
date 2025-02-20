import { useState, useEffect, useMemo } from 'react';
import { searchPassengers } from '../../api/passengersApi';  // Adjust based on your API setup
import styles from '../styles/Passengers/SearchPassengers.module.scss';

const SearchPassengers = () => {
    const [passengers, setPassengers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchField, setSearchField] = useState('first_name');  // Default search field
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [sortOrder, setSortOrder] = useState('asc');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPassengers = async () => {
            setLoading(true);
            try {
                const response = await searchPassengers();
                setPassengers(response);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchPassengers();
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

    const filteredPassengers = useMemo(() => {
        const sortedPassengers = [...passengers].sort((a, b) => {
            const comparison = a.first_name.localeCompare(b.first_name);  // Sort by first name
            return sortOrder === 'asc' ? comparison : -comparison;
        });

        return sortedPassengers.filter((passenger) =>
            passenger[searchField]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [passengers, searchTerm, searchField, sortOrder]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentPassengers = filteredPassengers.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredPassengers.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className={styles.container}>
            <h2>Search Passengers</h2>

            {/* Search field selector */}
            <select onChange={handleFieldChange} value={searchField} className={styles.fieldSelect}>
                <option value="first_name">First Name</option>
                <option value="last_name">Last Name</option>
                <option value="email">Email</option>
                <option value="phone_number">Phone Number</option>
                <option value="passport_no">Passport No</option>
                <option value="date_of_birth">Date of Birth</option>
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
                Sort by First Name ({sortOrder === 'asc' ? 'Descending' : 'Ascending'})
            </button>

            {/* Loading and error messages */}
            {loading && <p>Loading passengers...</p>}
            {error && <p className={styles.error}>{error}</p>}
            {!loading && !error && currentPassengers.length === 0 && <p className={styles.noResults}>No passengers found.</p>}

            {/* Passengers data table */}
            <table className={styles.passengerTable}>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Passport No</th>
                        <th>Date of Birth</th>
                    </tr>
                </thead>
                <tbody>
                    {currentPassengers.map((passenger) => (
                        <tr key={passenger.passenger_id}>
                            <td>{passenger.first_name}</td>
                            <td>{passenger.last_name}</td>
                            <td>{passenger.email}</td>
                            <td>{passenger.phone_number}</td>
                            <td>{passenger.passport_no || 'N/A'}</td>
                            <td>{passenger.date_of_birth}</td>
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

export default SearchPassengers;
