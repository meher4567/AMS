import { useNavigate } from 'react-router-dom';
import styles from '../styles/UserNavBar.module.scss';

const UserNavBar = () => {
    const navigate = useNavigate();

    const handleNavigation = (page) => {
        navigate(`/user-home/${page}`);
    };

    return (
        <nav className={styles.navbar}>
            <ul className={styles.navList}>
                <li>
                    <button onClick={() => handleNavigation('')} className={styles.navLink}>
                        Home
                    </button>
                </li>
                <li>
                    <button onClick={() => handleNavigation('about')} className={styles.navLink}>
                        About Us
                    </button>
                </li>
                <li>
                    <button onClick={() => handleNavigation('contact')} className={styles.navLink}>
                        Contact Us
                    </button>
                </li>
                <li>
                    <button onClick={() => handleNavigation('flights')} className={styles.navLink}>
                        View Flights
                    </button>
                </li>
                <li>
                    <button onClick={() => handleNavigation('bookings')} className={styles.navLink}>
                        My Bookings
                    </button>
                </li>
                <li>
                    <button onClick={() => handleNavigation('profile')} className={styles.navLink}>
                        Profile
                    </button>
                </li>
                <li>
                    <button onClick={() => handleNavigation('logout')} className={styles.navLink}>
                        Logout
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default UserNavBar;
