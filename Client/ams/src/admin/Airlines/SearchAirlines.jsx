import { useState, useEffect, useMemo } from 'react';
import { searchAirlines } from '../../api/airlinesApi'; // Adjust based on your API setup
import styles from '../styles/Airlines/SearchAirlines.module.scss';

const SearchAirlines = () => {
    const [airlines, setAirlines] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchField, setSearchField] = useState('name');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [sortOrder, setSortOrder] = useState('asc');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAirlines = async () => {
            setLoading(true);
            try {
                const response = await searchAirlines();
                setAirlines(response);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchAirlines();
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

    const filteredAirlines = useMemo(() => {
        const sortedAirlines = [...airlines].sort((a, b) => {
            const comparison = a[searchField].toString().localeCompare(b[searchField].toString());
            return sortOrder === 'asc' ? comparison : -comparison;
        });

        return sortedAirlines.filter((airline) =>
            airline[searchField]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [airlines, searchTerm, searchField, sortOrder]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentAirlines = filteredAirlines.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredAirlines.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className={styles.container}>
            <h2>Search Airlines</h2>

            {/* Search field selector */}
            <select onChange={handleFieldChange} value={searchField} className={styles.fieldSelect}>
                <option value="name">Name</option>
                <option value="country">Country</option>
                <option value="iata_code">IATA Code</option>
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
            {loading && <p>Loading airlines...</p>}
            {error && <p className={styles.error}>{error}</p>}
            {!loading && !error && currentAirlines.length === 0 && <p className={styles.noResults}>No airlines found.</p>}

            {/* Airlines data table */}
            <table className={styles.airlineTable}>
                <thead>
                    <tr>
                        <th>Airline ID</th>
                        <th>Name</th>
                        <th>Country</th>
                        <th>IATA Code</th>
                    </tr>
                </thead>
                <tbody>
                    {currentAirlines.map((airline) => (
                        <tr key={airline.airline_id}>
                            <td>{airline.airline_id}</td>
                            <td>{airline.name}</td>
                            <td>{airline.country}</td>
                            <td>{airline.iata_code}</td>
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

export default SearchAirlines;
