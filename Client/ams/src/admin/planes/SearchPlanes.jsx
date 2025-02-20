import { useState, useEffect, useMemo } from 'react';
import { searchPlanes } from '../../api/planesApi';  // Adjust based on your API setup
import styles from '../styles/Planes/Search.module.scss';

const SearchPlanes = () => {
    const [planes, setPlanes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchField, setSearchField] = useState('model');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [sortOrder, setSortOrder] = useState('asc');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPlanes = async () => {
            setLoading(true);
            try {
                const response = await searchPlanes();
                setPlanes(response);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchPlanes();
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

    const filteredPlanes = useMemo(() => {
        const sortedPlanes = [...planes].sort((a, b) => {
            const comparison = a.model.localeCompare(b.model);  // Default sort by model
            return sortOrder === 'asc' ? comparison : -comparison;
        });

        return sortedPlanes.filter((plane) =>
            plane[searchField]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [planes, searchTerm, searchField, sortOrder]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentPlanes = filteredPlanes.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredPlanes.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className={styles.container}>
            <h2>Search Planes</h2>

            {/* Search field selector */}
            <select onChange={handleFieldChange} value={searchField} className={styles.fieldSelect}>
                <option value="model">Model</option>
                <option value="capacity">Capacity</option>
                <option value="manufacturer">Manufacturer</option>
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
                Sort by Model ({sortOrder === 'asc' ? 'Descending' : 'Ascending'})
            </button>

            {/* Loading and error messages */}
            {loading && <p>Loading planes...</p>}
            {error && <p className={styles.error}>{error}</p>}
            {!loading && !error && currentPlanes.length === 0 && <p className={styles.noResults}>No planes found.</p>}

            {/* Planes data table */}
            <table className={styles.planeTable}>
                <thead>
                    <tr>
                        <th>Model</th>
                        <th>Capacity</th>
                        <th>Manufacturer</th>
                    </tr>
                </thead>
                <tbody>
                    {currentPlanes.map((plane) => (
                        <tr key={plane.plane_id}>
                            <td>{plane.model}</td>
                            <td>{plane.capacity}</td>
                            <td>{plane.manufacturer}</td>
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

export default SearchPlanes;
