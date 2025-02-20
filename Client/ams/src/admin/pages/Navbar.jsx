import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/pages/Navbar.module.scss'; // Import the SCSS module

const Navbar = ({ setActivePage, activePage }) => {
    const navigate = useNavigate();

    return (
        <nav className={styles.navbar}>
            <ul className={styles.navList}>
                <li>
                    <button onClick={() => navigate('/admin-home')} className={styles.navButton}>
                        Home
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => setActivePage('airlines')}
                        className={`${styles.navButton} ${activePage === 'airlines' ? styles.active : ''}`}
                    >
                        Manage Airlines
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => setActivePage('airports')}
                        className={`${styles.navButton} ${activePage === 'airports' ? styles.active : ''}`}
                    >
                        Manage Airports
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => setActivePage('bookings')}
                        className={`${styles.navButton} ${activePage === 'bookings' ? styles.active : ''}`}
                    >
                        Manage Bookings
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => setActivePage('crew')}
                        className={`${styles.navButton} ${activePage === 'crew' ? styles.active : ''}`}
                    >
                        Manage Crew
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => setActivePage('crew-assignment')}
                        className={`${styles.navButton} ${activePage === 'crew-assignment' ? styles.active : ''}`}
                    >
                        Manage Crew Assignment
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => setActivePage('flights')}
                        className={`${styles.navButton} ${activePage === 'flights' ? styles.active : ''}`}
                    >
                        Manage Flights
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => setActivePage('passengers')}
                        className={`${styles.navButton} ${activePage === 'passengers' ? styles.active : ''}`}
                    >
                        Manage Passengers
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => setActivePage('planes')}
                        className={`${styles.navButton} ${activePage === 'planes' ? styles.active : ''}`}
                    >
                        Manage Planes
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => setActivePage('tickets')}
                        className={`${styles.navButton} ${activePage === 'tickets' ? styles.active : ''}`}
                    >
                        Manage Tickets
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => setActivePage('payments')}
                        className={`${styles.navButton} ${activePage === 'payments' ? styles.active : ''}`}
                    >
                        Manage Payments
                    </button>
                </li>
                
            </ul>
        </nav>
    );
};

Navbar.propTypes = {
    setActivePage: PropTypes.func.isRequired,
    activePage: PropTypes.string.isRequired,
};

export default Navbar;
