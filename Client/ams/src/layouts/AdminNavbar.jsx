import { useNavigate } from 'react-router-dom';
import styles from '../styles/AdminNavBar.module.scss';

const AdminNavBar = () => {
    const navigate = useNavigate();

    const handleNavigation = (page) => {
        navigate(`/admin-home/${page}`);
    };

    return (
        <nav className={styles.navbar}>
            <ul className={styles.navList}>
                <li className={styles.navItem}>
                    <button onClick={() => handleNavigation('')} className={styles.navLink}>
                        Home
                    </button>
                </li>
                <li className={styles.navItem}>
                    <button onClick={() => handleNavigation('about')} className={styles.navLink}>
                        About Us
                    </button>
                </li>
                <li className={styles.navItem}>
                    <button onClick={() => handleNavigation('contact')} className={styles.navLink}>
                        Contact Us
                    </button>
                </li>
                <li className={styles.navItem}>
                    <button onClick={() => handleNavigation('flights')} className={styles.navLink}>
                        Search Flights
                    </button>
                </li>
                <li className={styles.navItem}>
                    <button onClick={() => handleNavigation('stats')} className={styles.navLink}>
                        Stats
                    </button>
                </li>
                <li className={styles.navItem}>
                    <button onClick={() => handleNavigation('manage-airlines')} className={styles.navLink}>
                        Manage Airlines
                    </button>
                </li>
                <li className={styles.navItem}>
                    <button onClick={() => handleNavigation('logout')} className={styles.navLink}>
                        Logout
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default AdminNavBar;
