import { useState, useEffect, useMemo } from 'react';
import { searchCrewAssignments } from '../../api/crewAssignmentApi'; // Adjust based on your API setup
import styles from '../styles/CrewAssignments/SearchCrewAssignments.module.scss';

const SearchCrewAssignments = () => {
    const [crewAssignments, setCrewAssignments] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchField, setSearchField] = useState('assignment_id');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [sortOrder, setSortOrder] = useState('asc');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCrewAssignments = async () => {
            setLoading(true);
            try {
                const response = await searchCrewAssignments();
                setCrewAssignments(response);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchCrewAssignments();
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

    const filteredCrewAssignments = useMemo(() => {
        const sortedAssignments = [...crewAssignments].sort((a, b) => {
            const comparison = a[searchField].toString().localeCompare(b[searchField].toString());
            return sortOrder === 'asc' ? comparison : -comparison;
        });

        return sortedAssignments.filter((assignment) =>
            assignment[searchField]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [crewAssignments, searchTerm, searchField, sortOrder]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentAssignments = filteredCrewAssignments.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredCrewAssignments.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className={styles.container}>
            <h2>Search Crew Assignments</h2>

            {/* Search field selector */}
            <select onChange={handleFieldChange} value={searchField} className={styles.fieldSelect}>
                <option value="assignment_id">Assignment ID</option>
                <option value="flight_id">Flight ID</option>
                <option value="crew_id">Crew ID</option>
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
            {loading && <p>Loading crew assignments...</p>}
            {error && <p className={styles.error}>{error}</p>}
            {!loading && !error && currentAssignments.length === 0 && (
                <p className={styles.noResults}>No crew assignments found.</p>
            )}

            {/* Crew assignments data table */}
            <table className={styles.crewAssignmentTable}>
                <thead>
                    <tr>
                        <th>Assignment ID</th>
                        <th>Flight ID</th>
                        <th>Crew ID</th>
                    </tr>
                </thead>
                <tbody>
                    {currentAssignments.map((assignment) => (
                        <tr key={assignment.assignment_id}>
                            <td>{assignment.assignment_id}</td>
                            <td>{assignment.flight}</td>
                            <td>{assignment.crew}</td>
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

export default SearchCrewAssignments;
