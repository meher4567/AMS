import { useState, useEffect, useMemo } from 'react';
import { searchCrewMembers } from '../../api/crewApi'; // Adjust based on your API setup
import styles from '../styles/Crew/SearchCrew.module.scss';

const SearchCrew = () => {
    const [crewMembers, setCrewMembers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchField, setSearchField] = useState('first_name');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [sortOrder, setSortOrder] = useState('asc');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCrewMembers = async () => {
            setLoading(true);
            try {
                const response = await searchCrewMembers();
                setCrewMembers(response);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchCrewMembers();
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

    const filteredCrewMembers = useMemo(() => {
        const sortedCrew = [...crewMembers].sort((a, b) => {
            const comparison = a[searchField].toString().localeCompare(b[searchField].toString());
            return sortOrder === 'asc' ? comparison : -comparison;
        });

        return sortedCrew.filter((member) =>
            member[searchField]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [crewMembers, searchTerm, searchField, sortOrder]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCrew = filteredCrewMembers.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredCrewMembers.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className={styles.container}>
            <h2>Search Crew</h2>

            {/* Search field selector */}
            <select onChange={handleFieldChange} value={searchField} className={styles.fieldSelect}>
                <option value="first_name">First Name</option>
                <option value="last_name">Last Name</option>
                <option value="role">Role</option>
                <option value="flight">Flight ID</option>
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
            {loading && <p>Loading crew members...</p>}
            {error && <p className={styles.error}>{error}</p>}
            {!loading && !error && currentCrew.length === 0 && <p className={styles.noResults}>No crew members found.</p>}

            {/* Crew members data table */}
            <table className={styles.crewTable}>
                <thead>
                    <tr>
                        <th>Crew ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Role</th>
                        <th>Flight ID</th>
                    </tr>
                </thead>
                <tbody>
                    {currentCrew.map((member) => (
                        <tr key={member.crew_id}>
                            <td>{member.crew_id}</td>
                            <td>{member.first_name}</td>
                            <td>{member.last_name}</td>
                            <td>{member.role}</td>
                            <td>{member.flight}</td>
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

export default SearchCrew;
