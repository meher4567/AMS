import { useState, useEffect, useMemo } from 'react';
import { searchPayments } from '../../api/paymentsApi'; // Adjust based on your API setup
import styles from '../styles/Payments/SearchPayments.module.scss';

const SearchPayments = () => {
    const [payments, setPayments] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchField, setSearchField] = useState('payment_method');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [sortOrder, setSortOrder] = useState('asc');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPayments = async () => {
            setLoading(true);
            try {
                const response = await searchPayments();
                setPayments(response);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchPayments();
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

    const filteredPayments = useMemo(() => {
        const sortedPayments = [...payments].sort((a, b) => {
            const comparison = a[searchField].toString().localeCompare(b[searchField].toString());
            return sortOrder === 'asc' ? comparison : -comparison;
        });

        return sortedPayments.filter((payment) =>
            payment[searchField]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [payments, searchTerm, searchField, sortOrder]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentPayments = filteredPayments.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className={styles.container}>
            <h2>Search Payments</h2>

            {/* Search field selector */}
            <select onChange={handleFieldChange} value={searchField} className={styles.fieldSelect}>
                <option value="payment_method">Payment Method</option>
                <option value="amount">Amount</option>
                <option value="payment_date">Payment Date</option>
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
            {loading && <p>Loading payments...</p>}
            {error && <p className={styles.error}>{error}</p>}
            {!loading && !error && currentPayments.length === 0 && <p className={styles.noResults}>No payments found.</p>}

            {/* Payments data table */}
            <table className={styles.paymentTable}>
                <thead>
                    <tr>
                        <th>Payment ID</th>
                        <th>Booking ID</th>
                        <th>Payment Date</th>
                        <th>Payment Method</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {currentPayments.map((payment) => (
                        <tr key={payment.payment_id}>
                            <td>{payment.payment_id}</td>
                            <td>{payment.booking}</td>
                            <td>{payment.payment_date}</td>
                            <td>{payment.payment_method}</td>
                            <td>{payment.amount}</td>
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

export default SearchPayments;
