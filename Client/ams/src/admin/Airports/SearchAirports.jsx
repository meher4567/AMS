import { useState, useEffect, useMemo } from 'react';
import { searchAirports } from '../../api/airportsApi'; // Adjust based on your API setup
import styles from '../styles/Airports/searchAirports.module.scss';

const SearchAirports = () => {
    const [airports, setAirports] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchField, setSearchField] = useState('airport_name');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [sortOrder, setSortOrder] = useState('asc');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAirports = async () => {
            setLoading(true);
            try {
                const response = await searchAirports();
                setAirports(response);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchAirports();
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

    const filteredAirports = useMemo(() => {
        const sortedAirports = [...airports].sort((a, b) => {
            const comparison = a[searchField].toString().localeCompare(b[searchField].toString());
            return sortOrder === 'asc' ? comparison : -comparison;
        });

        return sortedAirports.filter((airport) =>
            airport[searchField]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [airports, searchTerm, searchField, sortOrder]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentAirports = filteredAirports.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredAirports.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className={styles.container}>
            <h2>Search Airports</h2>

            {/* Search field selector */}
            <select onChange={handleFieldChange} value={searchField} className={styles.fieldSelect}>
                <option value="airport_code">Airport Code</option>
                <option value="airport_name">Airport Name</option>
                <option value="city">City</option>
                <option value="country">Country</option>
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
            {loading && <p>Loading airports...</p>}
            {error && <p className={styles.error}>{error}</p>}
            {!loading && !error && currentAirports.length === 0 && <p className={styles.noResults}>No airports found.</p>}

            {/* Airports data table */}
            <table className={styles.airportTable}>
                <thead>
                    <tr>
                        <th>Airport Code</th>
                        <th>Airport Name</th>
                        <th>City</th>
                        <th>Country</th>
                    </tr>
                </thead>
                <tbody>
                    {currentAirports.map((airport) => (
                        <tr key={airport.airport_code}>
                            <td>{airport.airport_code}</td>
                            <td>{airport.airport_name}</td>
                            <td>{airport.city}</td>
                            <td>{airport.country}</td>
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

export default SearchAirports;
